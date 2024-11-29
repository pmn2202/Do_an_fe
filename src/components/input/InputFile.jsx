/* eslint-disable react/prop-types */
import { useRef } from "react";

export default function InputFile({ onChange }) {
  const fileInputRef = useRef(null);
  const onFileChange = (e) => {
    const fileFromLocal = e.target.files?.[0];

    onChange && onChange(fileFromLocal);
  };
  const handleUpload = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
      <input
        onChange={onFileChange}
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept=".jpg,.jpeg,.png"
        onClick={(e) => {
          e.target.value = null;
        }}
      ></input>
      <button
        type="button"
        onClick={handleUpload}
        className="flex items-center justify-end h-10 px-6 text-sm text-gray-600 bg-white border rounded-sm shadow-sm"
      >
        Chọn ảnh
      </button>
    </>
  );
}
