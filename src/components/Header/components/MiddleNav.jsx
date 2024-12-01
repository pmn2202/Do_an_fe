/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Badge, Button, Divider, Popover, message } from "antd";
import {
  CartIcon,
  HeartIcon,
  UserIcon,
  XCircleIcon,
} from "../../../utils/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../../redux/account/accountSlice";
import {
  callDeleteWishlist,
  callGetWishlist,
} from "../../../services/productApi";
import {
  doGetWishListAction,
  doLogoutWishlist,
} from "../../../redux/product/productSlice";
import { formatCurrency, generateNameId } from "../../../utils/utils";
import noproduct from "../../../assets/images/no-product.png";
import {
  doGetCartListItemAction,
  doLogOutCart,
} from "../../../redux/cart/cartSlice";
import { useEffect, useState } from "react";
import { callDeleteFromCart, callGetCart } from "../../../services/cartApi";

const MiddleNav = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const profile = useSelector((state) => state.account.profile);
  console.log(profile);
  const role = profile.role?.title;
  const fetch = async () => {
    const res = await callGetCart();
    // await callGetCart();
    if (res.data.cart.products) {
      dispatch(doGetCartListItemAction(res.data.cart.products));
    }
  };

  const fetchWishList = async () => {
    const res = await callGetWishlist();
    if (res?.data?.listProductsFavorite) {
      dispatch(doGetWishListAction(res?.data?.listProductsFavorite));
    }
  };
  useEffect(() => {
    fetch();
    fetchWishList();
  }, []);
  const [info, setInfo] = useState({});
  const infoWeb = useSelector((state) => state.product.infoWeb);
  useEffect(() => {
    setInfo(infoWeb);
  }, [infoWeb]);

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const wishList = useSelector((state) => state.product.wishList);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    setAvatar(profile.avatar);
  }, [profile]);
  const handleDeleteWishlist = async (id) => {
    const res = await callDeleteWishlist(id);
    if (res.data.code === 200) {
      const res2 = await callGetWishlist();
      if (res2?.data?.code === 200) {
        dispatch(doGetWishListAction(res2?.data?.listProductsFavorite));
      }
      message.success("Xóa khỏi danh sách yêu thích thành công");
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
        dispatch(doGetCartListItemAction(res2?.data?.cart?.products));
      }
      message.success("Xóa giỏ hàng thành công");
    }
  };
  const contentCartList = (
    <>
      {cart && cart.length > 0 ? (
        <>
          <Divider className="p-0" />
          <div className="w-[328px] flex flex-col gap-4">
            {cart &&
              cart.slice(0, 3).map((item, index) => {
                return (
                  <div className="flex justify-between gap-4" key={index}>
                    <Link
                      to={`/product/${generateNameId({
                        name: item?.infoProduct?.title,
                        id: item?.product_id,
                      })}`}
                      className="flex justify-between gap-3"
                    >
                      <img
                        src={item?.infoProduct?.images[0]}
                        className="object-cover w-20 h-20 rounded-md"
                        alt=""
                      />
                      <div className="flex flex-col justify-between">
                        <span className="line-clamp-2">
                          {item?.infoProduct?.title}
                        </span>
                        {item.childTitle !== "none" && (
                          <span>{item?.childTitle || ""}</span>
                        )}
                        <div className="flex items-center gap-1">
                          <span>{item?.quantity} </span>
                          <span>x</span>
                          <span className="text-[#2DA5F3]">
                            {formatCurrency(
                              item?.infoProduct?.productChild?.priceNew ||
                                item?.infoProduct?.price *
                                  (1 - item?.infoProduct?.discountPercent / 100)
                            )}{" "}
                            VND
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div
                      onClick={() =>
                        handleDeleteCart(item?.product_id, item?.childTitle)
                      }
                      className="cursor-pointer"
                    >
                      <XCircleIcon />
                    </div>
                  </div>
                );
              })}
          </div>
          <Divider />
          {cart.length > 3 && (
            <span className="">Đã thêm +{cart.length - 3} vào danh sách</span>
          )}
          <Link to="/shoppingcart">
            <Button className="w-full h-[48px] text-sm font-bold  uppercase text-primary flex items-center justify-center ">
              View Cart
            </Button>
          </Link>
        </>
      ) : (
        <>
          <div className="p-2 w-[300px] h-[300px] flex items-center justify-center flex-col">
            <img src={noproduct} alt="no product" className="w-24 h-24" />
            <div className="mt-3">Chưa có sản phẩm trong giỏ hàng</div>
          </div>
        </>
      )}
    </>
  );
  const contentWishList = (
    <>
      {wishList && wishList.length > 0 ? (
        <>
          <Divider className="p-0" />
          <div className="w-[328px] flex flex-col gap-4">
            {wishList &&
              wishList.slice(0, 3).map((item, index) => {
                return (
                  <div className="flex justify-between gap-4" key={index}>
                    <Link
                      to={`/product/${generateNameId({
                        name: item?.title,
                        id: item?._id,
                      })}`}
                      className="flex justify-between gap-3"
                    >
                      <img
                        src={item?.images[0]}
                        className="object-cover w-20 h-20 rounded-md"
                        alt=""
                      />
                      <div className="flex flex-col justify-between">
                        <span className="line-clamp-2">{item?.title}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[#2DA5F3]">
                            {formatCurrency(item?.minPrice)} VND
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div
                      onClick={() => handleDeleteWishlist(item._id)}
                      className="cursor-pointer"
                    >
                      <XCircleIcon />
                    </div>
                  </div>
                );
              })}
          </div>
          <Divider />
          {wishList.length > 3 && (
            <span className="">
              Đã thêm +{wishList.length - 3} vào danh sách yêu thích
            </span>
          )}
          <Link to="/wishlist">
            <Button className="w-full h-[48px] text-sm font-bold  uppercase text-primary flex items-center justify-center ">
              Wishlist
            </Button>
          </Link>
        </>
      ) : (
        <>
          <div className="p-2 w-[300px] h-[300px] flex items-center justify-center flex-col">
            <img src={noproduct} alt="no product" className="w-24 h-24" />
            <div className="mt-3">Chưa có sản phẩm trong yêu thích</div>
          </div>
        </>
      )}
    </>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    dispatch(doLogoutWishlist());
    dispatch(doLogoutAction());
    dispatch(doLogOutCart());
  };
  const contentUserList = () => {
    return (
      <div className="flex flex-col gap-2">
        {role !== "Khách hàng" && (
          <Link className="px-2" to="/admin">
            Dashboard
          </Link>
        )}

        <Link className="px-2" to="/orderhistory">
          Order History
        </Link>
        <Link className="px-2" to="/shoppingcart">
          Shopping Cart
        </Link>
        <Link className="px-2" to="/wishlist">
          Wish List
        </Link>
        
        <Link className="px-2" to="/profile">
          Profile
        </Link>
        <Link
          to="/"
          className="px-2 cursor-pointer"
          onClick={() => handleLogout()}
        >
          Logout
        </Link>
      </div>
    );
  };
  return (
    <div className="w-full border bg-back border-t-[#ccc] py-[20px] ">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img src={info?.logo} alt="" className="w-[127px] h-[48px] pb-2" />
        </Link>

        <div className="flex items-center gap-[16px]">
          <Popover
            style={{ color: "white" }}
            placement="bottomRight"
            title={`Giỏ hàng (${cart.length})`}
            content={contentCartList}
          >
            <div className="cursor-pointer">
              <Badge count={cart.length} size={"default"}>
                <CartIcon />
              </Badge>
            </div>
          </Popover>
          <Popover
            style={{ color: "white" }}
            placement="bottomRight"
            title={`Wishlist (${wishList.length})`}
            content={contentWishList}
          >
            <div className="cursor-pointer">
              <Badge count={wishList.length} size={"default"}>
                <HeartIcon></HeartIcon>
              </Badge>
            </div>
          </Popover>
          {isAuthenticated ? (
            <>
              <Popover
                style={{ color: "white" }}
                placement="bottomRight"
                content={contentUserList}
              >
                <div className="cursor-pointer">
                  <Badge size={"default"}>
                    {avatar ? (
                      <Avatar size={46} src={avatar} />
                    ) : (
                      <UserIcon></UserIcon>
                    )}
                  </Badge>
                </div>
              </Popover>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button style={{ color: "#fff", borderColor: "#fff" }}>
                  Đăng Nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button style={{ color: "#fff", borderColor: "#fff" }}>
                  Đăng Kí
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiddleNav;
