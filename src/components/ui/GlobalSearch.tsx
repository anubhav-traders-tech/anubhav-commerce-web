import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';

export const GlobalSearch = () => {
    const { allProducts } = useCatalog();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (val: string) => {
        setQuery(val);
        if (val.trim().length > 1) {
            const lowerVal = val.toLowerCase();
            const matches: any[] = [];

            // Priority matching: Product Name > Brand > Category
            for (const p of allProducts) {
                if (matches.length >= 5) break;

                const nameMatch = p.name.toLowerCase().includes(lowerVal);
                const brandMatch = ((p as any).brandName || p.brandSlug)?.toLowerCase().includes(lowerVal);
                const categoryMatch = p.category?.toLowerCase().includes(lowerVal);

                if (nameMatch || brandMatch || categoryMatch) {
                    matches.push({
                        ...p,
                        matchType: nameMatch ? 'product' : brandMatch ? 'brand' : 'category'
                    });
                }
            }
            setSuggestions(matches);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    const handleSelect = (productId: string) => {
        setQuery('');
        setIsOpen(false);
        setIsMobileOpen(false);
        navigate(`/product/${productId}`);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (suggestions.length > 0) {
            handleSelect(suggestions[0].id);
        }
    };

    const highlightText = (text: string, highlight: string) => {
        if (!highlight.trim()) return <span>{text}</span>;
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return (
            <span>
                {parts.map((part, i) =>
                    regex.test(part) ? <strong key={i} className="text-blue-600 bg-blue-50">{part}</strong> : <span key={i}>{part}</span>
                )}
            </span>
        );
    };

    // Desktop View
    const desktopSearch = (
        <div ref={wrapperRef} className="hidden md:block relative w-full max-w-lg mx-8 z-50">
            <form onSubmit={handleFormSubmit} className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => { if (query.trim().length > 1) setIsOpen(true); }}
                    placeholder="Search products, brands, or categories..."
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-full pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                />
            </form>

            {isOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-fade-in divide-y divide-gray-50">
                    {suggestions.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => handleSelect(p.id)}
                            className="p-3 flex items-center hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-gray-50 rounded-lg p-1 mr-4" />
                            <div className="flex flex-col flex-1 truncate">
                                <span className="text-sm font-bold text-gray-900 truncate">
                                    {highlightText(p.name, query)}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-2">
                                    <span className="uppercase text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{p.matchType}</span>
                                    {p.category} • {(p as any).brandName}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Mobile View
    const mobileSearch = (
        <div className="md:hidden">
            <button
                onClick={() => setIsMobileOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <Search className="w-6 h-6" />
            </button>

            {isMobileOpen && (
                <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-fade-in">
                    <div className="flex items-center p-4 border-b border-gray-100 bg-white gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                autoFocus
                                type="text"
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-gray-50 border border-transparent text-gray-900 rounded-full pl-10 pr-4 py-3 text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all"
                            />
                        </div>
                        <button onClick={() => setIsMobileOpen(false)} className="p-2 text-gray-600 bg-gray-50 rounded-full hover:bg-gray-200">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                        {query.trim().length > 1 && suggestions.length > 0 ? (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                                {suggestions.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => handleSelect(p.id)}
                                        className="p-4 flex items-center active:bg-gray-50 cursor-pointer"
                                    >
                                        <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-gray-50 rounded-xl p-1 mr-4" />
                                        <div className="flex flex-col flex-1 truncate">
                                            <span className="text-sm font-bold text-gray-900 truncate">
                                                {highlightText(p.name, query)}
                                            </span>
                                            <span className="text-xs text-gray-500 mt-1">
                                                {p.category} • {(p as any).brandName}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : query.trim().length > 1 ? (
                            <div className="text-center text-gray-500 mt-10 font-medium">No results found for "{query}"</div>
                        ) : (
                            <div className="text-center text-gray-400 mt-10 text-sm">Type at least 2 characters to search</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            {desktopSearch}
            {mobileSearch}
        </>
    );
};
