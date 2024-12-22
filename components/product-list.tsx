'use client';

import React, { useState, useEffect } from "react";
import { Product, Size, Color, Category } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import ProductFilter from "@/components/ui/product-filter";
import SidebarFilter from "@/components/ui/sidebar-filter";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getCategories from "@/actions/get-categories";
import { motion } from "framer-motion";

interface ProductListProps {
  title?: string;
  items: Product[];
  variant?: 'default' | 'similar';
}

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

  const gridClasses = variant === 'similar' 
    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" 
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";

  return (
    <div className={`px-4 sm:px-6 lg:px-8 py-8 ${variant === 'similar' ? 'py-4' : ''}`}>
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

      {items.length === 0 ? (
        <NoResult />
      ) : (
        <div className="relative">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={gridClasses}
          >
            {items.map((item) => (
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

          {variant === 'default' && (
            <SidebarFilter 
              sizes={sizes} 
              colors={colors} 
              categories={categories} 
              onFilterChange={handleFilterChange} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
