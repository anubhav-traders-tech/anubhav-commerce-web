import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCatalog } from '../context/CatalogContext';
import { ProductCard } from '../components/ui/ProductCard';

export default function BrandPage() {
    const { slug } = useParams<{ slug: string }>();

    const { brands } = useCatalog();
    const brand = brands.find(b => b.slug === slug);

    if (!brand) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">Brand Not Found</h1>
                <Link to="/brands" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Return to Brands
                </Link>
            </div>
        );
    }

    // Get unique categories for this brand
    const categories = Array.from(new Set(brand.products.map(p => p.category)));

    return (
        <div className="bg-white min-h-screen">
            {/* Brand Banner */}
            <div className="relative bg-gray-900 overflow-hidden">
                {/* Abstract background for modern look */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-cyan-900/20 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
                    >
                        <div className="w-56 h-56 bg-white rounded-3xl flex items-center justify-center p-8 flex-shrink-0 shadow-2xl shadow-black/50 border-4 border-white/10 backdrop-blur-sm">
                            <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-md">{brand.name}</h1>
                            <p className="text-xl text-blue-100/80 max-w-3xl leading-relaxed">{brand.description}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Product Categories / Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {categories.map((category, index) => {
                    const catProducts = brand.products.filter(p => p.category === category);

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }}
                            key={category} className="mb-20 last:mb-0"
                        >
                            <div className="flex items-center mb-10 overflow-hidden">
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight pr-6">{category}</h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {catProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </motion.div>
                    );
                })}

                {brand.products.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-400">Inventory Syncing in Progress</h3>
                        <p className="text-gray-500 mt-2">Products for this brand are being updated.</p>
                    </div>
                )}
            </div>

            {/* Inquiry Button CTA */}
            <div className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 py-24 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                    <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6 border border-blue-100 tracking-wide uppercase">
                        Exclusive Supply
                    </span>
                    <h3 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Interested in stocking {brand.name}?</h3>
                    <Link
                        to="/inquiry"
                        className="inline-flex justify-center items-center px-10 py-4 text-lg font-bold rounded-xl text-white bg-gray-900 hover:bg-blue-600 shadow-xl shadow-gray-900/20 hover:shadow-blue-600/30 transition-all hover:-translate-y-1"
                    >
                        Request Wholesale Quote
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
