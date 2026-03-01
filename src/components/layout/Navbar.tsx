import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Brands', path: '/brands' },
        { name: 'Products', path: '/products' },
        { name: 'Inquiry', path: '/inquiry' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <header className="fixed top-0 w-full z-50">
            {/* Top Bar - hides on scroll on desktop */}
            <div className={`bg-gray-100 text-gray-600 transition-all duration-300 hidden md:block border-b border-gray-200 ${scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-[11px] lg:text-xs font-medium tracking-wide">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> F-241, Sector 3, Bawana Industrial Area, Delhi 110039</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a href="tel:+918851412032" className="flex items-center hover:text-blue-600 transition-colors"><Phone className="w-3.5 h-3.5 mr-1" /> +91-8851412032</a>
                        <a href="mailto:info@anubhavtraders.com" className="flex items-center hover:text-blue-600 transition-colors"><Mail className="w-3.5 h-3.5 mr-1" /> info@anubhavtraders.com</a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                className={`w-full transition-all duration-300 ${scrolled
                    ? 'glass'
                    : 'bg-white/95 border-b border-gray-100'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        {/* Branding */}
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 flex flex-col justify-center group">
                                <span className="text-2xl font-black tracking-tighter text-gray-900 group-hover:text-blue-700 transition-colors leading-none">
                                    Anubhav<span className="text-blue-600">Traders</span>
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-gray-500 font-bold tracking-wider mt-1 hidden sm:block">
                                    AUTHORIZED DISTRIBUTOR OF FMCG
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex md:items-center md:space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isActive(link.path)
                                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Desktop Cart Icon */}
                            <Link to="/cart" className="relative ml-4 p-2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
                                <ShoppingCart className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1 shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* Mobile menu button and Cart */}
                        <div className="flex items-center space-x-4 md:hidden">
                            <Link to="/cart" className="relative p-2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
                                <ShoppingCart className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1 shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`md:hidden absolute w-full bg-white shadow-2xl transition-all duration-300 ease-in-out origin-top border-b border-gray-200 ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
                        }`}
                >
                    {/* Mobile Top Info */}
                    <div className="bg-gray-50 px-6 py-4 flex flex-col space-y-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
                        <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2" /> +91-8851412032</span>
                        <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2" /> info@anubhavtraders.com</span>
                    </div>

                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${isActive(link.path)
                                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                    : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};
