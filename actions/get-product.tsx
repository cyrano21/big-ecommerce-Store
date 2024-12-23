import { Product } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;

const getProduct = async (id: string): Promise<Product | null> => {
  if (!BASE_URL || !STORE_ID) {
    console.error('❌ NEXT_PUBLIC_API_URL or NEXT_PUBLIC_STORE_ID is not defined');
    return null;
  }

  const fullUrl = `${BASE_URL}/products/${id}`;
  
  console.group('🔍 Product Fetch Diagnostics');
  console.log('🔗 Full URL:', fullUrl);
  console.log('🆔 Product ID:', id);
  console.log('🌐 Base URL:', BASE_URL);
  console.log('🏪 Store ID:', STORE_ID);

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    console.log('📡 Response Status:', response.status);
    console.log('📋 Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error Response Text:', errorText);
      console.groupEnd();
      return null;
    }

    const data = await response.json();
    console.log('✅ Parsed Product Data:', data);
    console.groupEnd();

    return data;
  } catch (error) {
    console.error('🚨 Product Fetch Error:', error);
    console.groupEnd();
    return null;
  }
};

export default getProduct;
