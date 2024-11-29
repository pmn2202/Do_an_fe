/* eslint-disable react/prop-types */
import { useState } from "react";
import InputNumber from "./InputNumber";

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  classNameWrapper = "ml-10 ",
  onType,
  value,
  onFocusOut,
  ...rest
}) {
  const [localValue, setLocalValue] = useState(value || 0);
  const handleChange = (e) => {
    let _value = Number(e.target.value);
    if (max !== undefined && _value > max) {
      _value = max;
    } else if (_value < 1) {
      _value = 1;
    }
    onType && onType(_value);
    setLocalValue(_value);
  };
  const increase = () => {
    let _value = Number(value || localValue) + 1;
    if (max !== undefined && _value > max) {
      _value = max;
    }
    onIncrease && onIncrease(_value);
    setLocalValue(_value);
  };
  const decrease = () => {
    let _value = Number(value || localValue) - 1;
    // if (_value < 1) {
    //   _value = 1;
    // }
    onDecrease && onDecrease(_value);
    setLocalValue(_value);
  };
  const handleBlur = (e) => {
    onFocusOut && onFocusOut(Number(e.target.value));
  };
  return (
    <div className={"flex items-center" + classNameWrapper}>
      <button
        onClick={decrease}
        className="flex items-center justify-center w-8 h-8 text-gray-600 border border-gray-300 rounded-l-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>
      <InputNumber
        classNameError="hidden"
        value={value || localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
        classNameInput="w-14 h-8 border p-1 outline-none border-gray-300 text-center"
      ></InputNumber>
      <button
        onClick={increase}
        className="flex items-center justify-center w-8 h-8 text-gray-600 border border-gray-300 rounded-r-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}
