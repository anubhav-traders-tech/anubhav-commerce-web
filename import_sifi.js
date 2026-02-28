const fs = require('fs');
const path = require('path');

const srcBaseDir = 'D:\\Anubhav Traders\\anubhav-commerce-web\\AnubhavTraders\\catalogs\\Sifi Prakash';
const destImagesDir = 'D:\\Anubhav Traders\\anubhav-commerce-web\\public\\catalog\\images\\sifi-prakash';
const productsJsonPath = 'D:\\Anubhav Traders\\anubhav-commerce-web\\public\\catalog\\products.json';

// Ensure destination exists
if (!fs.existsSync(destImagesDir)) {
    fs.mkdirSync(destImagesDir, { recursive: true });
}

// Ensure the brand exists in the array and clear existing products
let allData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
let sifiBrand = allData.find(b => b.id === 'sifi-prakash');
if (!sifiBrand) {
    sifiBrand = {
        id: 'sifi-prakash',
        name: 'Sifi Prakash',
        slug: 'sifi-prakash',
        description: 'Authentic Pahadi namkeens and traditional snacks.',
        logo: 'https://images.unsplash.com/photo-1599598425947-330026217415?auto=format&fit=crop&q=80&w=200&h=200',
        products: []
    };
    allData.push(sifiBrand);
}

// Reset Sifi's products so we can build from scratch
let sifiProducts = [];
let productIdCounter = 1;

// Read all category folders
const categoriesDir = fs.readdirSync(srcBaseDir);

for (const catName of categoriesDir) {
    const catPath = path.join(srcBaseDir, catName);
    if (!fs.statSync(catPath).isDirectory()) continue;

    // Determine Category Name and Default MRP
    let categoryTitle = 'Namkeen';
    let defaultMrp = 'Various Pricing';

    const catNameLower = catName.toLowerCase();

    if (catNameLower.includes('namkeen range mrp 5 & 10')) {
        categoryTitle = 'Namkeen';
        defaultMrp = '₹5 & ₹10';
    } else if (catNameLower.includes('premium')) {
        categoryTitle = 'Premium Range';
    } else if (catNameLower.includes('snak')) {
        categoryTitle = 'Snacks';
        defaultMrp = '₹5'; // Guessing standard snack price
    } else {
        categoryTitle = catName;
    }

    // Read files in this directory
    const files = fs.readdirSync(catPath);

    for (const file of files) {
        if (!file.match(/\.(png|jpe?g)$/i)) continue;

        let productName = file.replace(/\.(png|jpe?g)$/i, '').trim();
        let mrp = defaultMrp;

        // Sometimes filename contains price, e.g., "Phalhari Mixture- 35range.png"
        if (productName.toLowerCase().includes('- 35range') || productName.toLowerCase().includes('-35range')) {
            mrp = '₹35';
            productName = productName.replace(/- ?35range/i, '').trim();
        }

        // Clean up product name
        productName = productName.split(' ').map(w => w.charAt(0).toUpperCase() + w.toLowerCase().slice(1)).join(' ');

        const cleanFileName = categoryTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '-' + file.toLowerCase().replace(/[^a-z0-9\.]/g, '-');

        // Copy Image
        fs.copyFileSync(path.join(catPath, file), path.join(destImagesDir, cleanFileName));

        sifiProducts.push({
            id: `sp-${productIdCounter++}`,
            name: productName,
            category: categoryTitle,
            mrp: mrp,
            image: `/catalog/images/sifi-prakash/${cleanFileName}`,
            isNew: productIdCounter <= 5 // Mark first few as new across the board
        });
    }
}

sifiBrand.products = sifiProducts;

fs.writeFileSync(productsJsonPath, JSON.stringify(allData, null, 2), 'utf8');
console.log(`Successfully imported ${sifiProducts.length} Sifi Prakash products across all categories.`);
