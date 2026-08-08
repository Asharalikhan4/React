interface CheckboxProps {
  label: string,
  checked: boolean,
  onChange: () => void
};

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange?.(e.target.checked)} name={label} />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default Checkbox;