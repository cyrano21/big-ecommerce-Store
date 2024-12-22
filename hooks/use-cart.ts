import { Product } from "@/types";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          toast(`🚫 Cet article est déjà dans le panier`, {
            style: { background: "#f44336", color: "#fff" }, // Rouge pour les erreurs
          });
          return;
        }

        set({ items: [...currentItems, data] });
        toast.success(`Article ajouté au panier`, {
          style: { background: "#4CAF50", color: "#fff" }, // Vert pour le succès
        });
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success(`Article supprimé du panier`, {
          style: { background: "#2196F3", color: "#fff" }, // Bleu pour les infos
        });
      },
      removeAll: () => {
        set({ items: [] });
        toast(`🧹 Tous les articles ont été supprimés du panier`, {
          style: { background: "#FF9800", color: "#fff" }, // Orange pour les actions spéciales
        });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
