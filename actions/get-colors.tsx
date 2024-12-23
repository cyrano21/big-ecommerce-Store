import { Color } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://big-ecommerce-admin.vercel.app/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf';

const getColors = async (): Promise<Color[]> => {
  try {
    console.log('Fetching colors from URL:', `${BASE_URL}/colors`);
    const res = await fetch(`${BASE_URL}/colors`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ''}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Colors fetch error:', errorText);
      return [];
    }

    const colors = await res.json();
    console.log('Fetched colors:', colors);
    return colors;
  } catch (error) {
    console.error('Failed to fetch colors:', error);
    return [];
  }
};

export default getColors;
