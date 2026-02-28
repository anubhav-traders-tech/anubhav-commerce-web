import { motion } from 'framer-motion';
import { Send, Store, User, Phone, MapPin } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

export default function InquiryPage() {
    const { brands } = useCatalog();
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-blue-900 to-transparent mix-blend-multiply opacity-5 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6 border border-blue-100 uppercase tracking-widest shadow-sm">
                        Wholesale Trading
                    </span>
                    <h1 className="text-5xl font-black text-gray-900 sm:text-6xl mb-6 tracking-tight">Bulk Inquiry</h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed font-medium">
                        Request a wholesale quote or inquire about bulk dealership opportunities for our FMCG and Ayurvedic brands.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
                    className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-14"
                >
                    <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>

                        {/* Section 1: Business Details */}
                        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative">
                            <div className="absolute top-0 -left-6 w-1 h-full bg-blue-600 rounded-r-lg"></div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight flex items-center">
                                <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center mr-4 text-xl">1</span>
                                Business Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                                        <Store className="w-4 h-4 mr-2 text-gray-400" />
                                        Business/Shop Name <span className="text-blue-500 ml-1">*</span>
                                    </label>
                                    <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400" placeholder="Anubhav Store" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                                        <User className="w-4 h-4 mr-2 text-gray-400" />
                                        Contact Person <span className="text-blue-500 ml-1">*</span>
                                    </label>
                                    <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400" placeholder="Owner Name" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                        Phone Number <span className="text-blue-500 ml-1">*</span>
                                    </label>
                                    <input type="tel" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400" placeholder="+91" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                        City / Region <span className="text-blue-500 ml-1">*</span>
                                    </label>
                                    <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400" placeholder="District/City" required />
                                </div>
                            </div>
                        </motion.div>

                        <div className="h-px bg-gray-100 w-full"></div>

                        {/* Section 2: Inquiry Requirements */}
                        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative">
                            <div className="absolute top-0 -left-6 w-1 h-full bg-cyan-500 rounded-r-lg"></div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight flex items-center">
                                <span className="bg-cyan-100 text-cyan-600 w-10 h-10 rounded-xl flex items-center justify-center mr-4 text-xl">2</span>
                                Order Requirements
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Brands of Interest</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {brands.map(brand => (
                                            <label key={brand.id} className="group relative flex items-center space-x-3 bg-white p-4 rounded-2xl border-2 border-gray-100 cursor-pointer hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                                                <input type="checkbox" className="h-5 w-5 text-blue-600 rounded bg-gray-50 border-gray-300 focus:ring-blue-500 focus:ring-offset-0" />
                                                <span className="text-sm font-bold text-gray-900 select-none block truncate">{brand.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Order Specifications <span className="text-blue-500 ml-1">*</span></label>
                                    <textarea rows={6} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all block resize-none font-medium placeholder:text-gray-400" placeholder="Please specify product quantities, SKU lists, or general dealership requests..." required></textarea>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants} initial="hidden" animate="visible"
                            className="pt-6"
                        >
                            <button type="submit" className="w-full flex justify-center items-center py-5 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-blue-600 hover:to-blue-700 text-white font-black rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] text-xl tracking-wide shadow-xl group">
                                Submit Dealership Inquiry
                                <Send className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </motion.div>

                    </form>
                </motion.div>
            </div>
        </div>
    );
}
