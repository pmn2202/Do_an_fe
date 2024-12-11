/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal, message } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductRating from "../../../components/product/ProductRating";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  rateSale,
} from "../../../utils/utils";
import QuantityController from "../../../components/input/QuantityController";
import {
  callAddToWishList,
  callGetWishlist,
} from "../../../services/productApi";
import { doGetWishListAction } from "../../../redux/product/productSlice";
import { useDispatch } from "react-redux";
import { callAddToCart, callGetCart } from "../../../services/cartApi";
import {
  doBuyNowAction,
  doGetCartListItemAction,
} from "../../../redux/cart/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { data } from "autoprefixer";

const ModalViewDetail = ({
  dataDetail,
  setDataDetail,
  isOpenDetail,
  setIsOpenDetail,
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isAdmin = pathname.includes("admin") ? true : false;
  const to = isAdmin ? "/admin/order" : "/orderhistory";
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectProduct, setSelectProduct] = useState(null);
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  const [activeImage, setActiveImage] = useState("");
  useEffect(() => {
    if (dataDetail?.newGroup) {
      setSelectProduct(dataDetail?.newGroup[0]);
    }
  }, [dataDetail]);
  const currentImages = useMemo(
    () => (dataDetail ? dataDetail?.images?.slice(...currentIndexImages) : []),
    [dataDetail, currentIndexImages]
  );

  useEffect(() => {
    if (dataDetail && dataDetail?.images?.length > 0) {
      setActiveImage(dataDetail?.images[0]);
    }
  }, [dataDetail]);
  const chooseActive = (img) => {
    setActiveImage(img);
  };
  const next = () => {
    if (currentIndexImages[1] < dataDetail?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
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
      dispatch(doBuyNowAction({id,number}));
      nav("/checkout");
    }
  };
  return (
    // <></>
    <Modal
      width="70vw"
      title="Thông tin sản phẩm"
      open={isOpenDetail}
      onCancel={() => setIsOpenDetail(false)}
      footer={<></>}
    >
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
                // alt={dataDetail.title}
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
              {currentImages.map((img, index) => {
                const isActive = img === activeImage;
                return (
                  <div
                    className="relative w-full pt-[100%] "
                    key={index}
                    onMouseEnter={() => chooseActive(img)}
                  >
                    <img
                      src={img}
                      alt={dataDetail.name}
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
              {dataDetail?.title}
            </h1>
            <div className="flex items-center mt-8">
              <div className="flex items-center">
                <span className="mr-1 border-b border-b-primary text-primary">
                  {dataDetail?.rate}
                </span>
                <ProductRating
                  rating={dataDetail?.rate}
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
                    <span>{formatNumberToSocialStyle(dataDetail?.buyed)}</span>
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
                    đ{formatCurrency(dataDetail?.price)}
                  </div>
                  <div className="ml-3 text-3xl font-medium text-primary">
                    {formatCurrency(dataDetail?.priceNew)}
                  </div>
                  <div className="ml-4 rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white ">
                    {dataDetail?.discountPercent}% giảm
                  </div>
                </div>
              </>
            )}
            {selectProduct ? (
              <div className="flex items-center mt-8">
                <div className="mr-5 text-gray-500 capitalize">Số Lượng</div>
                {!isAdmin && (
                  <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={selectProduct?.stock}
                  ></QuantityController>
                )}

                <div className="ml-6 text-sm text-gray-500">
                  {selectProduct?.stock} Sản phẩm có sẵn
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center mt-8">
                  <div className="mr-5 text-gray-500 capitalize">Số Lượng</div>
                  <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={dataDetail?.stock}
                  ></QuantityController>

                  <div className="ml-6 text-sm text-gray-500">
                    {dataDetail?.stock} Sản phẩm có sẵn
                  </div>
                </div>
              </>
            )}

            {selectProduct && (
              <div className="flex items-center mt-8">
                <div className="mr-5 text-gray-500 capitalize">Mã Hàng</div>

                <div className="ml-6 text-sm text-gray-500">
                  <div className="flex gap-4">
                    {dataDetail.newGroup &&
                      dataDetail.newGroup.map((item, index) => {
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
            {!isAdmin && (
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={() => handleAddToWishList(dataDetail._id)}
                  className="ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-primary px-5 capitalize text-white shadow-sm outline-none hover:bg-primary/90"
                >
                  Yêu thích
                </button>
                <button
                  onClick={() =>
                    handleAddToCart(
                      dataDetail._id,
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
                      dataDetail._id,
                      selectProduct?.childTitle || "none",
                      buyCount
                    )
                  }
                  //   onClick={buyNow}
                  className=" flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-primary px-5 capitalize text-white shadow-sm outline-none hover:bg-primary/90"
                >
                  Mua Ngay
                </button>
              </div>
            )}
          </div>
        </div>
        {isAdmin && (
          <div className="container">
            <div className="p-4 mt-8 bg-white shadow">
              <div className="p-4 text-lg capitalize rounded bg-gray-50 text-slate-700">
                Mô tả sản phẩm
              </div>
              <div className="mx-4 mt-6 mb-4 text-sm leading-loose">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(dataDetail?.description),
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalViewDetail;
