/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  callAddToWishList,
  callGetWishlist,
  callProductInfo,
} from "../../services/productApi";
import { XCircleIcon } from "../../utils/icons";
import Button from "../Button";
import ProductRating from "../product/ProductRating";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/utils";
import {
  doDeleteCompare,
  doGetWishListAction,
} from "../../redux/product/productSlice";
import { message } from "antd";
import { Helmet } from "react-helmet";

const Compare = () => {
  const compareProduct = useSelector((state) => state.product.compareProduct);
  const token = useSelector((state) => state.account.token);

  const compareProductByUser = compareProduct.filter((item) => {
    return item.token === token;
  });
  let queryString = "";
  for (let i = 0; i < compareProductByUser.length; i++) {
    if (i !== compareProductByUser.length - 1) {
      queryString += compareProductByUser[i].id + ",";
    } else {
      queryString += compareProductByUser[i].id;
    }
  }
  const [compareProductInfo, setCompareProductInfo] = useState([]);
  const fetchCompare = async () => {
    const data = {
      ids: queryString,
    };
    const res = await callProductInfo(data);
    if (res.data.code === 200 && res.data.products) {
      setCompareProductInfo(res.data.products);
    }
  };
  const dispatch = useDispatch();
  const handleAddToWishList = async (id) => {
    const res = await callAddToWishList(id);
    if (res.data.code === 200) {
      const res2 = await callGetWishlist();
      if (res2.data.code === 200) {
        dispatch(doGetWishListAction(res2.data.listProductsFavorite));
      }
      message.success(res.data.message);
    }
  };
  const handleDeleteCompare = (id) => {
    dispatch(doDeleteCompare({ id, token }));
  };
  useEffect(() => {
    fetchCompare();
  }, [compareProduct]);
  return (
    <div className="container py-12">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>So sánh</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <div className="grid grid-cols-4 ">
        <div className="col-span-1 border border-gray-200">
          <div className=" h-[349px]"></div>
          <div className="flex items-center bg-gray-100">
            <div className="gap-2 p-2 capitalize">Rating</div>
          </div>

          <div className={`flex items-center`}>
            <div className="gap-2 p-2 capitalize">Price</div>
          </div>
        </div>
        {compareProductInfo.slice(0, 3).map((item, index) => {
          return (
            <div key={index} className="col-span-1 border border-gray-200">
              <div className="flex flex-col items-center gap-3 p-2">
                <div
                  className="cursor-pointer"
                  onClick={() => handleDeleteCompare(item._id)}
                >
                  <XCircleIcon></XCircleIcon>
                </div>

                <img
                  src={
                    item.images[0] ||
                    "https://tse2.mm.bing.net/th?id=OIP.o27PVWSehFHkhiMMkUR8ZAHaE7&pid=Api&P=0&h=220"
                  }
                  alt=""
                />
                <span className="text-base font-normal text-gray-900 line-clamp-2">
                  {item.title}
                </span>
                <div className="flex justify-between w-full">
                  <Button className="w-[212px]">Add To Card</Button>
                  <div
                    onClick={() => handleAddToWishList(item._id)}
                    className="flex items-center px-2 border cursor-pointer border-primary filter"
                  >
                    <img src="Heart.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-2 bg-gray-100">
                <ProductRating
                  rating={item.rate}
                  activeClassname="fill-primary text-primary h-4 w-4"
                  nonActiveClassname="fill-current text-gray-300 h-4 w-4"
                ></ProductRating>
                <span className="mr-1 text-gray-500 ">({item.buyed})</span>
              </div>
              <div className="flex items-center p-2 bg-white">
                <span className="mr-1 text-gray-500 ">
                  {formatCurrency(item.minPrice)} VND
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Compare;
