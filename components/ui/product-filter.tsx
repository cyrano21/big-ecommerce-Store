'use client';

import React, { useState } from 'react';
import { Size, Color, Category } from '@/types';

interface ProductFilterProps {
  sizes: Size[];
  colors: Color[];
  categories: Category[];
  onFilterChange: (filters: {
    sizeId?: string;
    colorId?: string;
    categoryId?: string;
  }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  sizes,
  colors,
  categories,
  onFilterChange
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const handleFilterChange = (type: 'size' | 'color' | 'category', value?: string) => {
    let newSizeId = type === 'size' ? value : selectedSize;
    let newColorId = type === 'color' ? value : selectedColor;
    let newCategoryId = type === 'category' ? value : selectedCategory;

    // Update local state
    setSelectedSize(newSizeId);
    setSelectedColor(newColorId);
    setSelectedCategory(newCategoryId);

    // Notify parent component
    onFilterChange({
      sizeId: newSizeId,
      colorId: newColorId,
      categoryId: newCategoryId
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-md">
      {/* Size Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
        <select
          value={selectedSize || ''}
          onChange={(e) => handleFilterChange('size', e.target.value || undefined)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Sizes</option>
          {sizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.name}
            </option>
          ))}
        </select>
      </div>

      {/* Color Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <select
          value={selectedColor || ''}
          onChange={(e) => handleFilterChange('color', e.target.value || undefined)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Colors</option>
          {colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory || ''}
          onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
