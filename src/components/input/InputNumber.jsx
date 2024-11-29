/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";

const InputNumber = forwardRef(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = "w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500",
    classNameError = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
    onChange,
    value = "",
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState(value);
  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d+$/.test(value) || value === "") {
      onChange && onChange(e);
      setLocalValue(value);
    }
  };
  return (
    <div className={className}>
      <input
        className={classNameInput}
        onChange={handleChange}
        value={value || localValue}
        ref={ref}
        {...rest}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  );
});
export default InputNumber;
