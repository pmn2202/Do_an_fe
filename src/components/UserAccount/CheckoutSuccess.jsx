import { Button, Result } from "antd";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { callGetCart } from "../../services/cartApi";
import { doGetCartListItemAction } from "../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const fetch = async () => {
    const res = await callGetCart();
    // await callGetCart();
    if (res.data.cart.products) {
      dispatch(doGetCartListItemAction(res.data.cart.products));
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="container mx-auto">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Thanh toán thành công</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <Result
        status="success"
        title="Đặt hàng thành công !"
        subTitle="Bạn đã đặt hàng thành công. Cảm ơn bạn đã tin tưởng "
        extra={[
          <Link to="/orderhistory" key="orderhistory">
            <Button>Go To Order History</Button>
          </Link>,
          <Link to="/" key="home">
            <Button>Home</Button>,
          </Link>,
        ]}
      />
    </div>
  );
};

export default CheckoutSuccess;
