import { Category } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://big-ecommerce-admin.vercel.app/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf';

const getCategory = async (id: string): Promise<Category | null> => {
  try {
    console.log('Fetching category from URL:', `${BASE_URL}/categories/${id}`);
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ''}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Category fetch error:', errorText);
      return null;
    }

    const category = await res.json();
    console.log('Fetched category:', category);
    return category;
  } catch (error) {
    console.error('Failed to fetch category:', error);
    return null;
  }
};

export default getCategory;
