import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

export const getColors = async (): Promise<Color[]> => {
  try {
    console.log('Fetching colors from URL:', URL);
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This helps with CORS and cookies
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to fetch colors:', res.status, errorText);
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }

    const colors = await res.json();
    console.log('Fetched colors:', colors);
    return colors;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in getColors:', error.message);
    } else {
      console.error('Unknown error in getColors:', error);
    }
    throw error;
  }
};

export default getColors;
