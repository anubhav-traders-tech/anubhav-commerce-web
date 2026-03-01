import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../data/brands';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    product: Product;
    brandName?: string;
}

export const ProductCard = ({ product, brandName }: ProductCardProps) => {
    const { addToCart } = useCart();
    const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
    const variants: any = (product as any).variants || [];
    const hasVariants = variants.length > 0;

    const displayMrp = hasVariants ? `₹${variants[selectedVariantIdx].price}` : `₹${product.selling_price || product.mrp || 0}`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.selling_price || product.mrp || 0,
            quantity: 1,
            image: product.image
        });
    };

    return (
        <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative">
            <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
                <div className="relative pt-[100%] bg-gray-50 w-full overflow-hidden p-6 flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>

                    {product.isNew && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md tracking-wider z-10">
                            NEW
                        </span>
                    )}

                    {product.discount_percentage && product.discount_percentage > 0 && (
                        <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-md shadow-sm z-10">
                            {product.discount_percentage}% OFF
                        </span>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow bg-white relative z-10">
                    <div className="text-xs text-blue-600 font-bold mb-2 tracking-wide uppercase">{product.category}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">{product.name}</h3>
                    {brandName && (
                        <div className="text-sm font-medium text-gray-500 mb-4">{brandName}</div>
                    )}

                    {hasVariants && variants.length > 1 && (
                        <div className="mb-4" onClick={(e) => e.preventDefault()}>
                            <select
                                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-medium cursor-pointer"
                                value={selectedVariantIdx}
                                onChange={(e) => setSelectedVariantIdx(Number(e.target.value))}
                            >
                                {variants.map((v: any, idx: number) => (
                                    <option key={idx} value={idx}>
                                        {v.weight}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-gray-900">
                                {displayMrp}
                            </span>
                            {product.discount_percentage && product.discount_percentage > 0 && product.mrp && (
                                <span className="text-xs text-gray-400 font-medium line-through">
                                    ₹{product.mrp}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="bg-gray-100 hover:bg-blue-600 text-gray-900 hover:text-white p-2.5 rounded-xl transition-colors shadow-sm"
                            title="Add to Cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};
