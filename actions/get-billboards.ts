import { Billboard } from "@/types";

interface GetBillboardsParams {
  storeId: string;
  limit?: number;
}

export default async function getBillboards({
  storeId, 
  limit = 1
}: GetBillboardsParams): Promise<Billboard[]> {
  // Vérification explicite de storeId
  if (!storeId) {
    console.error('[GET_BILLBOARDS_ERROR] Store ID is required');
    return [];
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/billboards?storeId=${storeId}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch billboards');
    }

    const billboards: Billboard[] = await response.json();
    
    // Convertir les chaînes de date en objets Date
    return billboards.map(billboard => ({
      ...billboard,
      createdAt: new Date(billboard.createdAt),
      updatedAt: new Date(billboard.updatedAt)
    }));
  } catch (error) {
    console.error('[GET_BILLBOARDS_ERROR]', error);
    return [];
  }
}
