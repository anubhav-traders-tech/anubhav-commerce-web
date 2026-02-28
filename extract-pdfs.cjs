const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const dir = 'D:\\Anubhav Traders\\anubhav-commerce-web\\AnubhavTraders\\catalogs';

async function extract() {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));
    for (const file of files) {
        try {
            const dataBuffer = fs.readFileSync(path.join(dir, file));
            const data = await pdf(dataBuffer);
            console.log(`\n=======================`);
            console.log(`FILE: ${file}`);
            console.log(`PAGES: ${data.numpages}`);

            const lines = data.text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            console.log(`Preview of lines (up to 30):`);
            console.log(lines.slice(0, 30).join('\n'));

        } catch (err) {
            console.error(`Error parsing ${file}:`, err.message);
        }
    }
}

extract();
