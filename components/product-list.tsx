'use client';

import React, { useState, useEffect } from "react";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import ProductFilter from "@/components/ui/product-filter";
import SidebarFilter from "@/components/ui/sidebar-filter";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getCategories from "@/actions/get-categories";
import { motion } from "framer-motion";
import { Product, Size, Color, Category, ProductVariation } from "@/types/index";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

interface ProductListProps {
  title?: string;
  items: Product[];
  variant?: 'default' | 'similar' | 'homepage';
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items: initialItems,
  variant = 'default'
}) => {
  const [items, setItems] = useState<Product[]>(initialItems);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const fetchedSizes = await getSizes();
        const fetchedColors = await getColors();
        const fetchedCategories = await getCategories();
        
        setSizes(fetchedSizes);
        setColors(fetchedColors);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterChange = async (filters: {
    sizeId?: string;
    colorId?: string;
    categoryId?: string;
  }) => {
    try {
      const filteredProducts = await getProducts(filters);
      setItems(filteredProducts);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  // -------------------------------------------------------------------
  // ICI nous modifions la classe qui contrôle la largeur : "max-w-6xl"
  // Pour l'élargir, on peut par exemple utiliser "max-w-7xl"
  // -------------------------------------------------------------------
  const gridClasses = variant === 'similar' 
    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    : variant === 'homepage'
    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-7xl mx-auto" // <-- Changement ici : max-w-7xl au lieu de max-w-6xl
    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4";

  // Filtrer les produits disponibles
  const availableItems = items.filter(item => {
    if (!item.variations || item.variations.length === 0) {
      console.log('Product without variations:', item);
      return true;
    }
    
    const hasAvailableVariation = item.variations.some(
      (variation: ProductVariation) => variation && variation.stock > 0
    );
    
    if (!hasAvailableVariation) {
      console.log('Product with no available variations:', item);
    }
    
    return hasAvailableVariation;
  });

  return (
    <div className={`px-2 sm:px-6 lg:px-8  ${variant === 'similar' ? 'py-4' : ''}`}>
      {title && variant === 'default' && (
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          
          <ProductFilter 
            sizes={sizes} 
            colors={colors} 
            categories={categories} 
            onFilterChange={handleFilterChange} 
          />
        </div>
      )}

      {variant === 'default' && (
        <div className="hidden lg:block w-1/4 pr-8">
          <SidebarFilter
            sizes={sizes}
            colors={colors}
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}

      {availableItems.length === 0 && <NoResult />}

      {availableItems.length > 0 && (
        <div className="relative">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={gridClasses}
          >
            {availableItems.map((item) => (
              <motion.div 
                key={item.id} 
                variants={itemVariant}
                whileHover={{ scale: 1.05 }}
                className="w-full transform transition-all duration-300 hover:shadow-xl rounded-xl"
              >
                <ProductCard data={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
