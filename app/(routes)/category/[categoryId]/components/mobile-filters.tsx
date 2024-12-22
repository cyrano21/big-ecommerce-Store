"use client";

import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import React from "react";
import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  const [open, setOpen] = React.useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={onOpen}
        className="flex items-center gap-x-2 lg:hidden px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <Plus size={20} />
        Filtres
      </button>

      <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gradient-to-br from-white via-purple-50 to-fuchsia-50 py-8 my-12 pb-6 shadow-xl">
            {/* Close button */}
            <div className="flex items-center justify-between px-4 pb-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Filtres
              </h2>
              <button
                type="button"
                className="rounded-full p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={onClose}
              >
                <span className="sr-only">Fermer le menu</span>
                <X size={24} />
              </button>
            </div>

            {/* Filters */}
            <div className="p-4 space-y-8">
              <div>
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                  Tailles
                </h3>
                <Filter valueKey="sizeId" name="" data={sizes} />
              </div>
              <div>
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                  Couleurs
                </h3>
                <Filter valueKey="colorId" name="" data={colors} />
              </div>
            </div>

            {/* Button */}
            <div className="border-t pt-6">
              <Button 
                onClick={onClose}
                className="w-full bg-purple-600 text-white rounded-full py-3 hover:bg-purple-700 transition-colors duration-200"
              >
                Voir les résultats
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
export default MobileFilters;
