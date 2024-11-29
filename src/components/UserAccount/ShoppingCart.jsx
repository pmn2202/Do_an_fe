import { Link } from "react-router-dom";
import QuantityController from "../input/QuantityController";
import Button from "../Button";
import { Col, Divider, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency, generateNameId } from "../../utils/utils";
import {
  doGetCartListItemAction,
  doUpdateQuantityAction,
  doUpdateSelectAction,
  doUpdateSelectAll,
} from "../../redux/cart/cartSlice";
import {
  callDeleteFromCart,
  callGetCart,
  callUpdateCart,
} from "../../services/cartApi";
import { useEffect, useMemo, useState } from "react";
import noproduct from "../../assets/images/no-product.png";
import { Helmet } from "react-helmet";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const handleQuantity = async (id, title, value, enable) => {
    const data = {
      id: id,
      childTitle: title,
      quantity: value,
    };
    console.log(data);
    if (enable) {
      await callUpdateCart(data);
      dispatch(doUpdateQuantityAction({ id, title, value }));
    } else {
      handleDeleteCart(id, title);
    }
  };
  const handleDeleteCart = async (id, childTitle) => {
    const data = {
      id: id,
      childTitle: childTitle,
    };
    const res = await callDeleteFromCart(data);
    if (res.data.code === 200) {
      const res2 = await callGetCart();
      if (res2.status === 200) {
        dispatch(doGetCartListItemAction(res2.data.cart.products));
      }
      message.success("Xóa giỏ hàng thành công");
    }
  };
  const [checkAll, setCheckAll] = useState(false);
  useEffect(() => {
    const check = cart.every((item) => item.selected);
    setCheckAll(check);
  }, [cart]);
  const handleSelectAll = () => {
    setCheckAll(!checkAll);
    dispatch(doUpdateSelectAll(checkAll));
  };

  const handleChecked = (id, childTitle) => {
    dispatch(doUpdateSelectAction({ id, childTitle }));
  };
  const checkedPerchases = useMemo(
    () => cart.filter((p) => p.selected),
    [cart]
  );
  //giá sau giảm
  const totalCheckedPerchasesPrice = useMemo(
    () =>
      checkedPerchases.reduce((res, current) => {
        return (
          res +
          (current.quantity * current?.infoProduct?.productChild?.priceNew ||
            current.quantity *
              current.infoProduct.price *
              (1 - current.infoProduct.discountPercent / 100))
        );
      }, 0),
    [checkedPerchases]
  );
  //giá trước giảm
  const totalCheckedPerchasesPriceBefore = useMemo(
    () =>
      checkedPerchases.reduce((res, current) => {
        return (
          res +
          (current.quantity * current?.infoProduct?.productChild?.price ||
            current.quantity * current.infoProduct.price)
        );
      }, 0),
    [checkedPerchases]
  );
  const totalDiscount = useMemo(() => {
    return totalCheckedPerchasesPriceBefore - totalCheckedPerchasesPrice;
  }, [totalCheckedPerchasesPrice, totalCheckedPerchasesPriceBefore]);

  return (
    <div className="py-16 bg-neutral-100">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Giỏ hàng</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <div className="container">
        {cart && cart.length > 0 && (
          <Row gutter={[20, 20]}>
            <Col span={18}>
              <div className="overflow-auto">
                <div className="grid grid-cols-12 py-5 text-sm text-gray-500 capitalize bg-white rounded-sm shadow px-9">
                  <div className="col-span-6 ">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center flex-shrink-0 pr-3">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-primary"
                          checked={checkAll}
                          onChange={handleSelectAll}
                        />
                      </div>
                      <div className="flex-grow text-black">Sản Phẩm</div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-5 text-center">
                      <div className="col-span-2">Đơn giá</div>
                      <div className="col-span-1">Số lượng</div>
                      <div className="col-span-1">Số tiền</div>
                      <div className="col-span-1">Thao tác</div>
                    </div>
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="p-5 my-3 bg-white rounded-sm shadow-sm">
                    {cart?.map((purchase, index) => {
                      console.log(purchase);
                      return (
                        <div
                          key={`${purchase.product_id}-${index}`}
                          className="grid items-center grid-cols-12 px-4 py-5 mt-5 text-sm text-left text-gray-500 bg-white border border-gray-200 rounded-sm first:mt-0"
                        >
                          <div className="col-span-6">
                            <div className="flex">
                              <div className="flex items-center justify-center flex-shrink-0 pr-3">
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 accent-primary"
                                  checked={purchase.selected}
                                  onChange={() =>
                                    handleChecked(
                                      purchase.product_id,
                                      purchase.childTitle
                                    )
                                  }
                                />
                              </div>
                              <div className="flex-grow">
                                <div className="flex">
                                  <Link
                                    className="flex-shrink-0 w-20 h-20"
                                    to={`/product/${generateNameId({
                                      name: purchase.infoProduct.title,
                                      id: purchase.product_id,
                                    })}`}
                                  >
                                    <img
                                      // alt={purchase.product.name}
                                      className="object-cover w-full h-full"
                                      src={purchase.infoProduct.images[0]}
                                    />
                                  </Link>
                                  <div className="flex-grow px-5 pt-1 pb-2">
                                    <Link
                                      to={`/product/${generateNameId({
                                        name: purchase.infoProduct.title,
                                        id: purchase.product_id,
                                      })}`}
                                      className="line-clamp-2"
                                    >
                                      <span>{purchase.infoProduct.title}</span>
                                      <span> </span>
                                      {purchase.childTitle !== "none" ? (
                                        <span>({purchase.childTitle})</span>
                                      ) : (
                                        <></>
                                      )}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-6">
                            <div className="grid items-center grid-cols-5">
                              <div className="col-span-2">
                                <div className="flex items-center justify-center">
                                  <span className="text-gray-300 line-through">
                                    {formatCurrency(
                                      purchase?.infoProduct?.productChild
                                        ?.price || purchase.infoProduct.price
                                    )}
                                    đ
                                  </span>
                                  <span className="ml-3">
                                    {formatCurrency(
                                      purchase?.infoProduct?.productChild
                                        ?.priceNew ||
                                        purchase.infoProduct.price *
                                          (1 -
                                            purchase.infoProduct
                                              .discountPercent /
                                              100)
                                    )}
                                    đ
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-1">
                                <QuantityController
                                  max={
                                    purchase?.infoProduct?.productChild
                                      ?.stock || purchase.infoProduct.stock
                                  }
                                  value={purchase.quantity}
                                  classNameWrapper="flex items-center"
                                  onIncrease={(value) =>
                                    handleQuantity(
                                      purchase.product_id,
                                      purchase.childTitle,
                                      value,
                                      value <=
                                        purchase?.infoProduct?.productChild
                                          ?.stock || purchase.infoProduct.stock
                                    )
                                  }
                                  onDecrease={(value) =>
                                    handleQuantity(
                                      purchase.product_id,
                                      purchase.childTitle,
                                      value,
                                      value >= 1
                                    )
                                  }
                                  // disabled={purchase.disabled}
                                  onType={(value) =>
                                    handleQuantity(
                                      purchase.product_id,
                                      purchase.childTitle,
                                      value,
                                      value <=
                                        purchase?.infoProduct?.productChild
                                          ?.stock || purchase.infoProduct.stock
                                    )
                                  }
                                ></QuantityController>
                              </div>
                              <div className="flex justify-center col-span-1">
                                <span className="text-primary">
                                  {formatCurrency(
                                    purchase.quantity *
                                      purchase?.infoProduct?.productChild
                                        ?.priceNew ||
                                      purchase.quantity *
                                        (purchase.infoProduct.price *
                                          (1 -
                                            purchase.infoProduct
                                              .discountPercent /
                                              100))
                                  )}
                                  đ
                                </span>
                              </div>
                              <div className="flex justify-center col-span-1">
                                <button
                                  className="text-black transition-colors bg-none hover:text-primary"
                                  onClick={() =>
                                    handleDeleteCart(
                                      purchase.product_id,
                                      purchase.childTitle
                                    )
                                  }
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Col>
            <Col span={6}>
              <div className="p-5 bg-white rounded-lg">
                <div className="pb-5">
                  <span className="text-lg font-medium leading-6 text-gray-900 ">
                    Card Totals
                  </span>
                </div>
                <div className="flex flex-col gap-3 pb-5">
                  <div className="flex justify-between ">
                    <span className="text-sm font-normal text-gray-600">
                      Sub-total
                    </span>
                    <span className="text-sm font-medium leading-5">
                      {formatCurrency(totalCheckedPerchasesPriceBefore)}đ
                    </span>
                  </div>
                  <div className="flex justify-between ">
                    <span className="text-sm font-normal text-gray-600">
                      Discount
                    </span>
                    <span className="text-sm font-medium leading-5">
                      {formatCurrency(totalDiscount)}đ
                    </span>
                  </div>
                  <div className="flex justify-between ">
                    <span className="text-sm font-normal text-gray-600">
                      Shipping
                    </span>
                    <span className="text-sm font-medium leading-5">Free</span>
                  </div>
                  <Divider></Divider>
                  <div className="flex justify-between text-base leading-6 text-gray-900">
                    <span className="font-normal ">Total</span>
                    <span className="font-semibold">
                      {formatCurrency(totalCheckedPerchasesPrice)}đ
                    </span>
                  </div>
                </div>

                <Link to={"/checkout"}>
                  <Button className="w-full mt-5">Proceed to Checkout</Button>
                </Link>
              </div>
            </Col>
          </Row>
        )}
        {cart && cart.length === 0 && (
          <div className="flex items-center justify-center">
            <div className="p-2 w-[300px] h-[300px] flex items-center justify-center flex-col">
              <img src={noproduct} alt="no product" className="w-24 h-24" />
              <div className="my-3">Chưa có sản phẩm trong giỏ hàng</div>
              <Link to="/">
                <Button>Mua sắm nào</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
