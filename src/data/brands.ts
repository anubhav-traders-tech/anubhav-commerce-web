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

export const BRANDS: Brand[] = [
  {
    id: 'patanjali',
    name: 'Patanjali – Pooja Essentials',
    slug: 'patanjali-pooja-essentials',
    logo: 'https://images.unsplash.com/photo-1601056637854-e91e5cb75f92?auto=format&fit=crop&q=80&w=200&h=200', // Placeholder
    description: 'Authentic pooja essentials including agarbatti, dhoop, and camphor.',
    products: [
      { id: 'p1', name: 'Premium Agarbatti', category: 'Incense', mrp: '₹50', image: 'https://images.unsplash.com/photo-1601056637854-e91e5cb75f92?auto=format&fit=crop&q=80&w=400', isNew: true },
      { id: 'p2', name: 'Pure Camphor', category: 'Pooja Items', mrp: '₹80', image: 'https://images.unsplash.com/photo-1601056637854-e91e5cb75f92?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    id: 'vaveda',
    name: 'Vaveda',
    slug: 'vaveda',
    logo: 'https://images.unsplash.com/photo-1595995252814-1ee6b1580f4f?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Natural herbal products and wellness supplements.',
    products: [
      { id: 'v1', name: 'Herbal Hair Oil', category: 'Personal Care', mrp: '₹150', image: 'https://images.unsplash.com/photo-1595995252814-1ee6b1580f4f?auto=format&fit=crop&q=80&w=400', isNew: true },
      { id: 'v2', name: 'Neem Face Wash', category: 'Skin Care', mrp: '₹95', image: 'https://images.unsplash.com/photo-1595995252814-1ee6b1580f4f?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    id: 'sri-sri',
    name: 'Sri Sri Tatva',
    slug: 'sri-sri-tatva',
    logo: 'https://images.unsplash.com/photo-1611078586927-3ed938eabfcb?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Wide range of daily use ayurvedic and FMCG products.',
    products: [
      { id: 'ss1', name: 'Ojasvita', category: 'Health Drink', mrp: '₹200', image: 'https://images.unsplash.com/photo-1611078586927-3ed938eabfcb?auto=format&fit=crop&q=80&w=400' },
      { id: 'ss2', name: 'Sudanta Toothpaste', category: 'Oral Care', mrp: '₹75', image: 'https://images.unsplash.com/photo-1611078586927-3ed938eabfcb?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    id: 'sifi-prakash',
    name: 'Sifi Prakash',
    slug: 'sifi-prakash',
    logo: 'https://images.unsplash.com/photo-1599598425947-330026217415?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Pahadi namkeens and authentic snacks.',
    products: [
      { id: 'sp1', name: 'Pahadi Aloo Bhujia', category: 'Snacks', mrp: '₹50', image: 'https://images.unsplash.com/photo-1599598425947-330026217415?auto=format&fit=crop&q=80&w=400' },
      { id: 'sp2', name: 'Navratna Mixture', category: 'Mixture', mrp: '₹50', image: 'https://images.unsplash.com/photo-1599598425947-330026217415?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    id: 'keya',
    name: 'Keya',
    slug: 'keya',
    logo: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Gourmet spices, herbs, and seasonings.',
    products: [
      { id: 'k1', name: 'Piri Piri Spice Mix', category: 'Seasoning', mrp: '₹119', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400', isNew: true },
      { id: 'k2', name: 'Pizza Oregano', category: 'Herb', mrp: '₹119', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    id: 'basic-ayurveda',
    name: 'Basic Ayurveda',
    slug: 'basic-ayurveda',
    logo: 'https://images.unsplash.com/photo-1584308666744-24d59b2987a9?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Authentic Ayurvedic juices and formulations.',
    products: [
      { id: 'ba1', name: 'Aloe Vera Juice', category: 'Juice', mrp: '₹250', image: 'https://images.unsplash.com/photo-1584308666744-24d59b2987a9?auto=format&fit=crop&q=80&w=400' },
      { id: 'ba2', name: 'Amla Juice', category: 'Juice', mrp: '₹180', image: 'https://images.unsplash.com/photo-1584308666744-24d59b2987a9?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    id: 'him-gold',
    name: 'Him Gold Masale',
    slug: 'him-gold-masale',
    logo: 'https://images.unsplash.com/photo-1596649236166-512140e947e4?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Authentic blended and pure spices.',
    products: [
      { id: 'hg1', name: 'Garam Masala', category: 'Spices', mrp: '₹60', image: 'https://images.unsplash.com/photo-1596649236166-512140e947e4?auto=format&fit=crop&q=80&w=400' },
      { id: 'hg2', name: 'Turmeric Powder', category: 'Spices', mrp: '₹40', image: 'https://images.unsplash.com/photo-1596649236166-512140e947e4?auto=format&fit=crop&q=80&w=400' },
    ]
  }
];

export const getAllProducts = () => {
  return BRANDS.flatMap(brand => 
    brand.products.map(product => ({
      ...product,
      brandName: brand.name,
      brandSlug: brand.slug
    }))
  );
};
