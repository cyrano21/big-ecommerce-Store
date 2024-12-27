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
  selectedVariation?: ProductVariation;
}

export interface Image {
  id: string;
  url: string;
  colorId?: string;
  variationId?: string; // Ajout de cette propriété
  color?: Color;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface ProductVariation {
  id: string;
  productId: string;
  colorId: string;
  sizeId: string;
  stock: number;
  color: Color;
  size: Size;
}

export interface CartItem extends Product {
  selectedVariation: ProductVariation;
  quantity: number;
}
