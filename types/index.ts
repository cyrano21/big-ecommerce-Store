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

export interface Category {
  id: string;
  name: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  description?: string; // Optional description
  color: Color;
  size: Size;
  category: Category;
  images: Image[];
  storeId: string;
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
