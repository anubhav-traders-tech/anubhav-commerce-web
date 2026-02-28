import { Link } from 'react-router-dom';
import { BRANDS } from '../../data/brands';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="col-span-1 md:col-span-1">
                        <span className="text-xl font-bold tracking-tight text-white block mb-4">Anubhav Traders</span>
                        <p className="text-sm text-gray-400 mb-4">
                            Authorized Distributor of Leading FMCG & Ayurvedic Brands. Supplying retailers and bulk buyers across multiple product categories.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-sm hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/brands" className="text-sm hover:text-white transition-colors">All Brands</Link></li>
                            <li><Link to="/products" className="text-sm hover:text-white transition-colors">Products</Link></li>
                            <li><Link to="/inquiry" className="text-sm hover:text-white transition-colors">Inquiry</Link></li>
                            <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Our Brands</h3>
                        <ul className="space-y-2">
                            {BRANDS.slice(0, 5).map(brand => (
                                <li key={brand.id}>
                                    <Link to={`/brand/${brand.slug}`} className="text-sm hover:text-white transition-colors">
                                        {brand.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">123 Market Street, Business District, City, State 12345</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                <span className="text-sm">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                <span className="text-sm">contact@anubhavtraders.com</span>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Anubhav Traders. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
