import React from "react";

type ServiceSelectorProps = {
  services: string[];
  selected: string[];
  onChange: (service: string) => void;
};

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services, selected, onChange }) => (
  <div className="grid gap-4 max-w-md w-full">
    {services.map((service) => (
      <button
        key={service}
        type="button"
        onClick={() => onChange(service)}
        className={`border-2 py-3 rounded-lg transition-all ${
          selected.includes(service)
            ? "bg-pinkSoft text-blackPure border-pinkSoft"
            : "border-pinkSoft hover:bg-pinkSoft/10"
        }`}
      >
        {service}
      </button>
    ))}
  </div>
);

export default ServiceSelector;
