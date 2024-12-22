'use client';

import React, { useState } from 'react';
import { Size, Color, Category } from '@/types';
import { ChevronDown } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className="w-full">
      {/* Mobile Toggle Button */}
      <div 
        className="md:hidden flex items-center justify-between bg-white p-4 rounded-lg shadow-md cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm font-medium text-gray-700">
          Filter Products
        </span>
        <ChevronDown 
          className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </div>

      {/* Filter Container */}
      <div 
        className={`
          ${isExpanded ? 'block' : 'hidden'} 
          md:block 
          grid 
          grid-cols-1 
          md:grid-cols-3 
          gap-4 
          p-4 
          bg-white 
          rounded-lg 
          shadow-md 
          transition-all 
          duration-300 
          ease-in-out
        `}
      >
        {/* Size Filter */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size
          </label>
          <div className="relative">
            <select
              value={selectedSize || ''}
              onChange={(e) => handleFilterChange('size', e.target.value || undefined)}
              className="
                block 
                w-full 
                pl-3 
                pr-10 
                py-2 
                text-sm 
                border 
                border-gray-300 
                rounded-md 
                focus:outline-none 
                focus:ring-2 
                focus:ring-purple-500 
                focus:border-purple-500
                appearance-none
              "
            >
              <option value="">All Sizes</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Color Filter */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <div className="relative">
            <select
              value={selectedColor || ''}
              onChange={(e) => handleFilterChange('color', e.target.value || undefined)}
              className="
                block 
                w-full 
                pl-3 
                pr-10 
                py-2 
                text-sm 
                border 
                border-gray-300 
                rounded-md 
                focus:outline-none 
                focus:ring-2 
                focus:ring-purple-500 
                focus:border-purple-500
                appearance-none
              "
            >
              <option value="">All Colors</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <select
              value={selectedCategory || ''}
              onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
              className="
                block 
                w-full 
                pl-3 
                pr-10 
                py-2 
                text-sm 
                border 
                border-gray-300 
                rounded-md 
                focus:outline-none 
                focus:ring-2 
                focus:ring-purple-500 
                focus:border-purple-500
                appearance-none
              "
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
