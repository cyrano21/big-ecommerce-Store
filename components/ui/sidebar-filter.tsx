'use client';

import React, { useState } from 'react';
import { Size, Color, Category } from '@/types';
import styles from './sidebar-filter.module.css';

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
    <div className={styles.sidebarFilter}>
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
  );
};

export default SidebarFilter;
