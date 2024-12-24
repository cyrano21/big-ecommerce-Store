import { Product, ProductVariation } from "@/types";
import queryString from "query-string";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://big-ecommerce-admin.vercel.app/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf';

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  storeId?: string;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = queryString.stringifyUrl({
      url: `${BASE_URL}/products`,
      query: {
        storeId: query.storeId,
        categoryId: query.categoryId,
        colorId: query.colorId,
        sizeId: query.sizeId,
        isFeatured: query.isFeatured,
      },
    });

    console.log('Fetching products URL:', url);
    console.log('Query parameters:', query);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ''}`,
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Products fetch error:', errorText);
      return [];
    }

    const products = await res.json();
    
    // Log pour le débogage
    console.log('Raw products response:', products);
    
    // Vérifier que chaque produit a les propriétés requises
    const validatedProducts = products.map((product: any) => ({
      ...product,
      variations: product.variations?.map((variation: any) => ({
        ...variation,
        color: variation.color || null,
        size: variation.size || null,
        stock: variation.stock || 0
      })) || [],
      category: product.category || null,
      images: product.images || []
    }));

    console.log('Validated products:', validatedProducts);
    return validatedProducts;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

export default getProducts;
