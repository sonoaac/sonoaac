import React from "react";

type OptionSelectorProps = {
  options: {
    pages: string[];
    backend: string[];
    addons: { label: string; value: string }[];
  };
  selected: {
    pages: string;
    backend: string;
    addons: string[];
  };
  onChange: (type: string, value: string) => void;
};

const OptionSelector: React.FC<OptionSelectorProps> = ({ options, selected, onChange }) => (
  <div className="space-y-8 w-full max-w-lg mx-auto">
    <div>
      <h3 className="text-xl font-semibold mb-2">Number of Pages</h3>
      <div className="flex gap-2 flex-wrap">
        {options.pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onChange("pages", page)}
            className={`border-2 px-4 py-2 rounded-lg transition-all ${
              selected.pages === page
                ? "bg-pinkSoft text-blackPure border-pinkSoft"
                : "border-pinkSoft hover:bg-pinkSoft/10"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">Backend Options</h3>
      <div className="flex gap-2 flex-wrap">
        {options.backend.map((backend) => (
          <button
            key={backend}
            type="button"
            onClick={() => onChange("backend", backend)}
            className={`border-2 px-4 py-2 rounded-lg transition-all ${
              selected.backend === backend
                ? "bg-pinkSoft text-blackPure border-pinkSoft"
                : "border-pinkSoft hover:bg-pinkSoft/10"
            }`}
          >
            {backend}
          </button>
        ))}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">Add-ons</h3>
      <div className="flex gap-2 flex-wrap">
        {options.addons.map((addon) => (
          <button
            key={addon.value}
            type="button"
            onClick={() => onChange("addons", addon.value)}
            className={`border-2 px-4 py-2 rounded-lg transition-all ${
              selected.addons.includes(addon.value)
                ? "bg-pinkSoft text-blackPure border-pinkSoft"
                : "border-pinkSoft hover:bg-pinkSoft/10"
            }`}
          >
            {addon.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default OptionSelector;
