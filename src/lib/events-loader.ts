import { Event } from './types';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRUq7acmGE8gLOKh2pz8RKltgw1sGxFXS0Hg9uJfpA_0OZvqqHt_QkN8DTND6JyfwXsHKMgeH4r6RUM/pub?output=csv';

// Simple CSV to JSON parser
const parseCSV = (text: string): Record<string, string>[] => {
  const lines = text.split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const data = lines[i].split(',').map(d => d.trim());
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
      description: item['Descrtiption'] || '',
      details: item['Descrtiption'] || '',
      startDate: item['Start Date'] || '',
      endDate: item['End Date'] || '',
      registrationLink: item['Unstop Link'] || '',
      imageUrl: item['Image Link'] || '',
      coordinator: item['Coordinator'] || '',
      contact: item['Contact'] || '',
      // Assign category somewhat randomly for now. You might want to add this to your sheet.
      category: (['Technical', 'Cultural', 'Informal'][index % 3]) as 'Technical' | 'Cultural' | 'Informal',
    }));

  } catch (err) {
    console.error("Error fetching events:", err);
    return []; // Return empty array on error
  }
};
