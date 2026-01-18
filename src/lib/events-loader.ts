import { Event } from './types';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRUq7acmGE8gLOKh2pz8RKltgw1sGxFXS0Hg9uJfpA_0OZvqqHt_QkN8DTND6JyfwXsHKMgeH4r6RUM/pub?output=csv';

// Simple CSV to JSON parser
const parseCSV = (text: string): Record<string, string>[] => {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    // This regex handles commas inside quoted fields
    const data = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(d => d.trim().replace(/^"|"$/g, ''));
    if (data.length === headers.length) {
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = data[index];
      });
      rows.push(row);
    }
  }
  return rows;
};

const transformGoogleDriveUrl = (url: string): string => {
  // Return placeholder if URL is empty or invalid
  if (!url || url.trim() === '') {
    return '/placeholder-event.jpg'; // Fallback to a placeholder image
  }

  // If it's already a valid absolute URL (http/https), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // Transform Google Drive URLs to direct view URLs
    if (url.includes('drive.google.com')) {
      const regex = /drive\.google\.com\/file\/d\/([^/]+)/;
      const match = url.match(regex);
      if (match && match[1]) {
        const fileId = match[1];
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    return url;
  }

  // If it's a relative path, ensure it starts with /
  if (!url.startsWith('/')) {
    return `/${url}`;
  }

  return url;
};


export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const cacheBustingUrl = `${GOOGLE_SHEET_CSV_URL}&_=${new Date().getTime()}`;
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(cacheBustingUrl)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from proxy. Status: ${response.status}`);
    }
    const csvText = await response.text();

    if (!csvText) {
      throw new Error("Could not fetch data from Google Sheet.");
    }

    const parsedData = parseCSV(csvText);

    return parsedData.map((item, index) => ({
      id: String(index + 1),
      title: item['Event name'] || 'Unnamed Event',
      description: item['Description'] || '',
      details: item['Description'] || '',
      startDate: item['Start Date'] || '',
      endDate: item['End Date'] || '',
      registrationLink: item['Unstop Link'] || '',
      imageUrl: transformGoogleDriveUrl(item['Image Link'] || ''),
      coordinator: item['Coordinator'] || '',
      contact: item['Contact'] || '',
    }));

  } catch (err) {
    console.error("Error fetching events:", err);
    return []; // Return empty array on error
  }
};
