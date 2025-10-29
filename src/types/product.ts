export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  articleNumber: string;
  country: string;
  code: string;
  inStock: boolean;
}

export interface ProductFilters {
  brand?: string;
  search?: string;
}

export interface CreateProductDto {
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  articleNumber: string;
  country: string;
  code: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  discount?: number;
}

export interface UpdateProductDto {
  name?: string;
  brand?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  description?: string;
  articleNumber?: string;
  country?: string;
  code?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  discount?: number;
}

