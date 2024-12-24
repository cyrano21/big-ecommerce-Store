export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
  description?: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Image {
  id: string;
  url: string;
}

export interface ProductVariation {
  id: string;
  productId: string;
  colorId: string;
  color: Color;
  sizeId: string;
  size: Size;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string; 
  price: string | number;
  isFeatured: boolean;
  isArchived: boolean;
  category: Category;
  images: Image[];
  variations: ProductVariation[];
  storeId: string;
}
