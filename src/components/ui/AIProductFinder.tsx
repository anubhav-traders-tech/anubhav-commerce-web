import { useState, useRef, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { ProductCard } from './ProductCard';

export const AIProductFinder = () => {
    const { allProducts } = useCatalog();
    const [query, setQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Click outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const performSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        const lowerQuery = searchQuery.toLowerCase();

        // Smart Parsing Logic

        // 1. Detect max price
        let maxPrice = Infinity;
        const priceRegex = /(?:under|below|less than|max)\s*(?:rs\.?|₹)?\s*(\d+)/i;
        const priceMatch = lowerQuery.match(priceRegex);
        if (priceMatch) {
            maxPrice = parseInt(priceMatch[1], 10);
        } else {
            const strictNumberRegex = /(?:rs\.?|₹)\s*(\d+)/i;
            const strictMatch = lowerQuery.match(strictNumberRegex);
            if (strictMatch) {
                maxPrice = parseInt(strictMatch[1], 10);
            }
        }

        // 2. Extract remaining keywords for text matching
        let cleanQuery = lowerQuery
            .replace(priceRegex, '')
            .replace(/(?:rs\.?|₹)\s*(\d+)/g, '');

        const searchTerms = cleanQuery.split(/\s+/).filter(t => t.trim().length > 0);

        // 3. Filter products intelligently based on product dataset
        const filteredProducts = allProducts.filter(product => {
            const price = product.selling_price || product.mrp || 0;

            if (price > maxPrice) return false;

            const searchableText = [
                product.name,
                product.category,
                (product as any).brandName || product.brandSlug,
                product.key_features?.join(' '),
                product.short_description
            ].join(' ').toLowerCase();

            // All keywords must match
            for (const term of searchTerms) {
                if (!searchableText.includes(term)) {
                    return false;
                }
            }

            return true;
        });

        setResults(filteredProducts);
        setHasSearched(true);
        setShowSuggestions(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(query);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        setHasSearched(false);

        if (val.trim().length > 1) {
            // Generate quick suggestions of categories / brands or matched terms
            const lowerVal = val.toLowerCase();
            const possibleSuggestions = new Set<string>();

            allProducts.forEach(p => {
                if (p.name.toLowerCase().includes(lowerVal)) possibleSuggestions.add(p.name);
                if (p.category?.toLowerCase().includes(lowerVal)) possibleSuggestions.add(p.category);
                const brand = ((p as any).brandName || p.brandSlug)?.toLowerCase();
                if (brand && brand.includes(lowerVal)) possibleSuggestions.add((p as any).brandName || p.brandSlug);
            });

            setSuggestions(Array.from(possibleSuggestions).slice(0, 5));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        performSearch(suggestion);
    };

    return (
        <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 max-w-4xl mx-auto -mt-16 relative z-30 m-4 sm:m-8 lg:mx-auto">
            <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-blue-100">
                    <Sparkles className="w-4 h-4" />
                    <span className="tracking-wide uppercase">AI Product Finder</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 tracking-tight">Find Products Instantly</h2>
                <p className="text-gray-500 font-medium text-sm sm:text-base">Tell us what you're looking for — we'll help you find it.</p>
            </div>

            <div ref={wrapperRef} className="max-w-3xl mx-auto relative group">
                <form onSubmit={handleSearch} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => { if (query.trim().length > 1) setShowSuggestions(true); }}
                        className="block w-full pl-14 sm:pl-16 pr-[120px] sm:pr-40 py-4 sm:py-5 bg-gray-50 border-2 border-gray-100 text-gray-900 rounded-full focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white text-base sm:text-lg font-medium transition-all shadow-inner placeholder:text-gray-400"
                        placeholder="e.g. Pooja items under ₹200"
                    />
                    <div className="absolute inset-y-1.5 sm:inset-y-2 right-1.5 sm:right-2 flex items-center">
                        <button
                            type="submit"
                            className="bg-gray-900 hover:bg-blue-600 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-colors shadow-md hidden sm:block"
                        >
                            Find Products
                        </button>
                        <button
                            type="submit"
                            className="bg-gray-900 hover:bg-blue-600 text-white font-bold h-full aspect-square rounded-full transition-colors shadow-md sm:hidden flex items-center justify-center"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Dropdown Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                        <ul className="py-2">
                            {suggestions.map((suggestion, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center text-gray-700 font-medium transition-colors"
                                >
                                    <Search className="w-4 h-4 mr-3 text-gray-400" />
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Results Section */}
            {hasSearched && (
                <div className={`mt-10 pt-8 border-t border-gray-100 transition-all duration-500 ${hasSearched ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 space-y-3 sm:space-y-0">
                        <h3 className="text-lg font-bold text-gray-900">
                            Showing results for: <span className="text-blue-600">"{query}"</span>
                        </h3>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                            {results.length} found
                        </span>
                    </div>

                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2 pb-4">
                            {results.map(product => (
                                <ProductCard key={product.id} product={product} brandName={(product as any).brandName} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100">
                            <Sparkles className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                            <h4 className="text-lg font-bold text-gray-900 mb-2">No exact matches found</h4>
                            <p className="text-gray-500 font-medium text-sm">Try different keywords or browse our catalog.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
