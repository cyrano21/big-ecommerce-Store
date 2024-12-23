'use client';

import React, { useState, useEffect } from "react";
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
  console.log('Initial Products:', initialProducts);
  console.log('Initial Sizes:', initialSizes);
  console.log('Initial Colors:', initialColors);
  console.log('Initial Category:', initialCategory);

  const [products, setProducts] = useState(initialProducts);
  const [sizes] = useState(initialSizes);
  const [colors] = useState(initialColors);
  const [category] = useState(initialCategory);
  const [selectedSizeName, setSelectedSizeName] = useState<string | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);

  const handleFilterChange = async (filters: {
    sizeId?: string;
    colorId?: string;
    categoryId?: string;
  }) => {
    console.log('Handling filter change:', filters);
    
    const storeId = "c9be10a3-5539-46cc-befc-c005d28eeb11";
    console.log('Store ID:', storeId);
    console.log('Category ID:', params.categoryId);

    try {
      // Filtrage local strict basé sur la taille sélectionnée
      const localFilteredResults = initialProducts.filter(product => {
        const sizeMatch = !filters.sizeId || product.size.id === filters.sizeId;
        const categoryMatch = !params.categoryId || product.category?.id === params.categoryId;
        
        console.log(`Product ${product.id} filtering:`, {
          productSizeId: product.size.id,
          filterSizeId: filters.sizeId,
          productCategoryId: product.category?.id,
          filterCategoryId: params.categoryId,
          sizeMatch,
          categoryMatch
        });

        return sizeMatch && categoryMatch;
      });

      console.log('Locally filtered results:', localFilteredResults);
      
      // Trouver le nom de la taille correspondant à l'ID
      const selectedSizeName = filters.sizeId 
        ? sizes.find(size => size.id === filters.sizeId)?.name 
        : null;

      // Mettre à jour l'état
      setSelectedSizeName(selectedSizeName);
      setSelectedSizeId(filters.sizeId ?? null);

      // Mettre à jour les produits
      setProducts(localFilteredResults);
    } catch (error) {
      console.error('Error filtering products:', error);
      // En cas d'erreur, restaurer les produits initiaux
      setProducts(initialProducts);
    }
  };

  useEffect(() => {
    console.log('Current products state:', products);
  }, [products]);

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
            {selectedSizeId && products.length === 0 && (
              <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                Aucun produit disponible pour la taille &#34;{selectedSizeName}&#34;
              </div>
            )}

            {products.length === 0 && !selectedSizeId && <NoResult />}
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-gray-200">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 tracking-wide">
                {selectedSizeName 
                  ? (
                    <span className="flex items-center">
                      Collection 
                      <span className="ml-3 px-3 py-1 text-sm font-semibold text-white bg-indigo-500 rounded-full shadow-md animate-pulse-soft">
                        {selectedSizeName}
                      </span>
                    </span>
                  )
                  : 'Collection Complète'}
              </h2>
              {selectedSizeName && (
                <button 
                  onClick={() => handleFilterChange({})}
                  className="group relative inline-flex items-center px-4 py-2 overflow-hidden text-sm font-medium text-red-600 border-2 border-red-600 rounded-lg hover:text-white hover:bg-red-600 focus:outline-none focus:ring"
                >
                  <span className="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-0 ease">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 10l-2.293 2.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="transition-all group-hover:ml-6">
                    Réinitialiser
                  </span>
                </button>
              )}
            </div>
            
            <div className={`${styles.productsGrid} gap-6 transition-all duration-300 ease-in-out`}>
              {products.map((item) => (
                <div 
                  key={item.id} 
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <ProductCard data={item} />
                </div>
              ))}
            </div>

            {products.length === 0 && selectedSizeName && (
              <div className="relative py-12 px-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg text-center overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="relative z-10">
                  <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Aucun produit trouvé
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Pas de produits disponibles en taille {selectedSizeName}
                  </p>
                  <button 
                    onClick={() => handleFilterChange({})}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </div>
            )}

            {selectedSizeId && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-gray-200">
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 tracking-wide">
                    Collection Complète
                  </h2>
                </div>
                
                <div className={`${styles.productsGrid} gap-6 transition-all duration-300 ease-in-out`}>
                  {initialProducts.map((item) => (
                    <div 
                      key={item.id} 
                      className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <ProductCard data={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClientCategoryPage;
