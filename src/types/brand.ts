export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  productsCount: number;
  categoriesCount: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export interface BrandStats {
  totalBrands: number;
  totalProducts: number;
  totalCategories: number;
  topBrands: Brand[];
}