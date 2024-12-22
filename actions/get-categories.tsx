import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories from URL:', URL);
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This helps with CORS and cookies
    });

    // Log the full response for debugging
    console.log('Categories Fetch Response:', {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries())
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to fetch categories:', {
        status: res.status,
        statusText: res.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }

    const categories = await res.json();
    console.log('Fetched categories:', categories);
    return categories;
  } catch (error) {
    console.error('Comprehensive error in getCategories:', {
      errorName: error instanceof Error ? error.name : 'Unknown Error',
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : 'No stack trace'
    });
    throw error;
  }
};

export default getCategories;