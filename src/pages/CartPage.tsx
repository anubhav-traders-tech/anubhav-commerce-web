import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

    if (cartCount === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 text-center max-w-sm">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                    to="/products"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-[0.98]"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Desktop Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Unit Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Subtotal</div>
                            </div>

                            {/* Cart Items */}
                            <ul className="divide-y divide-gray-100">
                                {cart.map((item) => (
                                    <li key={item.id} className="p-4 sm:p-6 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4">

                                        {/* Mobile structural wrap */}
                                        <div className="flex items-start space-x-4 md:col-span-6">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl border border-gray-100 p-2 flex-shrink-0 flex items-center justify-center">
                                                <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div className="flex flex-col flex-grow">
                                                <Link to={`/product/${item.productId}`} className="font-bold text-gray-900 hover:text-blue-600 leading-tight mb-1">
                                                    {item.name}
                                                </Link>
                                                {/* Mobile only elements inside this flex container */}
                                                <div className="md:hidden mt-2 flex flex-wrap items-center justify-between gap-y-2">
                                                    <span className="font-medium text-gray-900">₹{item.price}</span>
                                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                        >-</button>
                                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                        >+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop Price */}
                                        <div className="hidden md:block col-span-2 text-center font-medium text-gray-900">
                                            ₹{item.price}
                                        </div>

                                        {/* Desktop Quantity */}
                                        <div className="hidden md:flex col-span-2 justify-center">
                                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                                >-</button>
                                                <span className="w-8 text-center text-sm font-bold bg-white leading-loose">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                                >+</button>
                                            </div>
                                        </div>

                                        {/* Subtotal & Remove Mobile/Desktop hybrid */}
                                        <div className="flex justify-between items-center md:col-span-2 md:justify-end">
                                            <span className="md:hidden text-sm text-gray-500 font-medium">Subtotal:</span>
                                            <span className="font-black text-gray-900 text-lg mr-4">₹{item.price * item.quantity}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2 md:p-0"
                                                title="Remove Item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Order Summary Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Items ({cartCount})</span>
                                        <span className="font-medium text-gray-900">₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Discount</span>
                                        <span className="font-medium text-emerald-600">-₹0</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-900 font-bold">Grand Total</span>
                                        <span className="text-3xl font-black text-gray-900">₹{cartTotal}</span>
                                    </div>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full flex items-center justify-center space-x-2 bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm"
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="w-5 h-5 relative top-[1px]" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
