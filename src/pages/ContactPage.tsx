import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
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
        <div className="min-h-screen bg-gray-50 py-24 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[80px] -z-10 -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6 border border-blue-100 uppercase tracking-widest shadow-sm">
                            We're Here to Help
                        </span>
                        <h1 className="text-5xl font-black text-gray-900 sm:text-6xl mb-6 tracking-tight">Contact Us</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Have questions about our distribution network, product availability, or dealership terms? Reach out directly.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
                            className="p-10 md:p-14 bg-gradient-to-br from-gray-900 to-blue-950 text-white rounded-[2rem] shadow-2xl overflow-hidden relative"
                        >
                            {/* Decorative shapes */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold mb-6 tracking-tight">Direct Support</h3>
                                    <p className="text-gray-300 mb-12 text-lg leading-relaxed">
                                        Our dedicated sales and support team is available during standard business hours to assist with your operational needs.
                                    </p>

                                    <div className="space-y-8">
                                        <motion.div whileHover={{ x: 10 }} className="flex items-start group">
                                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400 mr-5 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner backdrop-blur-sm">
                                                <MapPin className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg text-white mb-1">Headquarters</h4>
                                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                                    123 Market Street, Business District,<br />City, State 12345
                                                </p>
                                            </div>
                                        </motion.div>

                                        <motion.div whileHover={{ x: 10 }} className="flex items-start group">
                                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400 mr-5 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner backdrop-blur-sm">
                                                <Phone className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg text-white mb-1">Phone Line</h4>
                                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">+91 98765 43210</p>
                                            </div>
                                        </motion.div>

                                        <motion.div whileHover={{ x: 10 }} className="flex items-start group">
                                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400 mr-5 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner backdrop-blur-sm">
                                                <Mail className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg text-white mb-1">Email Support</h4>
                                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">contact@anubhavtraders.com</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="mt-16 pt-8 border-t border-white/10 flex items-center text-gray-400 font-medium tracking-wide">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                    Monday - Saturday (9:00 AM to 6:00 PM)
                                </div>
                            </div>
                        </motion.div>

                        {/* General Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                            className="p-10 md:p-14 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100"
                        >
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Send a Message</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">Fill out the form below and we'll get back to you promptly.</p>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                            placeholder="e.g. John Doe"
                                            required
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                                            placeholder="+91"
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900 placeholder:text-gray-400 resize-none"
                                            placeholder="How can we help you today?"
                                            required
                                        ></textarea>
                                    </motion.div>

                                    <motion.button
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 group"
                                    >
                                        Send Message
                                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
