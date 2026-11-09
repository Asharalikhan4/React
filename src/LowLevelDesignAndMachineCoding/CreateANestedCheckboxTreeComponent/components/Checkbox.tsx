import { useEffect, useRef } from "react";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({
  id,
  label,
  checked,
  indeterminate = false,
  onChange,
}: CheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="flex items-center gap-2 py-1">
      <input
        ref={checkboxRef}
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-sm font-medium text-slate-800 select-none hover:text-blue-600"
      >
        {label}
      </label>
      {indeterminate && (
        <span className="text-xs text-amber-600 font-medium italic">
          (partially selected)
        </span>
      )}
    </div>
  );
};

export default Checkbox;
