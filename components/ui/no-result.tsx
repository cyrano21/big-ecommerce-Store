import React from "react";

const NoResult = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gradient-to-br from-white via-purple-50 to-fuchsia-50 rounded-2xl shadow-sm">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        Aucun résultat trouvé
      </h3>
      <p className="text-sm text-gray-500">
        Essayez de modifier vos filtres ou votre recherche
      </p>
    </div>
  );
};
export default NoResult;
