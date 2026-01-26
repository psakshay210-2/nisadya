
const GID = "545694281";
const BASE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7vRAeLIaAsM9SJYgjA8F0wb40RsDp712u8QRhRqB9oUVdfxh8kpkoAZ1RNsFQgwaBex_HcnkoUBEn/pub";

const parseCSV = (text) => {
    const rows = [];
    let currentRow = [];
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

async function run() {
    const url = `${BASE_URL}?output=csv&gid=${GID}`;
    console.log("Fetching:", url);
    const response = await fetch(url);
    const text = await response.text();

    console.log("Parsing...");
    const parsedData = parseCSV(text);

    console.log("Finding hero_description...");
    const row = parsedData.find(r => r[0] === 'hero_description');

    if (row) {
        console.log("FOUND!");
        console.log("Key:", row[0]);
        console.log("Value:", row[1]);
        console.log("Value length:", row[1].length);
    } else {
        console.log("NOT FOUND in parsed data.");
        console.log("First 5 rows keys:", parsedData.slice(0, 5).map(r => r[0]));

        // Dump raw text where it should be
        const match = text.match(/hero_description.*/);
        console.log("Raw match:", match ? match[0] : "none");
    }
}

run();
