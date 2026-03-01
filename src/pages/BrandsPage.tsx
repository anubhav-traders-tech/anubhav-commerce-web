import { motion } from 'framer-motion';
import { useCatalog } from '../context/CatalogContext';
import { BrandCard } from '../components/ui/BrandCard';

export default function BrandsPage() {
    const { brands } = useCatalog();
    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-24 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[100px] -z-10 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-100/40 rounded-full blur-[100px] -z-10 translate-y-1/2 -translate-x-1/4"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6 border border-blue-100 uppercase tracking-widest shadow-sm">
                        Official Distributorships
                    </span>
                    <h1 className="text-5xl font-black text-gray-900 sm:text-7xl mb-6 tracking-tight">Partner Brands</h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed font-medium">
                        We are authorized distributors for the following leading FMCG and Ayurvedic manufacturers. Supplying directly from source to retail.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants} initial="hidden" animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {brands.map(brand => (
                        <motion.div key={brand.id} variants={itemVariants}>
                            <BrandCard brand={brand} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
