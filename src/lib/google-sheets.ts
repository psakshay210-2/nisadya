import { Event } from './types';

// Helper to parse CSV line correctly handling quotes
function parseCSVLine(text: string): string[] {
    const result: string[] = [];
    let start = 0;
    let end = 0;
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '"') {
            inQuotes = !inQuotes;
        } else if (text[i] === ',' && !inQuotes) {
            let field = text.substring(start, i).trim();
            // Remove surrounding quotes if present
            if (field.startsWith('"') && field.endsWith('"')) {
                field = field.substring(1, field.length - 1);
                // Handle escaped double quotes
                field = field.replace(/""/g, '"');
            }
            result.push(field);
            start = i + 1;
        }
    }
    // Add last field
    let lastField = text.substring(start).trim();
    if (lastField.startsWith('"') && lastField.endsWith('"')) {
        lastField = lastField.substring(1, lastField.length - 1);
        lastField = lastField.replace(/""/g, '"');
    }
    result.push(lastField);

    return result;
}

export async function fetchEventsFromGoogleSheet(csvUrl: string): Promise<Event[]> {
    try {
        // Use a proxy to avoid CORS issues if generic fetch fails, 
        // though "Publish to Web" CSVs often work directly. 
        // We'll try direct first, then proxy if needed? 
        // Actually, for client-side usage, we often need a proxy or the sheet must be headers permissive.
        // Let's use the code-tabs proxy we used for Instagram as it's reliable for this.

        const cacheBuster = new Date().getTime();
        const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`${csvUrl}&_=${cacheBuster}`)}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.statusText}`);
        }

        const csvText = await response.text();
        const lines = csvText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        if (lines.length < 2) return []; // No data

        // Header mapping (based on user screenshot)
        // Expected: Event name, Description, Start Date, End Date, Unstop Link, Image Link, Coordinator, Contact
        const headers = parseCSVLine(lines[0].toLowerCase());

        const getIndex = (key: string) => headers.findIndex(h => h.includes(key.toLowerCase()));

        const idxTitle = getIndex('event name');
        const idxDesc = getIndex('description');
        const idxStartDate = getIndex('start date');
        const idxEndDate = getIndex('end date');
        const idxLink = getIndex('unstop link');
        const idxImage = getIndex('image link');
        const idxCoordinator = getIndex('coordinator');
        const idxContact = getIndex('contact');
        const idxCategory = getIndex('category'); // Optional if they add it
        const idxLocation = getIndex('location'); // Optional if they add it

        const events: Event[] = lines.slice(1).map((line, index) => {
            const columns = parseCSVLine(line);

            // Robust safety check for column existence
            const getVal = (idx: number) => idx !== -1 && columns[idx] ? columns[idx] : '';

            // Handle Google Drive image links to make them viewable
            let imageUrl = getVal(idxImage).trim();

            if (imageUrl) {
                if (imageUrl.includes('drive.google.com')) {
                    // Try to extract the ID
                    let id = '';
                    const parts = imageUrl.split('/');
                    const dIndex = parts.indexOf('d');
                    if (dIndex !== -1 && parts[dIndex + 1]) {
                        id = parts[dIndex + 1];
                    } else {
                        const match = imageUrl.match(/[?&]id=([^&]+)/);
                        if (match) id = match[1];
                    }

                    if (id) {
                        imageUrl = `https://lh3.googleusercontent.com/d/${id}`;
                    }
                }
            }

            // Final validation: must start with http/https
            if (imageUrl && !imageUrl.startsWith('http')) {
                imageUrl = '';
            }

            return {
                id: `sheet-${index}`,
                title: getVal(idxTitle) || 'Untitled Event',
                description: getVal(idxDesc) || 'No description available.',
                startDate: getVal(idxStartDate),
                endDate: getVal(idxEndDate),
                location: getVal(idxLocation) || 'TBA', // Default if missing
                category: getVal(idxCategory) || 'General',
                registrationLink: getVal(idxLink),
                imageUrl: imageUrl,
                imageId: `sheet-img-${index}`, // Placeholder
                coordinator: getVal(idxCoordinator),
                contact: getVal(idxContact),
            };
        });

        // Filter out empty rows that might have been parsed
        return events.filter(e => e.title && e.title !== 'Untitled Event');

    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}
