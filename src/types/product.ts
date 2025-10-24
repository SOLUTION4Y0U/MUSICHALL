export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  color: string;
  dimensions: {height: number; depth: number; width: number; unit: string;};
  weight: {value: number; unit: string;} ;
  sku?: string; // Ozon SKU for direct purchase links
}

export interface Category {
  id: string;
  name: string;
  image?: string;
}