import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Brand, Product } from '../data/brands';

interface CatalogContextType {
    brands: Brand[];
    allProducts: (Product & { brandName: string; brandSlug: string })[];
    loading: boolean;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/catalog/products.json')
            .then(res => res.json())
            .then(data => {
                setBrands(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch catalog data:", err);
                setLoading(false);
            });
    }, []);

    const allProducts = brands.flatMap(b =>
        b.products?.map(p => ({
            ...p,
            brandName: b.name,
            brandSlug: b.slug
        })) || []
    );

    return (
        <CatalogContext.Provider value={{ brands, allProducts, loading }}>
            {children}
        </CatalogContext.Provider>
    );
};

export const useCatalog = () => {
    const context = useContext(CatalogContext);
    if (context === undefined) {
        throw new Error('useCatalog must be used within a CatalogProvider');
    }
    return context;
};
