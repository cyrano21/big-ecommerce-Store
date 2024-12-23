import { Category } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://big-ecommerce-admin.vercel.app/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf';

const getCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories from URL:', `${BASE_URL}/categories`);
    const res = await fetch(`${BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Categories fetch error:', errorText);
      return [];
    }

    const categories = await res.json();
    console.log('Fetched categories count:', categories.length);
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

export default getCategories;