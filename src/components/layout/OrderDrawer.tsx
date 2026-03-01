import { useEffect } from 'react';
import { X, ClipboardList, ArrowRight, Trash2, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const OrderDrawer = () => {
    const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
    const navigate = useNavigate();

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    // Calculate tier pricing
    const calculatePricing = () => {
        let total = 0;
        let hasCustomPricing = false;

        cart.forEach(item => {
            const price = Number(item.price) || 0;
            if (item.quantity >= 20) {
                hasCustomPricing = true;
                // Add base minimum to total, but display will indicate "Contact Sales for custom margin"
                total += Math.floor(price * 0.95) * item.quantity;
            } else if (item.quantity >= 6) {
                total += Math.floor(price * 0.95) * item.quantity;
            } else {
                total += price * item.quantity;
            }
        });

        return { total, hasCustomPricing };
    };

    const { total, hasCustomPricing } = calculatePricing();

    const getTierLabel = (qty: number) => {
        if (qty >= 20) return { label: 'Enterprise Volume (Custom Margin)', style: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
        if (qty >= 6) return { label: 'Wholesale Tier (~5% off)', style: 'bg-blue-100 text-blue-800 border-blue-200' };
        return { label: 'Base Pricing', style: 'bg-gray-100 text-gray-700 border-gray-200' };
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${isCartOpen ? 'visible' : 'invisible'}`}>
            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsCartOpen(false)}
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div
                    className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col bg-white shadow-2xl`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-gray-100">
                                <ClipboardList className="w-5 h-5 text-gray-900" />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 tracking-tight">Current Order</h2>
                        </div>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border border-dashed border-gray-200">
                                    <Package className="w-8 h-8 text-gray-300" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900 mb-1">Your order is empty</p>
                                    <p className="text-gray-500 font-medium">Add products to build your bulk inquiry.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        navigate('/products');
                                    }}
                                    className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-sm"
                                >
                                    Browse Catalog
                                </button>
                            </div>
                        ) : (
                            <ul className="space-y-6">
                                {cart.map((item) => {
                                    const tier = getTierLabel(item.quantity);

                                    return (
                                        <li key={item.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-sm transition-all relative group">
                                            <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 border border-gray-100 flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="text-sm font-bold text-gray-900 leading-tight pr-6">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors absolute top-4 right-4"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className={`inline-flex px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider mb-3 ${tier.style}`}>
                                                    {tier.label}
                                                </div>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                                        <button
                                                            className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-bold transition-colors"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-10 text-center text-sm font-black text-gray-900">{item.quantity}</span>
                                                        <button
                                                            className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-bold transition-colors"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>Total Items</span>
                                    <span className="font-bold text-gray-900">{cart.length} SKUs</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-900">
                                    <span className="font-bold">Estimated Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-black block">₹{total.toLocaleString()}</span>
                                        {hasCustomPricing && (
                                            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">+ Custom Enterprise Discounts</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate('/checkout');
                                }}
                                className="w-full flex items-center justify-center space-x-2 bg-gray-900 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md active:scale-95 ripple-btn group"
                            >
                                <span>Proceed to Order</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-xs text-center text-gray-400 font-medium mt-4">
                                Shipping and final taxes will be calculated during order processing.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
