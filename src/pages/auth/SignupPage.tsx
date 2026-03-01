import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '../../services/auth';
import { Building2, Mail, Lock, Phone, CheckCircle } from 'lucide-react';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        gstNumber: '',
        businessType: 'Retailer',
        phone: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            await signUpUser({
                email: formData.email,
                password: formData.password,
                companyName: formData.companyName,
                gstNumber: formData.gstNumber,
                phone: formData.phone,
                businessType: formData.businessType
            });

            setSuccessMsg("Registration successful! Welcome to Anubhav Traders B2B.");
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (error: any) {
            setErrorMsg(error.message || 'An unexpected error occurred during signup.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8 bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Become a Supply Partner</h2>
                    <p className="mt-2 text-sm text-gray-500 font-medium">
                        Register for distributor pricing and bulk order management
                    </p>
                </div>

                {errorMsg && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                        <p className="text-sm text-red-700 font-bold">{errorMsg}</p>
                    </div>
                )}
                {successMsg && (
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                        <p className="text-sm text-emerald-700 font-bold">{successMsg}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        {/* Company Name */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Company / Shop Name *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Building2 className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="companyName"
                                    required
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="e.g. Acme Retailers"
                                />
                            </div>
                        </div>

                        {/* GST */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">GST Number (Optional)</label>
                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleInputChange}
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase font-mono text-sm"
                                placeholder="22AAAAA0000A1Z5"
                            />
                        </div>

                        {/* Business Type */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Business Type *</label>
                            <select
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleInputChange}
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                            >
                                <option value="Retailer">Retail Store</option>
                                <option value="Distributor">Distributor / Wholesaler</option>
                                <option value="Hotel/Restaurant">Hotel / Restaurant (HoReCa)</option>
                                <option value="Corporate">Corporate Buyer</option>
                            </select>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="+91"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="dealer@company.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Create Password *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    minLength={6}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Min. 6 characters"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-blue-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Submit Application</span>
                                    <CheckCircle className="ml-2 w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600 font-medium">
                            Already registered?{' '}
                            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
