export interface Product {
    id: string;
    name: string;
    category: string;
    mrp: string;
    image: string;
    isNew?: boolean;
}

export interface Brand {
    id: string;
    name: string;
    slug: string;
    logo: string;
    description: string;
    products: Product[];
}
