import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts, BRANDS } from '../data/brands';
import { ProductCard } from '../components/ui/ProductCard';

export default function ProductsPage() {
    const [selectedBrand, setSelectedBrand] = useState('all');
    const allProducts = getAllProducts();

    const filteredProducts = selectedBrand === 'all'
        ? allProducts
        : allProducts.filter(p => (p as any).brandSlug === selectedBrand);

    return (
        <div className="min-h-screen bg-gray-50 py-24">
            {/* Decorative top background */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6 border border-blue-100 tracking-wide uppercase">
                        Complete Catalogue
                    </span>
                    <h1 className="text-5xl font-black text-gray-900 sm:text-6xl mb-6 tracking-tight">Supply Inventory</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">Browse our complete catalogue of authorized FMCG and Ayurvedic products ready for bulk delivery.</p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Sidebar / Filters */}
                    <div className="w-full md:w-72 flex-shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            className="bg-white/80 backdrop-blur-xl border border-gray-200/60 p-8 rounded-3xl sticky top-28 shadow-xl shadow-gray-200/50"
                        >
                            <h3 className="font-extrabold text-gray-900 mb-6 text-xl tracking-tight">Filter Directory</h3>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-4 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedBrand === 'all' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                                        {selectedBrand === 'all' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                    <input type="radio" name="brand" value="all" className="hidden" onChange={() => setSelectedBrand('all')} />
                                    <span className={`text-sm font-bold transition-colors ${selectedBrand === 'all' ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-800'}`}>
                                        All Partner Brands
                                    </span>
                                </label>

                                {BRANDS.map((brand, i) => (
                                    <motion.label
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                        key={brand.id} className="flex items-center space-x-4 cursor-pointer group"
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedBrand === brand.slug ? 'border-blue-600 bg-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                                            {selectedBrand === brand.slug && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <input type="radio" name="brand" value={brand.slug} className="hidden" onChange={() => setSelectedBrand(brand.slug)} />
                                        <span className={`text-sm font-bold transition-colors ${selectedBrand === brand.slug ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-800'}`}>
                                            {brand.name}
                                        </span>
                                    </motion.label>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="border-b-2 border-gray-100 pb-6 mb-10 flex justify-between items-center sticky top-[80px] pt-6 z-10 glass rounded-b-3xl px-6">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                Showing {filteredProducts.length} items
                            </span>
                        </div>

                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map(product => (
                                    <motion.div
                                        key={`${product.id}-${(product as any).brandSlug}`}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProductCard product={product} brandName={(product as any).brandName} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredProducts.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 glass rounded-3xl mt-8">
                                <span className="inline-block w-16 h-16 bg-gray-100 rounded-2xl mb-6"></span>
                                <h3 className="text-2xl font-bold text-gray-400 mb-2">No active inventory</h3>
                                <p className="text-gray-500">Select a different partner brand to view items.</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
