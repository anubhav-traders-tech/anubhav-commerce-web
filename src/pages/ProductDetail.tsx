import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Check, ChevronRight } from 'lucide-react';

export default function ProductDetail() {
    const { productId } = useParams<{ productId: string }>();
    const { allProducts, loading } = useCatalog();
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [addedToast, setAddedToast] = useState(false);

    // Fallback fetching might be needed if landing directly, but allProducts should be populated.
    const product = allProducts.find(p => p.id === productId);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                    ← Back to Products
                </Link>
            </div>
        );
    }

    const {
        name,
        brandName,
        category,
        sku,
        images,
        mrp,
        selling_price,
        discount_percentage,
        stock,
        short_description,
        full_description,
        key_features,
        specifications,
        image // fallback
    } = product;

    const displayImages = images?.length > 0 ? images : [image];
    const mainImage = displayImages[0];

    const handleQuantityChange = (delta: number) => {
        const newQty = quantity + delta;
        if (newQty >= 1 && (!stock || newQty <= stock)) {
            setQuantity(newQty);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            productId: product.id,
            name: product.name,
            price: selling_price || mrp || 0,
            quantity: quantity,
            image: mainImage
        });

        setAddedToast(true);
        setTimeout(() => setAddedToast(false), 3000);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumbs */}
                <div className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/products" className="hover:text-blue-600">Products</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium truncate">{name}</span>
                </div>

                {/* Top Section - Two Columns */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 mb-8 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Left: Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-2xl bg-gray-50 overflow-hidden relative group border border-gray-100 flex items-center justify-center p-8">
                                <img
                                    src={mainImage}
                                    alt={name}
                                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                />
                                {discount_percentage && discount_percentage > 0 && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white font-black text-xs px-3 py-1.5 rounded-full shadow-md tracking-wider">
                                        {discount_percentage}% OFF
                                    </div>
                                )}
                            </div>
                            {/* Thumbnails if multiple exist */}
                            {displayImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {displayImages.map((img, idx) => (
                                        <div key={idx} className="aspect-square rounded-xl bg-gray-50 border border-gray-100 overflow-hidden cursor-pointer hover:border-blue-500 p-2">
                                            <img src={img} alt={`${name} ${idx}`} className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Details & Action */}
                        <div className="flex flex-col">
                            {brandName && (
                                <Link to={`/brand/${product.brandSlug || ''}`} className="text-blue-600 font-bold hover:underline mb-2 tracking-wide uppercase text-sm">
                                    {brandName}
                                </Link>
                            )}

                            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
                                {name}
                            </h1>

                            <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                                {category && (
                                    <span className="bg-gray-100 px-3 py-1 rounded-full">{category}</span>
                                )}
                                {sku && (
                                    <span>SKU: <span className="font-mono text-gray-700">{sku}</span></span>
                                )}
                            </div>

                            {/* Pricing */}
                            <div className="mb-8">
                                <div className="flex items-end space-x-3 mb-2">
                                    <span className="text-4xl font-black text-gray-900">₹{selling_price || mrp || 0}</span>
                                    {discount_percentage && discount_percentage > 0 && mrp && (
                                        <span className="text-lg text-gray-400 line-through mb-1 font-medium">₹{mrp}</span>
                                    )}
                                </div>
                                <div className="text-sm">
                                    {stock !== undefined ? (
                                        stock > 0
                                            ? <span className="text-emerald-600 font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>In Stock</span>
                                            : <span className="text-red-500 font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>Out of Stock</span>
                                    ) : (
                                        <span className="text-emerald-600 font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>In Stock</span>
                                    )}
                                </div>
                            </div>

                            {/* Short Description */}
                            {short_description && (
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    {short_description}
                                </p>
                            )}

                            {/* Action Area */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-auto">
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">

                                    {/* Quantity Selector */}
                                    <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium border-r border-gray-200"
                                        >
                                            -
                                        </button>
                                        <div className="w-16 text-center text-gray-900 font-bold bg-white">
                                            {quantity}
                                        </div>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium border-l border-gray-200"
                                            disabled={stock !== undefined && quantity >= stock}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Add to Cart */}
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={stock === 0}
                                        className="flex-grow flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-[0.98]"
                                        style={addedToast ? { backgroundColor: '#10b981' } : {}}
                                    >
                                        {addedToast ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                <span>Added to Cart</span>
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-5 h-5" />
                                                <span>Add to Cart</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom Section - Detailed Information */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-sm space-y-12">
                    {/* Section: Overview */}
                    {full_description && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Product Overview</h2>
                            <div className="prose prose-blue max-w-none text-gray-600 text-base leading-loose whitespace-pre-line">
                                {full_description}
                            </div>
                        </section>
                    )}

                    {/* Section: Key Features */}
                    {key_features && key_features.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Key Features</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {key_features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start bg-gray-50 p-4 rounded-xl">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                                            <Check className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Section: Specifications */}
                    {specifications && Object.keys(specifications).length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Specifications</h2>
                            <div className="overflow-hidden border border-gray-200 rounded-xl">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Object.entries(specifications).map(([key, value], idx) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="py-4 px-6 text-sm font-bold text-gray-900 w-1/3 border-r border-gray-200">{key}</td>
                                                <td className="py-4 px-6 text-sm text-gray-600">{value as React.ReactNode}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
}
