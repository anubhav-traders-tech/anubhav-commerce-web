export interface ProductVariant {
    weight: string;
    price: number | string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    sku: string;
    images: string[];
    mrp: number;
    selling_price: number;
    discount_percentage?: number;
    stock?: number;
    short_description: string;
    full_description: string;
    key_features: string[];
    specifications?: Record<string, string>;

    // Legacy mapping support for images and variants
    image: string;
    isNew?: boolean;
    variants?: ProductVariant[];

    // Injected by CatalogContext
    brandName?: string;
    brandSlug?: string;
}

export interface Brand {
    id: string;
    name: string;
    slug: string;
    logo: string;
    description: string;
    products: Product[];
}
