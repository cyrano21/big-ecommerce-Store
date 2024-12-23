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
  category: Category;
  storeId: string; 
  name: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  description?: string;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
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
