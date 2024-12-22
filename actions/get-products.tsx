import qs from "query-string";
import { Product } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const STORE_ID = "f072e5ca-1a6a-4312-81dd-23034de5f8cf";

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  storeId?: string;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  if (!BASE_URL) {
    console.error('❌ NEXT_PUBLIC_API_URL is not defined');
    return [];
  }

  const url = qs.stringifyUrl({
    url: `${BASE_URL}/products`,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      storeId: query.storeId,
    },
  });

  console.group('🔍 Products Fetch Diagnostics');
  console.log('🔗 Full URL:', url);
  console.log('📋 Query Parameters:', {
    colorId: query.colorId,
    sizeId: query.sizeId,
    categoryId: query.categoryId,
    isFeatured: query.isFeatured,
    storeId: query.storeId,
  });
  console.log('🌐 Base URL:', BASE_URL);
  console.log('🏪 Store ID:', STORE_ID);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    console.log('📡 Response Status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Error Response Text:', errorText);
      console.groupEnd();
      return [];
    }

    const products = await res.json();
    console.log('📦 Fetched Products Count:', products.length);
    console.groupEnd();

    return products;
  } catch (error) {
    console.error('🚨 Products Fetch Error:', error);
    console.groupEnd();
    return [];
  }
};

export default getProducts;
