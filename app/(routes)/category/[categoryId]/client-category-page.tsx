'use client';

import React, { useState } from "react";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import SidebarFilter from "@/components/ui/sidebar-filter";
import getProducts from "@/actions/get-products";
import styles from './client-category-page.module.css';

interface ClientCategoryPageProps {
  params: {
    categoryId: string;
  };
  initialProducts: any[];
  initialSizes: any[];
  initialColors: any[];
  initialCategory: any;
}

const ClientCategoryPage: React.FC<ClientCategoryPageProps> = ({
  params,
  initialProducts,
  initialSizes,
  initialColors,
  initialCategory,
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [sizes] = useState(initialSizes);
  const [colors] = useState(initialColors);
  const [category] = useState(initialCategory);

  const handleFilterChange = async (filters: {
    sizeId?: string;
    colorId?: string;
    categoryId?: string;
  }) => {
    const storeId = "c9be10a3-5539-46cc-befc-c005d28eeb11";
    const filteredResults = await getProducts({
      categoryId: params.categoryId,
      sizeId: filters.sizeId,
      colorId: filters.colorId,
      storeId: storeId,
    });

    setProducts(filteredResults);
  };

  const billboardData = category.billboard ? {
    id: category.billboard.id || '',
    label: category.billboard.label || '',
    imageUrl: category.billboard.imageUrl || '',
    description: category.billboard.description || '',
    storeId: category.billboard.storeId || "c9be10a3-5539-46cc-befc-c005d28eeb11",
    createdAt: category.billboard.createdAt || new Date(),
    updatedAt: category.billboard.updatedAt || new Date()
  } : null;

  console.log('Sizes:', sizes);
  console.log('Sidebar section visibility:', styles.sidebarSection);

  return (
    <div className={styles.pageContainer}>
      <Container>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {category.name}
          </h1>
          <p className={styles.pageDescription}>
            Découvrez notre sélection de produits {category.name.toLowerCase()} soigneusement choisis pour vous
          </p>
        </div>

        <div className={styles.billboardContainer}>
          <Billboard data={billboardData} />
        </div>
        
        <div className={styles.categoryPageLayout}>
          {/* Mobile Filters */}
          <div className={styles.mobileFiltersSection}>
            <MobileFilters 
              sizes={sizes} 
              colors={colors} 
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Sidebar for Large Screens */}
          <div className={styles.sidebarSection}>
            <SidebarFilter
              sizes={sizes}
              colors={colors}
              categories={[category]}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Products */}
          <div className={styles.productsSection}>
            {products.length === 0 && <NoResult />}
            <div className={styles.productsGrid}>
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClientCategoryPage;
