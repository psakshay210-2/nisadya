
const GID = "545694281";
const BASE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7vRAeLIaAsM9SJYgjA8F0wb40RsDp712u8QRhRqB9oUVdfxh8kpkoAZ1RNsFQgwaBex_HcnkoUBEn/pub";

async function run() {
    const url = `${BASE_URL}?output=csv&gid=${GID}`;
    console.log("Fetching:", url);
    const response = await fetch(url);
    const text = await response.text();

    // Simple CSV parser for debug (mimicking the app's logic roughly or using the same split)
    // The app uses a more complex regex parser likely, but let's see rudimentary split first.
    // Actually, let's try to match the app's logic if possible.
    // Since I can't import the app's code easily, I'll reproduce the key trimming logic.

    const rows = text.split('\n').map(r => r.split(',')); // Very naive, but suffice for checking KEYS which shouldn't have commas usually.
    // Wait, the description HAS commas. This naive split will break.
    // I need a proper CSV parser.

    // Let's just look at the raw text first to see if there are hidden chars.
    console.log("Raw text snippet matching hero_description:");
    const match = text.match(/hero_description.*/);
    console.log(match ? match[0] : "NOT FOUND");

    if (match) {
        const line = match[0];
        // Parse this line manually
        // format: key,"value",description
        const parts = line.split(',');
        const key = parts[0];
        console.log(`Key: '${key}'`);
        console.log(`Key char codes: ${key.split('').map(c => c.charCodeAt(0)).join(',')}`);
    }
}

run();
