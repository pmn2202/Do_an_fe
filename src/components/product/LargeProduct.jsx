/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  doAddToCompare,
  doGetWishListAction,
} from "../../redux/product/productSlice";
import { callAddToWishList, callGetWishlist } from "../../services/productApi";
import { HeartIcon } from "../../utils/icons";
import { formatCurrency, generateNameId } from "../../utils/utils";
import ProductRating from "./ProductRating";
import { message } from "antd";
import { GoGitCompare } from "react-icons/go";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const LargeProduct = ({ product }) => {
  const token = useSelector((state) => state.account.token);
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
  // console.log(product);
  if (!product) return null;
  return (
    <div className="h-full p-6 border border-gray-200">
      <div className="p-2 border border-gray-200">
        <img
          src={
            product?.images[0] ||
            "https://tse2.mm.bing.net/th?id=OIP.o27PVWSehFHkhiMMkUR8ZAHaE7&pid=Api&P=0&h=220"
          }
          alt=""
          className="w-[200px] h-[180px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <div className="flex justify-start">
          <ProductRating rating={product?.rate || 0}></ProductRating>
          <span className="text-sm font-normal text-gray-500">
            ({product?.buyed || 0})
          </span>
        </div>
        <span className="text-base font-normal leading-6 text-gray-900 line-clamp-2">
          <Link
            to={`/product/${generateNameId({
              name: product.title,
              id: product._id,
            })}`}
            className="line-clamp-2"
          >
            {product?.title}
          </Link>
        </span>
        <div>
          <span className="ml-1 text-base font-normal leading-6 text-gray-300 line-through">
            {formatCurrency(
              product.minPrice * (1 + product.discountPercent / 100)
            )}{" "}
            VND
          </span>
          <span className="text-[#2da5f3] text-lg font-semibold leading-6">
            {formatCurrency(product.minPrice)} VND
          </span>
        </div>
        <span className="mx-4 mt-6 mb-4 text-sm leading-loose line-clamp-3">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          ></div>
        </span>
        {/* <span className="line-clamp-3">{product.description}</span> */}
        <div className="flex justify-center gap-2 pt-4">
          <div
            onClick={() => handleAddToWishList(product._id)}
            className="p-3 cursor-pointer bg-primary opacity-30 hover:opacity-100"
          >
            <HeartIcon />
          </div>
          <div
            onClick={() => handleAddToCompare(product._id, token)}
            className="p-3 cursor-pointer bg-primary opacity-30 hover:opacity-100"
          >
            <GoGitCompare className="w-[32px] h-[32px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeProduct;
