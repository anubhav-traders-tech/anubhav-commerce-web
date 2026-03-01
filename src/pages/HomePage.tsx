import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ShieldCheck, Truck } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
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

// Counter Hook
function useCounter(end: number, isVisible: boolean, duration: number = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;
        let startTimestamp: number | null = null;
        let animationFrame: number;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                animationFrame = window.requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };
        animationFrame = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return count;
}

function StatCounter({ title, value, suffix = '' }: { title: string, value: number, suffix?: string }) {
    const { ref, isVisible } = useScrollReveal();
    const count = useCounter(value, isVisible);
    return (
        <div ref={ref} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-colors shadow-xl">
            <div className="text-4xl sm:text-5xl font-black text-white mb-2">{count}{suffix}</div>
            <div className="text-emerald-100 font-bold tracking-wide uppercase text-sm">{title}</div>
        </div>
    );
}

export default function HomePage() {
    const { brands, allProducts } = useCatalog();

    const scrollToBrands = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById('brand-showcases')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* 1. HERO / ABOUT SECTION */}
            <section className="relative bg-emerald-900 pt-24 lg:pt-32 pb-32 lg:pb-40 px-4 sm:px-6 lg:px-8 border-b border-emerald-800 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c15273?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[100px] -z-0 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <RevealSection>
                        <span className="inline-block py-1.5 px-5 rounded-full bg-emerald-800 border border-emerald-700 text-emerald-100 font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
                            Professional B2B Network
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 leading-tight">
                            Anubhav<br className="hidden md:block" /> Traders
                        </h1>
                        <h2 className="text-xl md:text-2xl font-bold text-emerald-200 mb-6 drop-shadow-md">
                            Authorized Distributor of Leading FMCG & Ayurvedic Brands
                        </h2>
                        <p className="max-w-xl text-lg text-emerald-100/90 mb-10 leading-relaxed font-medium">
                            We are your trusted supply chain partner, specializing in bulk procurement and reliable distribution. Serving hundreds of retail locations with 100% authentic inventory and highly competitive margins.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={scrollToBrands}
                                className="inline-flex justify-center items-center px-8 py-4 border-2 border-transparent text-base font-bold rounded-xl text-emerald-900 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-px"
                            >
                                Explore Partnerships <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                            </button>
                            <Link
                                to="/contact"
                                className="inline-flex justify-center items-center px-8 py-4 border-2 border-emerald-400/30 text-base font-bold rounded-xl text-white bg-white/5 hover:bg-white/10 shadow-sm transition-all duration-300 backdrop-blur-sm"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </RevealSection>

                    {/* Right: 3D Illustration */}
                    <RevealSection className="hidden lg:flex justify-center items-center relative">
                        <div className="relative w-full max-w-lg">
                            <img
                                src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800"
                                alt="Modern Logistics Warehouse"
                                className="w-full h-auto rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-emerald-700/50 animate-float object-cover aspect-[4/3]"
                            />
                            {/* Floating decorative elements */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 animate-float" style={{ animationDelay: '1s' }}>
                                <ShieldCheck className="w-10 h-10 text-emerald-600 mb-2" />
                                <div className="font-black text-gray-900 leading-tight">100%<br />Authentic</div>
                            </div>
                            <div className="absolute -top-8 -right-8 bg-emerald-800 p-6 rounded-2xl shadow-xl border border-emerald-600 animate-float" style={{ animationDelay: '2s' }}>
                                <Truck className="w-10 h-10 text-emerald-400 mb-2" />
                                <div className="font-black text-white leading-tight">Fast<br />Delivery</div>
                            </div>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* AI PRODUCT FINDER */}
            <AIProductFinder />

            {/* 2. BRAND PARTNERSHIPS GRID */}
            <section id="brand-showcases" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto">
                    <RevealSection className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-tight mb-4">
                            Our Brand Partnerships
                        </h2>
                        <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
                            Exclusive distribution rights with India's most trusted manufacturers.
                        </p>
                    </RevealSection>

                    <RevealSection className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {brands.map((brand) => (
                            <a
                                key={brand.id}
                                href={`#showcase-${brand.id}`}
                                className="group bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 aspect-square"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(`showcase-${brand.id}`)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-w-[120px] max-h-[80px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                />
                            </a>
                        ))}
                    </RevealSection>
                </div>
            </section>

            {/* 3. BRAND SHOWCASE SECTIONS */}
            {brands.slice(0, 5).map((brand, idx) => {
                const isEven = idx % 2 === 0;
                // Get 4 products max for showcase
                const brandProducts = allProducts.filter(p => (p as any).brandName === brand.name || p.brandSlug === brand.id).slice(0, 4);

                if (brandProducts.length === 0) return null;

                const bgColors = isEven ? 'bg-white' : 'bg-emerald-50/40';
                const layoutDir = isEven ? 'lg:flex-row' : 'lg:flex-row-reverse';

                return (
                    <section id={`showcase-${brand.id}`} key={brand.id} className={`py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 scroll-mt-24 ${bgColors}`}>
                        <div className="max-w-7xl mx-auto">
                            <RevealSection className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${layoutDir}`}>
                                {/* Brand Profile */}
                                <div className="flex-1 w-full lg:w-1/3 text-center lg:text-left">
                                    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 inline-flex items-center justify-center mb-6 h-32 w-48 hover:-translate-y-1 transition-transform">
                                        <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{brand.name}</h3>
                                    <p className="text-gray-600 font-medium text-lg leading-relaxed mb-8">
                                        {brand.description || `Discover the premium range of authentic products from ${brand.name}. Partnered directly for authorized wholesale distribution across retail networks.`}
                                    </p>
                                    <Link
                                        to={`/brand/${brand.id}`}
                                        className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-md group"
                                    >
                                        View Full Catalog <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Brand Products */}
                                <div className="flex-1 w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {brandProducts.map(prod => (
                                        <div key={prod.id} className="h-full">
                                            <ProductCard product={prod} brandName={brand.name} />
                                        </div>
                                    ))}
                                </div>
                            </RevealSection>
                        </div>
                    </section>
                );
            })}

            {/* 4. DISTRIBUTION STATS SECTION */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-emerald-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-fixed bg-center opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <RevealSection className="text-center mb-16">
                        <h2 className="text-3xl font-black text-white sm:text-4xl tracking-tight mb-4">
                            Our Supply Power
                        </h2>
                        <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6 relative"></div>
                        <p className="text-lg text-emerald-100 font-medium max-w-2xl mx-auto">
                            Equipped to handle high-volume procurement and rapid fulfillment across territories.
                        </p>
                    </RevealSection>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        <StatCounter title="Premier Brands" value={brands.length} suffix="+" />
                        <StatCounter title="SKUs Available" value={Math.floor(allProducts.length / 50) * 50} suffix="+" />
                        <StatCounter title="Retail Partners" value={500} suffix="+" />
                        <StatCounter title="Cities Served" value={25} suffix="+" />
                    </div>
                </div>
            </section>

            {/* 5. STRONG CTA SECTION */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100 border-t border-gray-200">
                <div className="max-w-5xl mx-auto">
                    <RevealSection className="bg-white rounded-[2rem] p-10 sm:p-16 border border-gray-200 shadow-xl shadow-gray-200/50 text-center relative overflow-hidden">
                        {/* Decorative background circle */}
                        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-0"></div>
                        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-0"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                                Looking for Bulk Orders?
                            </h2>
                            <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                                Get special distributor margins, reliable delivery schedules, and dedicated account management for your enterprise.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    to="/products"
                                    className="inline-flex justify-center items-center px-10 py-4 border-2 border-transparent text-lg font-bold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 shadow-xl shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1"
                                >
                                    Shop Now
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex justify-center items-center px-10 py-4 border-2 border-gray-200 text-lg font-bold rounded-xl text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all duration-300 hover:-translate-y-1"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </RevealSection>
                </div>
            </section>
        </div>
    );
}
