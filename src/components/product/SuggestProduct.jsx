/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MiniProduct from "./MiniProduct";

const SuggestProduct = ({ label, data }) => {
  const [miniData, setMiniData] = useState([]);
  useEffect(() => {
    setMiniData(data.slice(0, 3));
  }, [data]);
  return (
    <div className="flex flex-col gap-4">
      <span className="text-base font-semibold leading-6 text-gray-900">
        {label}
      </span>
      {miniData &&
        miniData.map((item, index) => {
          return <MiniProduct product={item} key={index} />;
        })}
    </div>
  );
};

export default SuggestProduct;
