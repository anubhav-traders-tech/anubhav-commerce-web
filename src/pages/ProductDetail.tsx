import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { CheckCircle, ChevronRight, Package, ClipboardList, Check } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { TrustBadges } from '../components/ui/TrustBadges';
import { useNavigate } from 'react-router-dom';

export default function ProductDetail() {
    const { productId } = useParams<{ productId: string }>();
    const { brands, allProducts } = useCatalog();
    const { addToCart, setIsCartOpen } = useCart();
    const navigate = useNavigate();

    const product = allProducts.find(p => p.id === productId);
    const [quantity, setQuantity] = useState(1);
    const [addedToast, setAddedToast] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    if (!product) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                    <Package className="w-10 h-10 text-gray-500" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 tracking-tight text-center">Item Not Located</h1>
                <p className="text-gray-500 max-w-md text-center mb-8">
                    The requested supply item could not be found in our current directory. It may be discontinued or out of stock.
                </p>
                <button onClick={() => navigate('/products')} className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md">
                    Return to Directory
                </button>
            </div>
        );
    }

    const {
        name,
        images,
        image,
        mrp,
        selling_price,
        discount_percentage,
        stock,
        short_description,
        full_description,
        key_features,
        specifications,
        sku,
        category,
    } = product;

    const mainImage = images && images.length > 0 ? images[0] : image;
    const displayImages = images && images.length > 0 ? images : [image].filter(Boolean);

    // Get brand name if available
    let brandName = (product as any).brandName;
    if (!brandName && (product as any).brandSlug) {
        const foundBrand = brands.find(b => b.slug === (product as any).brandSlug);
        if (foundBrand) brandName = foundBrand.name;
    }

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && (stock === undefined || newQuantity <= stock)) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.selling_price || product.mrp || 0,
            quantity: quantity,
            image: mainImage as string
        });

        setAddedToast(true);
        setTimeout(() => setAddedToast(false), 2500);
    };

    const relatedProducts = allProducts.filter(p => p.category === category && p.id !== product.id).slice(0, 4);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <SEOHead
                title={`${name} | ${brandName || 'Anubhav Traders'} | Anubhav Traders`}
                description={short_description || `Buy ${name} at wholesale prices.`}
                canonicalUrl={`https://www.anubhavtraders.com/product/${product.id}`}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": name,
                    "image": mainImage,
                    "description": short_description,
                    "sku": sku,
                    "brand": {
                        "@type": "Brand",
                        "name": brandName
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": `https://www.anubhavtraders.com/product/${product.id}`,
                        "priceCurrency": "INR",
                        "price": selling_price || mrp || 0,
                        "itemCondition": "https://schema.org/NewCondition",
                        "availability": stock && stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
                    }
                }}
            />
            < div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >

                {/* Breadcrumbs */}
                < div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-8 gap-2 font-medium tracking-wide" >
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />

                    {
                        brandName && (
                            <>
                                <Link to={`/brand/${product.brandSlug || ''}`} className="hover:text-blue-600 transition-colors">{brandName}</Link>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </>
                        )
                    }

                    {
                        category && (
                            <>
                                <Link to="/products" className="hover:text-blue-600 transition-colors">{category}</Link>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </>
                        )
                    }

                    <span className="text-gray-900 font-bold truncate max-w-[200px] sm:max-w-xs">{name}</span>
                </div >

                {/* Top Section - Two Columns */}
                < div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 mb-8 shadow-sm" >
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
                                {/* Thumbnails if multiple exist */}
                                {displayImages.length > 1 && (
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                        {displayImages.map((img, idx) => (
                                            <div key={idx} className="aspect-square rounded-xl bg-gray-50 border border-gray-100 overflow-hidden cursor-pointer hover:border-blue-500 p-2">
                                                <img loading="lazy" src={img} alt={`${name} ${idx}`} className="w-full h-full object-contain" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
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

                            {/* Pricing / B2B Status */}
                            <div className="mb-8">
                                <div className="flex items-end space-x-3 mb-2">
                                    <span className="text-4xl font-black text-gray-900">₹{selling_price || mrp || 0}</span>
                                    {discount_percentage && discount_percentage > 0 && mrp && (
                                        <span className="text-lg text-gray-400 line-through mb-1 font-medium">₹{mrp}</span>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1.5 rounded-lg inline-flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                                        Dealer pricing available for verified buyers
                                    </span>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                                    <h4 className="text-sm font-bold text-gray-900 mb-3">Estimated Bulk Tiers</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-center text-gray-600">
                                            <span>1–5 Cartons</span>
                                            <span className="font-bold text-gray-900">₹{selling_price || mrp || 0} / unit</span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-600">
                                            <span>6–20 Cartons</span>
                                            <span className="font-bold text-gray-900">₹{Math.floor((selling_price || mrp || 0) * 0.95)} / unit</span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-600">
                                            <span>20+ Cartons</span>
                                            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Contact Sales</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium mt-4 italic text-center">
                                        For bulk quantity discounts, submit inquiry.
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 text-sm font-bold bg-blue-50 text-blue-900 px-3 py-1.5 rounded-lg border border-blue-100">
                                        <Package className="w-4 h-4" />
                                        <span>MOQ: 1 Carton</span>
                                    </div>
                                    <div className="text-sm">
                                        {stock !== undefined ? (
                                            stock > 0
                                                ? <span className="text-emerald-600 font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>Bulk Stock Ready</span>
                                                : <span className="text-red-500 font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>Out of Stock</span>
                                        ) : (
                                            <span className="text-emerald-600 font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>Bulk Stock Ready</span>
                                        )}
                                    </div>
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
                                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">

                                    {/* Quantity Selector */}
                                    <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex-shrink-0 mx-auto lg:mx-0 w-full lg:w-auto justify-center">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="px-6 py-3.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors font-bold border-r border-gray-200"
                                        >
                                            -
                                        </button>
                                        <div className="w-16 text-center text-gray-900 font-black bg-white">
                                            {quantity}
                                        </div>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="px-6 py-3.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors font-bold border-l border-gray-200"
                                            disabled={stock !== undefined && quantity >= stock}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
                                        <button
                                            onClick={() => {
                                                handleAddToCart();
                                                setIsCartOpen(true);
                                            }}
                                            disabled={stock === 0}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm active:scale-[0.98] border border-transparent ripple-btn"
                                        >
                                            <Package className="w-4 h-4 fill-current" />
                                            <span>Quick Order</span>
                                        </button>
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={stock === 0}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-gray-900 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-[0.98] ripple-btn group"
                                            style={addedToast ? { backgroundColor: '#10b981' } : {}}
                                        >
                                            {addedToast ? (
                                                <><CheckCircle className="w-5 h-5" /><span>Added to Order</span></>
                                            ) : (
                                                <><ClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform" /><span>Add to Order</span></>
                                            )}
                                        </button>
                                    </div>

                                </div>
                                <p className="text-xs text-center text-gray-500 font-medium mt-4 tracking-wide">
                                    🚚 Estimated Delivery: Dispatched within 24-48 hours
                                </p>
                            </div>

                        </div>
                    </div>
                </div >

                {/* Bottom Section - Detailed Information (TABS) */}
                < div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-16" >
                    <div className="flex border-b border-gray-100 bg-gray-50/50">
                        <button
                            className={`flex-1 py-4 text-sm sm:text-base font-bold transition-colors ${activeTab === 'desc' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-800'}`}
                            onClick={() => setActiveTab('desc')}
                        >
                            Description
                        </button>
                        <button
                            className={`flex-1 py-4 text-sm sm:text-base font-bold transition-colors ${activeTab === 'specs' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-800'}`}
                            onClick={() => setActiveTab('specs')}
                        >
                            Specifications
                        </button>
                        <button
                            className={`flex-1 py-4 text-sm sm:text-base font-bold transition-colors ${activeTab === 'shipping' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-800'}`}
                            onClick={() => setActiveTab('shipping')}
                        >
                            Shipping Info
                        </button>
                    </div>

                    <div className="p-6 sm:p-10 min-h-[300px]">
                        {activeTab === 'desc' && (
                            <div className="animate-fade-in">
                                {full_description ? (
                                    <div className="prose prose-blue max-w-none text-gray-600 text-base leading-loose whitespace-pre-line">
                                        {full_description}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No detailed description available.</p>
                                )}

                                {key_features && key_features.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Key Features</h3>
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
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'specs' && (
                            <div className="animate-fade-in">
                                {specifications && Object.keys(specifications).length > 0 ? (
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
                                ) : (
                                    <p className="text-gray-500 italic">No specifications provided for this product.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="animate-fade-in space-y-6">
                                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                    <h3 className="text-lg font-bold text-blue-900 mb-2">Delivery Timeframe</h3>
                                    <p className="text-blue-800/80">Orders are usually dispatched within 24-48 working hours. Final delivery typically occurs within 3-7 business days depending on your territory.</p>
                                </div>
                                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                                    <h3 className="text-lg font-bold text-emerald-900 mb-2">Bulk Logistics</h3>
                                    <p className="text-emerald-800/80">For orders exceeding ₹50,000, specialized logistics partners are arranged ensuring minimal transit damage for multi-carton FMCG distribution.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div >

                {/* Related Products Section */}
                {
                    relatedProducts.length > 0 && (
                        <div className="mb-16">
                            <div className="flex items-center mb-8 overflow-hidden">
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight pr-6">Retailers Also Buy</h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map(rp => (
                                    <Link
                                        to={`/product/${rp.id}`}
                                        key={rp.id}
                                        className="group bg-white border border-gray-100 rounded-[12px] p-4 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all"
                                    >
                                        <div className="aspect-square bg-gray-50 rounded-lg mb-4 p-4 flex items-center justify-center">
                                            <img src={rp.image || rp.images?.[0]} alt={rp.name} loading="lazy" className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-bold mb-1 uppercase">{(rp as any).brandName}</div>
                                        <h4 className="text-sm font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{rp.name}</h4>
                                        <div className="mt-auto font-black text-gray-900">₹{rp.selling_price || rp.mrp}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                }
            </div >

            <TrustBadges />
        </div >
    );
}
