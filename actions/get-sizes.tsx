import { Size } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://big-ecommerce-admin.vercel.app/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf';

const getSizes = async (): Promise<Size[]> => {
  try {
    console.log('Fetching sizes from URL:', `${BASE_URL}/sizes`);
    const res = await fetch(`${BASE_URL}/sizes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ''}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Sizes fetch error:', errorText);
      return [];
    }

    const sizes = await res.json();
    console.log('Fetched sizes:', sizes);
    return sizes;
  } catch (error) {
    console.error('Failed to fetch sizes:', error);
    return [];
  }
};

export default getSizes;
