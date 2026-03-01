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
        <div className="group bg-white border border-gray-100 rounded-[12px] overflow-hidden flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-[5px] transition-all duration-300 relative">
            <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
                <div className="relative pt-[100%] bg-gray-50/50 w-full overflow-hidden p-5 flex justify-center items-center border-b border-gray-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {product.isNew && (
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-[6px] tracking-widest z-10 uppercase">
                            New
                        </span>
                    )}

                    {product.discount_percentage && product.discount_percentage > 0 && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-[6px] tracking-widest z-10">
                            {product.discount_percentage}% OFF
                        </span>
                    )}
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white">
                    <div className="text-[10px] text-gray-400 font-bold mb-1 tracking-wider uppercase">{product.category}</div>
                    <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
                    {brandName && (
                        <div className="text-sm font-medium text-gray-500 mb-3">{brandName}</div>
                    )}

                    {hasVariants && variants.length > 1 && (
                        <div className="mb-4 mt-auto" onClick={(e) => e.preventDefault()}>
                            <select
                                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-[8px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none font-medium cursor-pointer transition-shadow"
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

                    <div className="mt-auto pt-4 flex flex-col space-y-3">
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-gray-900 leading-none">
                                    {displayMrp}
                                </span>
                                {product.discount_percentage && product.discount_percentage > 0 && product.mrp && (
                                    <span className="text-xs text-gray-400 font-medium line-through mt-1">
                                        ₹{product.mrp}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-[8px] transition-colors shadow-sm flex items-center justify-center space-x-2"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};
