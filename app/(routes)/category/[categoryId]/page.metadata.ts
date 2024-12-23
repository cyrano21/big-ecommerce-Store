import { Metadata } from 'next';
import getCategory from "@/actions/get-category";

export async function generateMetadata({
  params,
}: {
  params: { categoryId: string };
}): Promise<Metadata> {
  try {
    const category = await getCategory(params.categoryId);
    
    return {
      title: category.name,
      description: `Découvrez notre sélection de produits ${category.name.toLowerCase()} soigneusement choisis pour vous`,
      openGraph: {
        title: category.name,
        description: `Découvrez notre sélection de produits ${category.name.toLowerCase()} soigneusement choisis pour vous`,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Catégorie non trouvée',
      description: 'La catégorie demandée est introuvable',
    };
  }
}
