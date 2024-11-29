/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatCurrency, generateNameId } from "../../utils/utils";

const MiniProduct = ({ product }) => {
  return (
    <Link
      to={`/product/${generateNameId({
        name: product.title,
        id: product._id,
      })}`}
      className="flex overflow-hidden border border-gray-200 rounded-md cursor-pointer"
    >
      <img
        src={
          product?.images[0] ||
          "https://tse2.mm.bing.net/th?id=OIP.o27PVWSehFHkhiMMkUR8ZAHaE7&pid=Api&P=0&h=220"
        }
        className="w-[80px] h-[80px] object-cover"
      />
      <div className="flex flex-col justify-between p-3">
        <span className="text-sm font-normal leading-5 text-gray-900 line-clamp-2">
          {product.title}
        </span>
        <span className="text-[#2DA5F3] text-sm font-semibold leading-5">
          {formatCurrency(product.minPrice)} VND
        </span>
      </div>
    </Link>
  );
};

export default MiniProduct;
