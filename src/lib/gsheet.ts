const SPREADSHEET_ID = '2PACX-1vT7vRAeLIaAsM9SJYgjA8F0wb40RsDp712u8QRhRqB9oUVdfxh8kpkoAZ1RNsFQgwaBex_HcnkoUBEn';
const BASE_URL = `https://docs.google.com/spreadsheets/d/e/${SPREADSHEET_ID}/pub`;

export const GIDS = {
    EVENTS: '0',
    SCHEDULE: '1510343470',
    INSTAGRAM: '1824479930',
};

const parseCSV = (text: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentCell = '';
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                currentCell += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            currentRow.push(currentCell.trim());
            currentCell = '';
        } else if ((char === '\r' || char === '\n') && !insideQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            currentRow.push(currentCell.trim());
            if (currentRow.some(cell => cell !== '')) {
                rows.push(currentRow);
            }
            currentRow = [];
            currentCell = '';
        } else {
            currentCell += char;
        }
    }
    if (currentCell) currentRow.push(currentCell.trim());
    if (currentRow.some(cell => cell !== '')) {
        rows.push(currentRow);
    }
    return rows;
};

export async function fetchSheetData<T>(gid: string, rowMapper: (headers: string[], row: string[]) => T | null): Promise<T[]> {
    try {
        const url = `${BASE_URL}?output=csv&gid=${gid}`;
        const response = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
        if (!response.ok) {
            throw new Error(`Failed to fetch sheet with GID ${gid}: ${response.statusText}`);
        }
        const text = await response.text();
        const parsedData = parseCSV(text);

        if (parsedData.length < 2) return [];

        const headers = parsedData[0].map(h => h.toLowerCase().trim());
        const dataRows = parsedData.slice(1);

        return dataRows
            .map(row => rowMapper(headers, row))
            .filter((item): item is T => item !== null);

    } catch (error) {
        console.error(`Error fetching or parsing sheet with GID ${gid}:`, error);
        return [];
    }
}

export const getDriveImage = (link: string | undefined): string => {
    if (!link) return '';
    const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : link;
};
