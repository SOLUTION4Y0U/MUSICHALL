export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  productsCount: number;
  averageRating: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export interface BrandStats {
  totalBrands: number;
  totalProducts: number;
  topBrands: Brand[];
}