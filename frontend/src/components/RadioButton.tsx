interface RadioButtonProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  checked: boolean;
  name: string;
}

const RadioButton = ({
  id,
  label,
  onChange,
  value,
  checked,
  name,
}: RadioButtonProps) => {
  return (
    <div className="inline-flex items-center space-x-3">
      <label
        className="relative flex items-center p-3 rounded-full cursor-pointer transition-all"
        htmlFor={id}
      >
        <input
          name={name}
          type="radio"
          className="peer hidden"
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <span
          className={`w-6 h-6 rounded-full border-2 transition-all duration-300 
            ${
              checked
                ? "border-blue-500 bg-gradient-to-r from-blue-700 to-blue-500"
                : "border-gray-300 bg-white"
            }
            peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500`}
        >
          <span
            className={`w-4 h-4 bg-white rounded-full transition-all duration-200 
              ${checked ? "translate-x-4" : "translate-x-0"} 
              peer-checked:translate-x-4`}
          />
        </span>
      </label>
      <label
        className="font-medium text-gray-700 cursor-pointer select-none"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
