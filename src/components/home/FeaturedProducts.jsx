/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom";
// import Button from "../Button";
import ProductQuery from "./ProductQuery";

const FeaturedProducts = ({ productFeatureds }) => {
  return (
    <div className="my-10 h-[725px] flex  gap-4">
      <div className="w-[340px] bg-[#F3DE6D] h-full px-[18px] py-8 text-center flex  items-center flex-col gap-4">
        <span className="text-[#BE4646] font-semibold text-sm">
          COMPUTER & ACCESSORIES
        </span>
        <span className="text-gray-900 text-[32px] font-semibold leading-10">
          32% Discount
        </span>
        <span className="text-base font-normal leading-6 text-gray-700">
          For all ellectronics products
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium leading-3 text-gray-900">
            Offers ends in:
          </span>
          <span className="px-[6px] py-3 bg-white rounded-lg">
            ENDS OF CHRISTMAS
          </span>
        </div>
        <img
          className="w-[312px] h-[400px] object-cover"
          src="Image.jpg"
          alt=""
        />
      </div>

      <div className="w-[984px] h-full">
        <ProductQuery data={productFeatureds} label="Featured Products" />
      </div>
    </div>
  );
};

export default FeaturedProducts;
