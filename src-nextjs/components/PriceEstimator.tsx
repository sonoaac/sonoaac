import React from "react";

export const pricing = {
  page: {
    basic: 100,
    advanced: 200,
  },
  backend: {
    none: 0,
    basic: 250,
    advanced: 400,
  },
  addons: {
    hosting: 100,
    ecommerce: 400,
    maintenance: 150,
  },
};

type PriceEstimatorProps = {
  selected: {
    pages: string;
    backend: string;
    addons: string[];
  };
};

const PriceEstimator: React.FC<PriceEstimatorProps> = ({ selected }) => {
  let total = 0;
  if (selected.pages === "1-5") total += pricing.page.basic;
  if (selected.pages === "More than 5") total += pricing.page.advanced;
  if (selected.backend === "None") total += pricing.backend.none;
  if (selected.backend === "Basic (Node)") total += pricing.backend.basic;
  if (selected.backend === "Advanced (API-driven)") total += pricing.backend.advanced;
  if (selected.addons.includes("hosting")) total += pricing.addons.hosting;
  if (selected.addons.includes("ecommerce")) total += pricing.addons.ecommerce;
  if (selected.addons.includes("maintenance")) total += pricing.addons.maintenance;

  return (
    <div className="mt-8 text-2xl font-bold text-pinkSoft">
      Estimated Price: ${'{'}total{'}'}
    </div>
  );
};

export default PriceEstimator;
