"use client";

import React from "react";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import qs from "query-string";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true },
    );
    router.push(url);
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3">
        {data.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onClick(filter.id)}
            className={cn(
              "flex items-center justify-center px-4 py-3 rounded-full text-sm font-medium transition-all duration-200",
              "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
              selectedValue === filter.id
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-gray-800 border border-gray-200"
            )}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Filter;
