/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import SelectOption from "./SelectOption";
import { Link } from "react-router-dom";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { formatCurrency, generateNameId } from "../../utils/utils";
import ProductRating from "./ProductRating";
import { callAddToWishList, callGetWishlist } from "../../services/productApi";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  doAddToCompare,
  doGetWishListAction,
} from "../../redux/product/productSlice";
import { EyeFilled } from "@ant-design/icons";
import ModalViewDetail from "../../pages/admin/products/ModalViewDetail";

const Product = ({ star, product }) => {
  const token = useSelector((state) => state.account.token);
  const compareProduct =
    useSelector((state) => state.product.compareProduct) || [];
  const handleAddToCompare = (id, token) => {
    const check = compareProduct.some((item) => {
      return token === item.token && item.id === id;
    });
    if (!check) {
      dispatch(
        doAddToCompare({
          token,
          id,
        })
      );
      message.success("Thêm vào compare thành công");
    } else {
      message.error("Đã có trong compare");
    }
  };
  const handleAddtoCart = () => {};
  const dispatch = useDispatch();
  const [isShowOption, setIsShowOption] = useState(false);
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
  const [openModalView, setOpenModalView] = useState(false);
  return (
    <div className="w-full h-full text-base border border-gray-200 cursor-pointer hover:shadow-xl">
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
        className="flex flex-col p-[10px] items-center justify-center w-full "
      >
        <div className="relative w-full">
          {isShowOption && (
            <div className="absolute left-0 right-0 flex justify-center gap-2 bottom-[-10px] animate-slide-top">
              <SelectOption
                onClick={() => setOpenModalView(true)}
                icons={<EyeFilled />}
              />
              <SelectOption
                onClick={() => handleAddToWishList(product._id)}
                icons={<BsFillSuitHeartFill />}
              />
              <SelectOption
                onClick={() => handleAddToCompare(product._id, token)}
                icons={<GoGitCompare />}
              />
            </div>
          )}
          <img
            src={
              product?.images[0] ||
              "https://tse2.mm.bing.net/th?id=OIP.o27PVWSehFHkhiMMkUR8ZAHaE7&pid=Api&P=0&h=220"
            }
            alt=""
            // w-[180px]
            className="object-cover w-full h-[140px]"
          />
        </div>
        <div
          className={`flex flex-col mt-[15px] items-start w-full  ${
            star ? "gap-4" : "gap-2"
          }`}
        >
          <Link
            to={`/product/${generateNameId({
              name: product.title,
              id: product._id,
            })}`}
            className="line-clamp-2"
          >
            {product?.title}
          </Link>
          {star && (
            <div className="flex justify-start">
              <ProductRating rating={product.rate}></ProductRating>
              <span className="text-sm font-normal text-gray-500">
                ({product.buyed || 0})
              </span>
            </div>
          )}
          <span className="text-sm font-semibold text-[#2DA5F3]">
            {formatCurrency(product.minPrice)} VND
          </span>
        </div>
      </div>
      <ModalViewDetail
        dataDetail={product}
        isOpenDetail={openModalView}
        setIsOpenDetail={setOpenModalView}
      ></ModalViewDetail>
    </div>
  );
};

export default Product;
