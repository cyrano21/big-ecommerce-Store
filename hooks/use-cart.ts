import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

import { CartItem, Product, ProductVariation } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, variation: ProductVariation) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product, variation: ProductVariation) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => 
        item.id === data.id && item.selectedVariation?.id === variation.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
        set({ items: [...currentItems] });
        toast.success('Quantité mise à jour.');
      } else {
        const cartItem: CartItem = {
          ...data,
          selectedVariation: variation,
          quantity: 1
        };

        set({ items: [...get().items, cartItem] });
        toast.success('Article ajouté au panier.');
      }
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success('Article retiré du panier.');
    },
    removeAll: () => {
      set({ items: [] });
      toast.success('Panier vidé.');
    },
    updateItemQuantity: (id: string, quantity: number) => {
      const currentItems = get().items;
      const itemToUpdate = currentItems.find(item => item.id === id);
      
      if (itemToUpdate) {
        if (quantity <= 0) {
          // Si la quantité est 0 ou négative, on supprime l'article
          set({ items: currentItems.filter(item => item.id !== id) });
          toast.success('Article retiré du panier.');
        } else {
          itemToUpdate.quantity = quantity;
          set({ items: [...currentItems] });
          toast.success('Quantité mise à jour.');
        }
      }
    }
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  })
);

export default useCart;
