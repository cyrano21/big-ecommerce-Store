'use client';

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Filter, X, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { Product, Category, Size, Color } from "@/types";
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
  className?: string;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  sizes,
  colors,
  categories,
  onFilterChange,
  className,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  // Gestion des clics en dehors du conteneur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterContainerRef.current && 
        !filterContainerRef.current.contains(event.target as Node)
      ) {
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = useCallback((type: 'size' | 'color' | 'category', value?: string) => {
    console.log('Filter changed:', { type, value });
    
    let newSizeId = type === 'size' ? value : selectedSize;
    let newColorId = type === 'color' ? value : selectedColor;
    let newCategoryId = type === 'category' ? value : selectedCategory;

    console.log('New filter state:', {
      sizeId: newSizeId,
      colorId: newColorId,
      categoryId: newCategoryId
    });

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
  }, [selectedSize, selectedColor, selectedCategory, onFilterChange]);

  const resetFilters = useCallback(() => {
    console.log('Resetting all filters');
    setSelectedSize(undefined);
    setSelectedColor(undefined);
    setSelectedCategory(undefined);
    
    // Notifier le parent de réinitialiser les filtres
    onFilterChange({});
  }, [onFilterChange]);

  const toggleMobileFilter = () => setIsMobileFilterOpen(!isMobileFilterOpen);

  const renderFilterSection = (
    title: string,
    items: any[],
    type: 'size' | 'color' | 'category',
    selectedValue?: string
  ) => (
    <div className={styles.filterSection}>
      <h3 className={styles.filterTitle}>{title}</h3>
      <div className={styles.filterOptionsList}>
        {items.map((item) => (
          <div
            key={item.id}
            className={clsx(styles.filterOption, {
              [styles.selected]: selectedValue === item.id,
            })}
            onClick={() => handleFilterChange(type, item.id)}
          >
            <input 
              type="checkbox" 
              checked={selectedValue === item.id}
              readOnly 
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div 
      ref={filterContainerRef} 
      className={clsx(styles.filterContainer, className)}
    >
      <button
        onClick={toggleMobileFilter}
        className={styles.mobileFilterButton}
        aria-expanded={isMobileFilterOpen}
      >
        {isMobileFilterOpen ? <X size={24} /> : <Filter size={24} />}
      </button>

      <div
        className={clsx(styles.sidebarFilter, {
          [styles.mobileFilterOpen]: isMobileFilterOpen,
          [styles.mobileFilterClosed]: !isMobileFilterOpen,
        })}
      >
        {(selectedSize || selectedColor || selectedCategory) && (
          <button 
            className={styles.clearAllFilters} 
            onClick={resetFilters}
          >
            Tout effacer
          </button>
        )}

        {renderFilterSection("Taille", sizes, "size", selectedSize)}
        {renderFilterSection("Couleur", colors, "color", selectedColor)}
        {renderFilterSection("Catégorie", categories, "category", selectedCategory)}
      </div>
    </div>
  );
};

export default React.memo(SidebarFilter);
