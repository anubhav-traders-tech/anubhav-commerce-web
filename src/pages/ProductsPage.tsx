import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCatalog } from '../context/CatalogContext';
import { ProductCard } from '../components/ui/ProductCard';
import { Filter, X, ChevronDown, Check } from 'lucide-react';

export default function ProductsPage() {
    const { brands, allProducts } = useCatalog();

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const categories = useMemo(() => {
        return Array.from(new Set(allProducts.map(p => p.category).filter(Boolean)));
    }, [allProducts]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = allProducts.filter(p => {
            if (selectedBrands.length > 0 && !selectedBrands.includes((p as any).brandSlug)) return false;
            if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;

            const price = p.selling_price || p.mrp || 0;
            if (price < (priceRange.min || 0) || price > (priceRange.max || Infinity)) return false;

            if (inStockOnly && p.stock !== undefined && p.stock <= 0) return false;

            return true;
        });

        result.sort((a, b) => {
            const priceA = a.selling_price || a.mrp || 0;
            const priceB = b.selling_price || b.mrp || 0;
            switch (sortBy) {
                case 'price_asc': return priceA - priceB;
                case 'price_desc': return priceB - priceA;
                case 'alpha': return a.name.localeCompare(b.name);
                case 'newest':
                default:
                    // Assuming id represents recency or keeping original order
                    return 0;
            }
        });

        return result;
    }, [allProducts, selectedBrands, selectedCategories, priceRange, inStockOnly, sortBy]);

    const handleClearAll = () => {
        setSelectedBrands([]);
        setSelectedCategories([]);
        setPriceRange({ min: 0, max: 10000 });
        setInStockOnly(false);
        setSortBy('newest');
    };

    const FilterContent = () => (
        <div className="space-y-8">
            {/* Clear All Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-gray-900 text-xl tracking-tight">Filters</h3>
                <button onClick={handleClearAll} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                    Clear All
                </button>
            </div>

            {/* In Stock Toggle */}
            <label className="flex items-center justify-between cursor-pointer group bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-sm font-bold text-gray-900">In Stock Only</span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${inStockOnly ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${inStockOnly ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
                <input type="checkbox" className="hidden" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
            </label>

            {/* Price Range */}
            <div className="space-y-4">
                <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Price Range (₹)</h4>
                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-gray-400 font-bold">-</span>
                    <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
                <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Brands</h4>
                {brands.map((brand) => (
                    <label key={brand.id} className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedBrands.includes(brand.slug) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white group-hover:border-blue-400'}`}>
                            {selectedBrands.includes(brand.slug) && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedBrands.includes(brand.slug)}
                            onChange={(e) => {
                                if (e.target.checked) setSelectedBrands(prev => [...prev, brand.slug]);
                                else setSelectedBrands(prev => prev.filter(b => b !== brand.slug));
                            }}
                        />
                        <span className={`text-sm tracking-wide transition-colors ${selectedBrands.includes(brand.slug) ? 'font-bold text-gray-900' : 'font-medium text-gray-600 group-hover:text-gray-900'}`}>
                            {brand.name}
                        </span>
                    </label>
                ))}
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
                <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Categories</h4>
                {categories.map((cat) => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white group-hover:border-blue-400'}`}>
                            {selectedCategories.includes(cat) && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedCategories.includes(cat)}
                            onChange={(e) => {
                                if (e.target.checked) setSelectedCategories(prev => [...prev, cat]);
                                else setSelectedCategories(prev => prev.filter(c => c !== cat));
                            }}
                        />
                        <span className={`text-sm tracking-wide transition-colors ${selectedCategories.includes(cat) ? 'font-bold text-gray-900' : 'font-medium text-gray-600 group-hover:text-gray-900'}`}>
                            {cat}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-24">
            {/* Decorative top background */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="mb-8 md:mb-16 text-center"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6 border border-blue-100 tracking-wide uppercase">
                        Complete Catalogue
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Supply Inventory</h1>
                </motion.div>

                {/* Mobile Filter & Sort Controls */}
                <div className="md:hidden flex items-center gap-4 mb-6 relative z-30">
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl font-bold text-gray-700 shadow-sm active:scale-[0.98] transition-transform"
                    >
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                    <div className="flex-1 relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-200 py-3 pl-4 pr-10 rounded-xl font-bold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="newest">Newest</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="alpha">A-Z</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10 relative items-start">
                    {/* Desktop Sidebar / Filters */}
                    <div className="hidden md:block w-72 flex-shrink-0 sticky top-28 z-20">
                        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/60 p-6 rounded-3xl shadow-xl shadow-gray-200/50 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
                            <FilterContent />
                        </div>
                    </div>

                    {/* Product Grid Area */}
                    <div className="flex-1 w-full min-w-0">
                        {/* Desktop Toolbar */}
                        <div className="hidden md:flex justify-between items-center mb-8 bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm sticky top-[80px] z-20 py-3 px-6 rounded-2xl">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                                {filteredAndSortedProducts.length} Products Found
                            </span>
                            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-blue-400 transition-colors">
                                <span className="pl-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Sort:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-transparent py-2.5 pl-3 pr-10 text-sm font-bold text-gray-900 focus:outline-none cursor-pointer"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="alpha">A-Z</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                            <AnimatePresence mode="popLayout">
                                {filteredAndSortedProducts.map(product => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ProductCard product={product} brandName={(product as any).brandName} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredAndSortedProducts.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white rounded-3xl mt-8 border border-gray-100 shadow-sm">
                                <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                                <button onClick={handleClearAll} className="px-6 py-2.5 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition-colors">
                                    Clear Filters
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                            <h2 className="text-xl font-extrabold text-gray-900">Filters</h2>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                            <FilterContent />
                        </div>

                        {/* Sticky Apply Button */}
                        <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0 z-10">
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 ripple-btn"
                            >
                                Apply Filters ({filteredAndSortedProducts.length} Products)
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
