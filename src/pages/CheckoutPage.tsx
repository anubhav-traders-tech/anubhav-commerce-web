import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        pincode: '',
        businessType: 'Retailer',
        gstNumber: '',
        notes: ''
    });

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <Link to="/products" className="text-blue-600 hover:underline">Return to Shop</Link>
            </div>
        );
    }

    const sanitizeInput = (val: string) => val.replace(/[<>]/g, '').trimStart();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: sanitizeInput(value) }));
    };

    const sendOrderEmail = (orderData: any) => {
        return (window as any).emailjs.send(
            "service_1nx75kz",
            "template_qvmncrm",
            orderData
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (cart.length === 0) {
            setErrorMsg("Your cart has expired or is empty. Please add items before checking out.");
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.mobile.replace(/\D/g, ''))) {
            setErrorMsg("Please enter a valid 10-digit mobile number.");
            return;
        }

        const pinRegex = /^[0-9]{6}$/;
        if (!pinRegex.test(formData.pincode.trim())) {
            setErrorMsg("Please enter a valid 6-digit postal pincode.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Generate unique Order ID
            const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

            // Formatting Order Details for EmailJS
            const orderData = {
                order_id: orderId,
                order_date: new Date().toLocaleString(),
                name: formData.fullName,
                phone: formData.mobile,
                email: formData.email,
                business_type: formData.businessType,
                address: formData.address1 + (formData.address2 ? `, ${formData.address2}` : ''),
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                total: cartTotal,
                orders: cart.map(item => ({
                    name: item.name,
                    units: item.quantity,
                    price: item.price * item.quantity
                }))
            };

            // Send via EmailJS
            await sendOrderEmail(orderData);

            // Formatting Order Details for WhatsApp
            const orderDetailsText = `
*New Order Received - ${orderId}*

*Customer Details:*
Name: ${formData.fullName}
Phone: ${formData.mobile}
Email: ${formData.email || 'N/A'}
Address: ${formData.address1}, ${formData.address2 ? formData.address2 + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}
Business Type: ${formData.businessType}
GST: ${formData.gstNumber || 'N/A'}

*Products:*
${cart.map(item => `- ${item.name} (x${item.quantity}) = ₹${item.price * item.quantity}`).join('\n')}

*Total Amount: ₹${cartTotal}*
            `.trim();

            const encodedMessage = encodeURIComponent(orderDetailsText);
            const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;

            // Save order in local storage for order-success to pick up
            const newOrder = {
                orderId,
                customer: formData,
                products: cart,
                subtotal: cartTotal,
                total: cartTotal,
                orderDate: new Date().toISOString(),
                orderStatus: 'Pending',
                paymentStatus: 'Pending',
                whatsappUrl // Temporarily store here
            };

            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

            // Set current order for success page context
            localStorage.setItem('latestOrder', JSON.stringify(newOrder));

            // Clear cart & Redirect ONLY IF EMAIL SUCCESS
            clearCart();
            navigate('/order-success');

        } catch (error) {
            console.error('Error processing order:', error);
            setErrorMsg("Network Error: Failed to submit the order via EmailJS. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center space-x-2 text-gray-500 mb-8 hover:text-gray-900 w-fit cursor-pointer" onClick={() => navigate('/cart')}>
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium text-sm">Back to Cart</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Checkout Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Billing Details</h2>

                            {errorMsg && (
                                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                                    <p className="text-red-700 font-bold">{errorMsg}</p>
                                </div>
                            )}

                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                        <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number *</label>
                                        <input required type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 98765 43210" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
                                </div>

                                {/* Address Grid */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Address Line 1 *</label>
                                    <input required type="text" name="address1" value={formData.address1} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="House/Flat No., Building Name" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Address Line 2</label>
                                    <input type="text" name="address2" value={formData.address2} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Street, Sector, Area" />
                                </div>

                                <div className="grid sm:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                                        <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">State *</label>
                                        <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Pincode *</label>
                                        <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>

                                {/* Business Grid */}
                                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Account Type *</label>
                                        <select name="businessType" value={formData.businessType} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                                            <option value="Retailer">Retail Store</option>
                                            <option value="Distributor">Distributor / Wholesaler</option>
                                            <option value="Individual">Individual Customer</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">GST Number (Optional)</label>
                                        <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="22AAAAA0000A1Z5" />
                                    </div>
                                </div>

                                <div className="pt-4 pb-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Order Notes</label>
                                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Any special instructions..."></textarea>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Order Summary Compact */}
                    <div className="lg:col-span-5 h-full">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 sticky top-28 p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Review</h2>

                            <ul className="space-y-4 mb-6">
                                {cart.map(item => (
                                    <li key={item.id} className="flex justify-between items-center bg-gray-50/50 p-2 rounded-lg">
                                        <div className="flex items-center space-x-3 max-w-[70%]">
                                            <div className="w-12 h-12 bg-white border border-gray-100 rounded-md p-1 flex-shrink-0 flex items-center justify-center">
                                                <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div className="truncate pr-2">
                                                <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                                                <p className="text-xs font-semibold text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-black text-gray-900">₹{item.price * item.quantity}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="space-y-3 mb-6 pt-4 border-t border-gray-100 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-900">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Discount</span>
                                    <span className="font-medium text-emerald-600">-₹0</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-8 pt-4 border-t border-gray-200">
                                <span className="text-gray-900 font-bold text-lg">Total Amount</span>
                                <span className="text-3xl font-black text-blue-600">₹{cartTotal}</span>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center space-x-2 bg-blue-600 hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:bg-gray-400"
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        <span>Place Order Now</span>
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-400 font-medium mt-4">
                                By placing an order, you agree to our terms and conditions.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
