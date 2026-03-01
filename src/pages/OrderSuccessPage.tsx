import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OrderSuccessPage() {
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        // Retrieve order details stored by CheckoutPage
        const storedOrder = localStorage.getItem('latestOrder');
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
            // Optional: clear it if you don't want them revisiting the page and reopening WA, 
            // but keeping it lets them refresh without crashing.
        }
    }, []);

    if (!orderData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No recent order found</h2>
                <Link to="/products" className="text-blue-600 hover:underline">Return to Shop</Link>
            </div>
        );
    }

    const handleWhatsAppClick = () => {
        if (orderData.whatsappUrl) {
            window.open(orderData.whatsappUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-center p-8 sm:p-12 mb-8 relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>

                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-2">Order Placed Successfully!</h1>
                    <p className="text-lg text-gray-500 mb-8 font-medium">Thank you for your business. Our team will contact you shortly.</p>

                    <div className="inline-block bg-gray-50 rounded-2xl border border-gray-100 px-6 py-4 mb-10">
                        <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Order ID</p>
                        <p className="text-2xl font-black tracking-widest text-emerald-600">{orderData.orderId}</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col items-center max-w-lg mx-auto">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Final Step: Confirm via WhatsApp</h3>
                        <p className="text-blue-800 text-sm mb-6 max-w-sm">
                            Please click the button below to send your order details directly to our WhatsApp for immediate processing.
                        </p>

                        <button
                            onClick={handleWhatsAppClick}
                            className="bg-[#25D366] hover:bg-[#1ead51] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md shadow-green-600/20 active:scale-[0.98] flex items-center justify-center space-x-2 w-full sm:w-auto"
                        >
                            <span>Confirm Order on WhatsApp</span>
                            <ExternalLink className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>

                {/* Summary Outline */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                        {orderData.products.slice(0, 3).map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center text-gray-700">
                                <span className="font-medium truncate pr-4">{item.name} x{item.quantity}</span>
                                <span className="font-bold flex-shrink-0">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                        {orderData.products.length > 3 && (
                            <div className="text-sm font-medium text-gray-400 italic">
                                + {orderData.products.length - 3} more items...
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                        <span className="text-gray-900 font-bold">Total Amount</span>
                        <span className="text-2xl font-black text-gray-900">₹{orderData.total}</span>
                    </div>
                </div>

                <div className="text-center">
                    <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
