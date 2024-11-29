import { useEffect, useState } from "react";
import ProductQuery from "./ProductQuery";
import { callGetProducts } from "../../services/productApi";

const NewProduct = () => {
  const [data, setData] = useState([]);
  const fetchNewProducts = async () => {
    const param = "sortKey=createdAt&sortValue=desc&limit=8&page=1";
    const res = await callGetProducts(param);
    setData(res.data.products);
  };
  useEffect(() => {
    fetchNewProducts();
  }, []);
  return (
    <div className="flex gap-4 my-20 h-[716px]">
      <div className="w-[984px]">
        <ProductQuery data={data} label="New Products"></ProductQuery>
      </div>
      <div className="flex flex-col justify-center gap-8">
        <img src="banner4.png" alt="" />
        <img src="banner3.png" alt="" />
      </div>
    </div>
  );
};

export default NewProduct;
