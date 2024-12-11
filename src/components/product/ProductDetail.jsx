/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import ProductRating from "./ProductRating";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  getIdFromNameId,
  rateSale,
} from "../../utils/utils";
import DOMPurify from "dompurify";
import QuantityController from "../input/QuantityController";
import { useNavigate, useParams } from "react-router-dom";
import {
  callAddToWishList,
  callGetProductDetail,
  callGetProducts,
  callGetWishlist,
} from "../../services/productApi";
import { useDispatch } from "react-redux";
import { doGetWishListAction } from "../../redux/product/productSlice";
import { Divider, message } from "antd";
import { callAddToCart, callGetCart } from "../../services/cartApi";
import {
  doBuyNowAction,
  doGetCartListItemAction,
} from "../../redux/cart/cartSlice";
import Product from "./Product";
import { Helmet } from "react-helmet";
const ProductDetail = () => {
  const { id } = useParams();
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectProduct, setSelectProduct] = useState(null);
  const [dataProduct, setDataProduct] = useState({});
  const idProduct = getIdFromNameId(id);
  const [feedBack, setFeedBack] = useState([]);
  const fetchDetail = async () => {
    const res = await callGetProductDetail(idProduct);

    if (res.data.code === 200) {
      setDataProduct(res.data.newProduct);
      setFeedBack(res.data.newFeedbacks);
    }
  };
  useEffect(() => {
    fetchDetail();
  }, [idProduct]);
  useEffect(() => {
    if (dataProduct.newGroup) {
      setSelectProduct(dataProduct.newGroup[0]);
    }
  }, [dataProduct]);
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  const [activeImage, setActiveImage] = useState("");

  const currentImages = useMemo(
    () =>
      dataProduct ? dataProduct?.images?.slice(...currentIndexImages) : [],
    [dataProduct, currentIndexImages]
  );
  useEffect(() => {
    if (dataProduct && dataProduct.images?.length > 0) {
      setActiveImage(dataProduct.images[0]);
    }
  }, [dataProduct]);
  const chooseActive = (img) => {
    setActiveImage(img);
  };
  const next = () => {
    if (currentIndexImages[1] < dataProduct?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };
  const imageRef = useRef(null);
  const handleZoom = (e) => {
    const image = imageRef.current;
    const { naturalHeight, naturalWidth } = image;
    const rect = e.currentTarget.getBoundingClientRect();
    const { offsetY, offsetX } = e.nativeEvent;
    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);
    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.top = top + "px";
    image.style.left = left + "px";
    image.style.maxWidth = "unset";
  };
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style");
  };
  const [buyCount, setBuyCount] = useState(1);
  const handleBuyCount = (value) => {
    setBuyCount(value);
  };

  //wish
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
  const handleAddToCart = async (id, title, number) => {
    const data = {
      id,
      childTitle: title,
      quantity: number,
    };
    const res = await callAddToCart(data);
    if (res.data.code === 200) {
      const res2 = await callGetCart();
      if (res2.status === 200) {
        dispatch(doGetCartListItemAction(res2.data.cart.products));
      }
      message.success("Thêm vào giỏ hàng thành công");
    }
  };
  const nav = useNavigate();
  const buyNow = async (id, title, number) => {
    const data = {
      id,
      childTitle: title,
      quantity: number,
    };
    const res = await callAddToCart(data);
    if (res.data.code === 200) {
      const res2 = await callGetCart();
      if (res2.status === 200) {
        dispatch(doGetCartListItemAction(res2.data.cart.products));
      }
      dispatch(doBuyNowAction({ id, number }));
      nav("/checkout");
    }
  };

  const [rateFilter, setRateFilter] = useState(0);
  const handleSelectRateComment = (value) => {
    setRateFilter(value);
  };

  //sản phẩm liên quan
  const [productRelated, setProductRelated] = useState([]);
  const sanPhamLienQuan = async () => {
    const res = await callGetProducts(
      `page=1&limit=4&categoryParent=${dataProduct?.productCategoryId}`
    );
    if (res.status === 200) {
      setProductRelated(res.data.products);
    }
  };

  useEffect(() => {
    sanPhamLienQuan();
  }, []);
  return (
    <div className="py-6 bg-gray-200">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>{dataProduct?.title}</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <div className="container">
        <div className="p-4 bg-white shadow">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div
                className="relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in"
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={dataProduct.title}
                  ref={imageRef}
                  className="absolute top-0 left-0 object-cover w-full h-full bg-white pointer-events-none"
                />
              </div>

              <div className="relative grid grid-cols-5 gap-1 mt-4">
                <button
                  onClick={prev}
                  className="absolute left-0 z-10 w-5 text-white -translate-y-1/2 bg-black top-1/2 h-9 opacity-20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                {currentImages?.map((img, index) => {
                  const isActive = img === activeImage;
                  return (
                    <div
                      className="relative w-full pt-[100%] "
                      key={index}
                      onMouseEnter={() => chooseActive(img)}
                    >
                      <img
                        src={img}
                        alt={dataProduct.name}
                        className="absolute top-0 left-0 object-cover w-[full] h-[full] bg-white cursor-pointer"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-red-500"></div>
                      )}
                    </div>
                  );
                })}
                <button
                  onClick={next}
                  className="absolute right-0 z-10 w-5 text-white -translate-y-1/2 bg-black top-1/2 h-9 opacity-20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">
                {dataProduct.title}
              </h1>
              <div className="flex items-center mt-8">
                <div className="flex items-center">
                  <span className="mr-1 border-b border-b-primary text-primary">
                    {dataProduct.rate}
                  </span>
                  <ProductRating
                    rating={dataProduct.rate}
                    activeClassname="fill-primary text-primary h-4 w-4"
                    nonActiveClassname="fill-current text-gray-300 h-4 w-4"
                  ></ProductRating>
                </div>
                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                {selectProduct ? (
                  <div>
                    <span>
                      {formatNumberToSocialStyle(
                        selectProduct.quantity - selectProduct.stock
                      )}
                    </span>
                    <span className="ml-1 text-gray-500">Đã bán</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <span>
                        {formatNumberToSocialStyle(dataProduct.buyed)}
                      </span>
                      <span className="ml-1 text-gray-500">Đã bán</span>
                    </div>
                  </>
                )}
              </div>

              {selectProduct ? (
                <div className="flex items-center px-5 py-4 mt-8 bg-gray-50">
                  <div className="text-gray-500 line-through">
                    đ{formatCurrency(selectProduct.price)}
                  </div>
                  <div className="ml-3 text-3xl font-medium text-primary">
                    đ{formatCurrency(selectProduct.priceNew)}
                  </div>
                  <div className="ml-4 rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white ">
                    {rateSale(selectProduct.price, selectProduct.priceNew)}
                    giảm
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center px-5 py-4 mt-8 bg-gray-50">
                    <div className="text-gray-500 line-through">
                      đ{formatCurrency(dataProduct.price)}
                    </div>
                    <div className="ml-3 text-3xl font-medium text-primary">
                      {formatCurrency(dataProduct.priceNew)}
                    </div>
                    <div className="ml-4 rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white ">
                      {dataProduct.discountPercent}% giảm
                    </div>
                  </div>
                </>
              )}
              {selectProduct ? (
                <div className="flex items-center mt-8">
                  <div className="mr-5 text-gray-500 capitalize">Số Lượng</div>
                  <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={selectProduct.stock}
                  ></QuantityController>

                  <div className="ml-6 text-sm text-gray-500">
                    {selectProduct.stock} Sản phẩm có sẵn
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center mt-8">
                    <div className="mr-5 text-gray-500 capitalize">
                      Số Lượng
                    </div>
                    <QuantityController
                      onDecrease={handleBuyCount}
                      onIncrease={handleBuyCount}
                      onType={handleBuyCount}
                      value={buyCount}
                      max={dataProduct.stock}
                    ></QuantityController>

                    <div className="ml-6 text-sm text-gray-500">
                      {dataProduct.stock} Sản phẩm có sẵn
                    </div>
                  </div>
                </>
              )}

              {selectProduct && (
                <div className="flex items-center mt-8">
                  <div className="mr-5 text-gray-500 capitalize">Mã Hàng</div>

                  <div className="ml-6 text-sm text-gray-500">
                    <div className="flex gap-4">
                      {dataProduct.newGroup &&
                        dataProduct.newGroup.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={`px-4 py-2 cursor-pointer ${
                                index === selectIndex
                                  ? "border-red-500 border text-red-600"
                                  : "border-gray-200 border text-black"
                              }
                            `}
                              onClick={() => {
                                setSelectIndex(index);
                                setSelectProduct(item);
                                setBuyCount(1);
                              }}
                            >
                              {item.childTitle}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={() => handleAddToWishList(dataProduct._id)}
                  className="ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-primary px-5 capitalize text-white shadow-sm outline-none hover:bg-primary/90"
                >
                  Yêu thích
                </button>
                <button
                  onClick={() =>
                    handleAddToCart(
                      dataProduct._id,
                      selectProduct?.childTitle || "none",
                      buyCount
                    )
                  }
                  className="h-12 px-5 border rounded-sm shadow-sm bg-primary/10 border-primary hover:bg-primary/5"
                >
                  <div className="flex items-center justify-center text-primary ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    <span className="ml-2"> Thêm vào giỏ hàng</span>
                  </div>
                </button>
                <button
                  onClick={() =>
                    buyNow(
                      dataProduct._id,
                      selectProduct?.childTitle || "none",
                      buyCount
                    )
                  }
                  className=" flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-primary px-5 capitalize text-white shadow-sm outline-none hover:bg-primary/90"
                >
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chi tiết sp */}
      <div className="container">
        <div className="p-4 mt-8 bg-white shadow">
          <div className="p-4 text-lg capitalize rounded bg-gray-50 text-slate-700">
            Chi tiết sản phẩm
          </div>
          <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
            <div className="flex flex-col mt-8">
              {dataProduct.properties &&
                dataProduct.properties.map((item, index) => {
                  const key = Object.keys(item);
                  return (
                    <div key={index} className="flex items-center">
                      <div className="w-[20%] mr-5 text-gray-500 capitalize ">
                        {key[0]} :
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {item[key]}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="p-4 mt-8 bg-white shadow">
          <div className="p-4 text-lg capitalize rounded bg-gray-50 text-slate-700">
            Mô tả sản phẩm
          </div>
          <div className="mx-4 mt-6 mb-4 text-sm leading-loose">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(dataProduct.description),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="container mt-8">
        <div className="p-4 mt-8 bg-white shadow ">
          <div className="p-4 text-lg capitalize rounded bg-gray-50 text-slate-700">
            Đánh Giá Sản Phẩm
          </div>

          <div className="p-5 bg-primary bg-opacity-10">
            <div className="flex items-center justify-between gap-10 text-primary">
              <div className="flex flex-col">
                <div className="flex items-end gap-2">
                  <span className="text-2xl">{dataProduct.rate}</span>
                  <span>trên</span>
                  <span className="text-xl">5</span>
                  <span>({feedBack.length} đánh giá) </span>
                </div>

                <div>
                  <ProductRating
                    rating={dataProduct.rate}
                    activeClassname="fill-primary text-primary h-4 w-4"
                    nonActiveClassname="fill-current text-gray-300 h-4 w-4"
                  ></ProductRating>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  onClick={() => handleSelectRateComment(0)}
                  className={`px-5 py-2 border cursor-pointer border-primary ${
                    0 === rateFilter ? "border-black text-black" : ""
                  }`}
                >
                  Tất cả
                </div>
                {Array(5)
                  .fill(0)
                  .map((item, index) => (
                    <div
                      onClick={() => handleSelectRateComment(index + 1)}
                      className={`px-5 py-2 border cursor-pointer border-primary ${
                        index + 1 === rateFilter
                          ? "border-black text-black"
                          : ""
                      }`}
                      key={index}
                    >
                      {index + 1} Sao
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col p-4">
            {feedBack &&
              feedBack.length > 0 &&
              feedBack.map((item, index) => {
                if (item.rate >= rateFilter) {
                  return (
                    <>
                      <div key={index} className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <span>{item.fullName}</span>
                          <div className="flex items-center gap-3 text-sm text-gray-300">
                            <span>12/14/2023</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <ProductRating rating={item.rate}></ProductRating>
                          <span>{item.comment}</span>
                        </div>
                      </div>
                      <Divider></Divider>
                    </>
                  );
                }
              })}
            {feedBack && feedBack.length === 0 && (
              <div>
                <span>Chưa có đánh giá nào</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="p-4 mt-8 bg-white shadow ">
          <div className="text-gray-400 uppercase ">Có thể bạn cũng thích</div>
          <div className="flex flex-wrap justify-start gap-2 py-5">
            {productRelated &&
              productRelated.map((product, index) => (
                <div key={index} className="w-[calc(20%-8px)] h-[305px]">
                  <Product product={product} star />
                </div>
              ))}
            {!productRelated && <div>Không có sản phẩn nào</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
