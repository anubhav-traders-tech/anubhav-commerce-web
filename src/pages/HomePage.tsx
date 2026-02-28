import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRANDS, getAllProducts } from '../data/brands';
import { BrandCard } from '../components/ui/BrandCard';
import { ProductCard } from '../components/ui/ProductCard';

export default function HomePage() {
    const allProducts = getAllProducts();
    const featuredProducts = allProducts.filter(p => p.isNew).slice(0, 8);
    if (featuredProducts.length === 0) {
        featuredProducts.push(...allProducts.slice(0, 8)); // Fallback
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. HERO SECTION */}
            <section className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute right-0 bottom-0 w-[500px] h-[300px] bg-cyan-100/40 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10 pt-8 pb-12">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                        <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6 border border-blue-100 shadow-sm">
                            Trusted FMCG Distribution Partner
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                            Authorized Distributor of<br className="hidden md:block" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500">
                                Leading Ayurvedic Brands
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed">
                            Supplying retailers, pharmacies, and bulk buyers with high-quality products across multiple FMCG categories.
                        </p>
                        <div className="flex justify-center flex-col sm:flex-row gap-5">
                            <Link
                                to="/brands"
                                className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-lg font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1"
                            >
                                Explore Brands
                            </Link>
                            <Link
                                to="/inquiry"
                                className="inline-flex justify-center items-center px-8 py-3.5 border-2 border-gray-200 text-lg font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:-translate-y-1"
                            >
                                Send Inquiry
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. OUR BRANDS SECTION */}
            <section id="brands" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl font-extrabold text-gray-900 sm:text-5xl tracking-tight mb-4">
                            Premium Partner Brands
                        </motion.h2>
                        <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-xl text-gray-500">
                            We exclusively partner with verified manufacturers to ensure 100% authentic supply.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {BRANDS.map(brand => (
                            <motion.div key={brand.id} variants={itemVariants}>
                                <BrandCard brand={brand} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 3. FEATURED PRODUCTS SECTION */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">New Arrivals</h2>
                            <p className="mt-4 text-xl text-gray-500">Fast-moving stock freshly added to our inventory.</p>
                        </div>
                        <Link to="/products" className="hidden sm:flex items-center text-blue-600 hover:text-blue-700 font-semibold group">
                            View All Products <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} brandName={(product as any).brandName} />
                        ))}
                    </div>

                    <div className="mt-12 text-center sm:hidden">
                        <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-semibold">
                            View All Products <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. ABOUT / CREDIBILITY SECTION */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="bg-white rounded-[2rem] p-8 md:p-16 border border-gray-200/60 shadow-xl shadow-gray-200/50 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">

                        {/* Soft background shape */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10 opacity-70"></div>

                        <div className="flex-1">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 sm:text-4xl tracking-tight">
                                Why Partner With Us?
                            </h2>
                            <div className="grid gap-6">
                                {[
                                    { icon: ShieldCheck, title: 'Trusted Authenticity', desc: '100% genuine products directly sourced from brands.' },
                                    { icon: Truck, title: 'Reliable Supply Chain', desc: 'Consistent fulfillment for bulk and high-volume retail orders.' },
                                    { icon: Package, title: 'Extensive Catalogue', desc: 'Hundreds of fast-moving consumer goods across categories.' },
                                    { icon: CheckCircle2, title: 'Competitive Pricing', desc: 'Best wholesale margins negotiated for our retail partners.' }
                                ].map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                        key={i} className="flex items-start"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                            <p className="text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                                className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl relative"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1586528116311-ad8ed7c15273?auto=format&fit=crop&q=80&w=1200"
                                    alt="Modern Distribution Warehouse"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. INQUIRY CTA SECTION */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
                {/* Abstract background details */}
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[80px] -z-10 translate-y-1/2 mix-blend-screen"></div>
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[60px] -z-10 -translate-y-1/2 mix-blend-screen"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-6 tracking-tight">
                            Ready for Bulk Procurement?
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Connect with us for wholesale inquiries, dealership requests, and bulk supply quotes tailormade for your business needs.
                        </p>
                        <Link
                            to="/inquiry"
                            className="inline-flex justify-center items-center px-10 py-4 border border-transparent text-lg font-bold rounded-xl text-gray-900 bg-white hover:bg-gray-100 shadow-xl hover:-translate-y-1 transition-all"
                        >
                            Contact Sales Team
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
