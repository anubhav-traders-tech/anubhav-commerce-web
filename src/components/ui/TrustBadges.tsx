import { ShieldCheck, Lock, CheckCircle2, Zap } from 'lucide-react';

export const TrustBadges = () => {
    return (
        <section className="py-12 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-4" />
                        <h4 className="text-gray-900 font-bold mb-1 tracking-tight">GST Registered</h4>
                        <p className="text-xs text-gray-500 font-medium tracking-wide">100% Valid Tax Invoice</p>
                    </div>
                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <Lock className="w-10 h-10 text-emerald-600 mb-4" />
                        <h4 className="text-gray-900 font-bold mb-1 tracking-tight">Secure Checkout</h4>
                        <p className="text-xs text-gray-500 font-medium tracking-wide">Data Encrypted</p>
                    </div>
                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <ShieldCheck className="w-10 h-10 text-emerald-600 mb-4" />
                        <h4 className="text-gray-900 font-bold mb-1 tracking-tight">Authorized Distributor</h4>
                        <p className="text-xs text-gray-500 font-medium tracking-wide">100% Authentic Stock</p>
                    </div>
                    <div className="flex flex-col items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <Zap className="w-10 h-10 text-emerald-600 mb-4" />
                        <h4 className="text-gray-900 font-bold mb-1 tracking-tight">Fast Processing</h4>
                        <p className="text-xs text-gray-500 font-medium tracking-wide">Timely Despatch</p>
                    </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest text-center">
                    <span>Trusted by 500+ Retailers</span>
                    <span className="hidden md:inline text-gray-300">•</span>
                    <span>Serving 25+ Cities</span>
                </div>
            </div>
        </section>
    );
};
