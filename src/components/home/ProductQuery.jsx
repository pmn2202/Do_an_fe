/* eslint-disable react/prop-types */
// import { Tabs } from "antd";
// import { Link } from "react-router-dom";
// import { ArrowRightOutlined } from "@ant-design/icons";
import { Product } from "../product";
const ProductQuery = ({ label, data }) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl font-semibold text-gray-900 pb-7">{label}</div>
        {/* <Link to="/productlist" className="text-[#2DA5F3]">
          <span className="mr-2">Browse All Product</span>
          <ArrowRightOutlined />
        </Link> */}
      </div>
      <div className="flex flex-wrap justify-between h-[640px] gap-4">
        {data &&
          data?.slice(0, 8)?.map((product, index) => {
            return (
              <div className="w-[216px] h-1/2" key={index}>
                <Product product={product} star />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductQuery;
