import { Link } from 'react-router-dom';
import type { Brand } from '../../data/brands';
import { ArrowRight } from 'lucide-react';

interface BrandCardProps {
    brand: Brand;
}

export const BrandCard = ({ brand }: BrandCardProps) => {
    return (
        <Link
            to={`/brand/${brand.slug}`}
            className="group block bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-gray-100 hover:border-blue-200"
        >
            <div className="aspect-w-16 aspect-h-9 w-full bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden">
                {/* Subtle hover background decoration */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500"></div>
                <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-28 object-contain group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-sm"
                />
            </div>
            <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{brand.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{brand.description}</p>
                <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-800 transition-colors">
                    View Collection <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
            </div>
        </Link>
    );
};
