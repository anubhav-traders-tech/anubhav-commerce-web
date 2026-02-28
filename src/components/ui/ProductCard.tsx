import { Link } from 'react-router-dom';
import type { Product } from '../../data/brands';
import { IndianRupee } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    brandName?: string;
}

export const ProductCard = ({ product, brandName }: ProductCardProps) => {
    return (
        <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 relative">
            <div className="relative pt-[100%] bg-gray-50 w-full overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>

                {product.isNew && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md tracking-wider">
                        NEW
                    </span>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow bg-white relative z-10">
                <div className="text-xs text-blue-600 font-bold mb-2 tracking-wide uppercase">{product.category}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">{product.name}</h3>
                {brandName && (
                    <div className="text-sm font-medium text-gray-500 mb-4">{brandName}</div>
                )}
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-900 flex items-center">
                        {product.mrp}
                    </div>
                    <Link
                        to="/inquiry"
                        className="text-sm bg-gray-900 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                    >
                        Inquire
                    </Link>
                </div>
            </div>
        </div>
    );
};
