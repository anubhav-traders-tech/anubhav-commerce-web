const fs = require('fs');
const path = require('path');

try {
    const srcBaseDir = 'D:\\Anubhav Traders\\anubhav-commerce-web\\AnubhavTraders\\catalogs\\Sifi Prakash';
    const destImagesDir = 'D:\\Anubhav Traders\\anubhav-commerce-web\\public\\catalog\\images\\sifi-prakash';
    const productsJsonPath = 'D:\\Anubhav Traders\\anubhav-commerce-web\\public\\catalog\\products.json';

    if (!fs.existsSync(destImagesDir)) {
        fs.mkdirSync(destImagesDir, { recursive: true });
    }

    let allData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
    let sifiBrand = allData.find(b => b.id === 'sifi-prakash');

    let sifiProducts = [];
    let productIdCounter = 1;

    const categoriesDir = fs.readdirSync(srcBaseDir);
    for (const catName of categoriesDir) {
        const catPath = path.join(srcBaseDir, catName);
        if (!fs.statSync(catPath).isDirectory()) continue;

        const catNameLower = catName.toLowerCase();

        if (catNameLower.includes('namkeen range mrp 5 & 10')) {
            const files = fs.readdirSync(catPath);
            for (const file of files) {
                if (!file.match(/\.(png|jpe?g)$/i)) continue;

                let productName = file.replace(/\.(png|jpe?g)$/i, '').trim();
                productName = productName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

                // Namkeen ₹5 Category
                let cleanFileName5 = 'namkeen-5-' + file.toLowerCase().replace(/[^a-z0-9\.]/g, '-').replace(/-+/g, '-');
                fs.copyFileSync(path.join(catPath, file), path.join(destImagesDir, cleanFileName5));
                sifiProducts.push({
                    id: `sp-${productIdCounter++}`,
                    name: productName,
                    category: 'Namkeen ₹5',
                    mrp: '₹5',
                    image: `/catalog/images/sifi-prakash/${cleanFileName5}`,
                    isNew: productIdCounter <= 6
                });

                // Namkeen ₹10 Category
                let cleanFileName10 = 'namkeen-10-' + file.toLowerCase().replace(/[^a-z0-9\.]/g, '-').replace(/-+/g, '-');
                fs.copyFileSync(path.join(catPath, file), path.join(destImagesDir, cleanFileName10));
                sifiProducts.push({
                    id: `sp-${productIdCounter++}`,
                    name: productName,
                    category: 'Namkeen ₹10',
                    mrp: '₹10',
                    image: `/catalog/images/sifi-prakash/${cleanFileName10}`,
                    isNew: productIdCounter <= 6
                });
            }
        } else if (catNameLower.includes('premium')) {
            const files = fs.readdirSync(catPath);
            for (const file of files) {
                if (!file.match(/\.(png|jpe?g)$/i)) continue;

                let productName = file.replace(/\.(png|jpe?g)$/i, '').trim();
                let productLower = productName.toLowerCase();
                let mrp = '₹50'; // Default according to readme

                if (productLower.includes('boondi') && !productLower.includes('pudina')) {
                    mrp = '₹30';
                } else if (productLower.includes('phalhari') || productLower.includes('35range')) {
                    mrp = '₹35';
                }

                if (productName.toLowerCase().includes('35range')) {
                    productName = productName.replace(/-?\s?35range/i, '').trim();
                }

                productName = productName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

                const cleanFileName = 'premium-range-' + file.toLowerCase().replace(/[^a-z0-9\.]/g, '-').replace(/-+/g, '-');
                fs.copyFileSync(path.join(catPath, file), path.join(destImagesDir, cleanFileName));

                sifiProducts.push({
                    id: `sp-${productIdCounter++}`,
                    name: productName,
                    category: 'Premium Range',
                    mrp: mrp,
                    image: `/catalog/images/sifi-prakash/${cleanFileName}`,
                    isNew: productIdCounter <= 6
                });
            }
        } else if (catNameLower.includes('snak') || catNameLower.includes('snacks')) {
            const files = fs.readdirSync(catPath);
            for (const file of files) {
                if (!file.match(/\.(png|jpe?g)$/i)) continue;

                let productName = file.replace(/\.(png|jpe?g)$/i, '').trim();
                productName = productName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

                const cleanFileName = 'snacks-' + file.toLowerCase().replace(/[^a-z0-9\.]/g, '-').replace(/-+/g, '-');
                fs.copyFileSync(path.join(catPath, file), path.join(destImagesDir, cleanFileName));

                sifiProducts.push({
                    id: `sp-${productIdCounter++}`,
                    name: productName,
                    category: 'Snacks',
                    mrp: '₹5',
                    image: `/catalog/images/sifi-prakash/${cleanFileName}`,
                    isNew: false
                });
            }
        }
    }

    sifiBrand.products = sifiProducts;
    fs.writeFileSync(productsJsonPath, JSON.stringify(allData, null, 2), 'utf8');
    console.log(`Successfully split and organized ${sifiProducts.length} Sifi Prakash products!`);

} catch (err) {
    console.error("FATAL ERROR:", err);
}
