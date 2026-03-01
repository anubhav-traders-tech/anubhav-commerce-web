import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { BrandCard } from '../components/ui/BrandCard';
import { ProductCard } from '../components/ui/ProductCard';
import { AIProductFinder } from '../components/ui/AIProductFinder';
import { useEffect, useRef, useState } from 'react';

// Scroll reveal custom hook
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}

function RevealSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div ref={ref} className={`reveal ${isVisible ? 'active' : ''} ${className}`}>
            {children}
        </div>
    );
}

export default function HomePage() {
    const { brands, allProducts } = useCatalog();
    const featuredProducts = allProducts.filter(p => p.isNew).slice(0, 8);
    if (featuredProducts.length === 0) {
        featuredProducts.push(...allProducts.slice(0, 8)); // Fallback
    }

    // Double the brands array for infinite seamless scroll
    const scrollBrands = [...brands, ...brands, ...brands];

    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. HERO SECTION */}
            <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10 pt-10">
                    <RevealSection>
                        <span className="inline-block py-1.5 px-5 rounded-full bg-white text-gray-800 font-bold text-xs uppercase tracking-widest mb-6 border border-gray-200 shadow-sm">
                            B2B Wholesale & Distribution
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
                            Trusted FMCG & Ayurvedic <br className="hidden md:block" />
                            <span className="text-blue-600">Brand Distributor</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                            Supplying Retailers and Bulk Buyers Across Multiple Categories with 100% Authentic Products & Competitive Margins.
                        </p>
                        <div className="flex justify-center flex-col sm:flex-row gap-4">
                            <Link
                                to="/brands"
                                className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-gray-900 shadow-md transition-all duration-300"
                            >
                                Explore Brands
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex justify-center items-center px-8 py-3.5 border border-gray-200 text-base font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* AI PRODUCT FINDER */}
            <AIProductFinder />

            {/* 2. LOGO SCROLL STRIP */}
            <section className="py-10 bg-white border-b border-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Authorized Distributor For</p>
                </div>
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex overflow-hidden group">
                    <div className="animate-scrollX flex items-center gap-16 px-8">
                        {scrollBrands.map((brand, idx) => (
                            <img
                                key={idx}
                                src={brand.logo}
                                alt={brand.name}
                                className="h-16 w-auto object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 filter"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. OUR BRANDS GRID */}
            <section id="brands" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 pb-24">
                <div className="max-w-7xl mx-auto">
                    <RevealSection className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-tight mb-4">
                            Premium Partner Brands
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </RevealSection>

                    <RevealSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {brands.map(brand => (
                            <BrandCard key={brand.id} brand={brand} />
                        ))}
                    </RevealSection>
                </div>
            </section>

            {/* 4. FEATURED PRODUCTS (NEW ARRIVALS) */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <RevealSection className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-tight mb-4">Fast-Moving Inventory</h2>
                            <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
                        </div>
                        <Link to="/products" className="hidden sm:flex items-center text-blue-600 hover:text-gray-900 font-bold group transition-colors">
                            View All Catalog <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </RevealSection>

                    <RevealSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} brandName={(product as any).brandName} />
                        ))}
                    </RevealSection>

                    <div className="mt-12 text-center sm:hidden">
                        <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold">
                            View All Catalog <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. ABOUT ANUBHAV TRADERS */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <RevealSection className="bg-white rounded-[2rem] p-8 md:p-14 border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-16">
                        {/* Left Side: About short paragraph */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
                                About Anubhav Traders
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">
                                We are a premier multi-brand distributor specializing in FMCG and Ayurvedic products.
                                With years of industry expertise, we seamlessly connect top-tier manufacturers with diverse retail networks.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                Our robust supply chain enables bulk supply capabilities ensuring your shelves never go empty.
                                Whether you're a local pharmacy, a supermarket, or an independent retailer, we are equipped to scale with your demand.
                            </p>
                        </div>

                        {/* Right Side: Bullet Highlights */}
                        <div className="flex-1 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Why Partner With Us?</h3>
                            <ul className="space-y-5">
                                {[
                                    'Trusted by Hundreds of Retailers',
                                    'Extensive Multi-Brand Portfolio',
                                    'Highly Competitive Wholesale Pricing',
                                    'Fast & Reliable Order Processing'
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <span className="text-lg font-bold text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* 6. CONTACT & LOCATION */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <RevealSection className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Contact Info */}
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Our Location</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Anubhav Traders</h3>
                                    <p className="text-gray-500 font-medium">Authorized Wholesale Distributor</p>
                                </div>

                                <ul className="space-y-6">
                                    <li className="flex items-start">
                                        <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-700 font-medium">F-241, Sector 3, Bawana Industrial Area,<br />Sector 3, Bawana, Delhi, 110039</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Phone className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                                        <span className="text-lg text-gray-700 font-bold">+91-8851412032</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Mail className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                                        <span className="text-lg text-gray-700 font-medium">info@anubhavtraders.com</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-lg text-gray-700 font-medium">Mon - Sat: 9:00 AM - 7:00 PM</p>
                                            <p className="text-gray-500 mt-1">Sunday Closed</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right: Google Map Embed */}
                        <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13992.358249627763!2d77.05445738804797!3d28.80211905307527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d07afc1c385db%3A0xc3924f3bf322af6!2sSector%203%2C%20Bawana%2C%20Delhi%2C%20110039!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Anubhav Traders Location Map"
                            ></iframe>
                        </div>

                    </RevealSection>
                </div>
            </section>

        </div>
    );
}
