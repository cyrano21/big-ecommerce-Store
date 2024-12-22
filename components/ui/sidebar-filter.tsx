'use client';

import React, { useState } from 'react';
import { Size, Color, Category } from '@/types';
import styles from './sidebar-filter.module.css';
import { Filter, X } from 'lucide-react';

interface SidebarFilterProps {
  sizes: Size[];
  colors: Color[];
  categories: Category[];
  onFilterChange: (filters: {
    sizeId?: string;
    colorId?: string;
    categoryId?: string;
  }) => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  sizes,
  colors,
  categories,
  onFilterChange
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button 
          onClick={toggleMobileFilter}
          className="
            bg-purple-600 
            text-white 
            p-3 
            rounded-full 
            shadow-lg 
            hover:bg-purple-700 
            transition-colors
          "
        >
          {isMobileFilterOpen ? <X size={24} /> : <Filter size={24} />}
        </button>
      </div>

      {/* Sidebar Filter */}
      <div 
        className={`
          ${styles.sidebarFilter} 
          ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}
        `}
      >
        <h2 className={styles.filterTitle}>Filtres</h2>

        {/* Size Filter */}
        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Taille</label>
          <select
            value={selectedSize || ''}
            onChange={(e) => handleFilterChange('size', e.target.value || undefined)}
            className={styles.filterSelect}
          >
            <option value="">Toutes les tailles</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Couleur</label>
          <select
            value={selectedColor || ''}
            onChange={(e) => handleFilterChange('color', e.target.value || undefined)}
            className={styles.filterSelect}
          >
            <option value="">Toutes les couleurs</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>Catégorie</label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
            className={styles.filterSelect}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;
