"use client";

import React from "react";

const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

interface CurrencyProps {
  value?: string | number;
  className?: string;
}

const Currency: React.FC<CurrencyProps> = ({ value, className }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <div className={className}>{formatter.format(Number(value))}</div>;
};

export default Currency;
