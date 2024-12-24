"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR"
});

interface CurrencyProps {
  value?: string | number;
  className?: string;
}

const Currency: React.FC<CurrencyProps> = ({
  value = 0,
  className = "font-semibold"
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <span className={className}>
      {formatter.format(Number(value))}
    </span>
  );
};

export default Currency;
