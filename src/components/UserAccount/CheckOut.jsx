/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/utils";
import { callCheckOutSuccess, callCheckout } from "../../services/cartApi";
import Paypal from "../paypal/Paypal";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const CheckOut = () => {
  const [dataShipping, setDataShipping] = useState({});
  const onFinishFormUser = (values) => {
    setDataShipping(values);
  };
  useEffect(() => {
    const data = {
      fullName: dataShipping.fullName,
      phone: dataShipping.phone,
      address: dataShipping.address,
    };
    setDataShipping(data);
  }, [dataShipping.address, dataShipping.fullName, dataShipping.phone]);
  const profile = useSelector((state) => state.account.profile);
  const [discountId, setDisCountId] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const buyProduct = cart.filter((item) => item.selected === true);
  const [listProduct, setListProduct] = useState([]);
  const [listDiscount, setListDiscount] = useState([]);
  const [percentDiscountCoupon, setPercentDiscountCoupon] = useState(0);
  const [valuePayment, setValuePayment] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("tienmat");
  const handleChangeCoupon = (value) => {
    setDisCountId(value);
    const tmp = listDiscount.find((item) => item._id === value);
    setPercentDiscountCoupon(tmp.percent);
  };

  const totalCheckedPerchasesPrice = useMemo(
    () =>
      buyProduct.reduce((res, current) => {
        return (
          res +
          (current.quantity * current?.infoProduct?.productChild?.priceNew ||
            current.quantity *
              current.infoProduct.price *
              (1 - current.infoProduct.discountPercent / 100))
        );
      }, 0),
    [buyProduct]
  );

  const totalDiscount = useMemo(() => {
    return totalCheckedPerchasesPrice * (percentDiscountCoupon / 100);
  }, [percentDiscountCoupon, totalCheckedPerchasesPrice]);
  const [form] = useForm();
  const init = {
    email: profile.email,
    fullName: profile.fullName,
    phone: profile.phone,
    address: profile.address,
  };
  useEffect(() => {
    form.setFieldsValue(init);
  }, [profile]);

  const callGetCheckOut = async () => {
    const products = buyProduct.map((item) => {
      return {
        product_id: item.product_id,
        childTitle: item.childTitle,
        quantity: item.quantity,
      };
    });

    const data = {
      products: products,
    };
    const res = await callCheckout(data);
    if (res.status === 200) {
      const coupon = res.data.listDiscount.map((item) => {
        return {
          _id: item._id,
          value: item.title,
          percent: item.discountPercent,
        };
      });
      setListDiscount(coupon);
    }
  };

  useEffect(() => {
    const infoProducts = buyProduct.map((item) => {
      return {
        product_id: item.product_id,
        childTitle: item.childTitle,
        quantity: item.quantity,
        price:
          item?.infoProduct?.productChild?.priceNew ||
          item.infoProduct.price * (1 - item.infoProduct.discountPercent / 100),
        discountPercent: item.infoProduct.discountPercent,
        statusComment: 0,
      };
    });
    setListProduct(infoProducts);
  }, []);

  useEffect(() => {
    callGetCheckOut();
  }, []);
  //thanh toán

  // thanh toans
  const listPayment = [
    {
      label: "Thanh toán bằng tiền mặt",
      id: 1,
      method: "tienmat",
    },
    {
      label: "Thanh toán bằng Paypal",
      id: 2,
      method: "paypal",
    },
  ];
  const handleChangePayment = (value) => {
    setValuePayment(value);
    const tmp = listPayment.find((item) => item.id === value);
    setPaymentMethod(tmp.method);
  };

  //tiền mặt;
  const nav = useNavigate();
  const handleSaveOrder = async () => {
    const data = {
      fullName: dataShipping?.fullName,
      phone: dataShipping?.phone,
      address: dataShipping.address,
      discountId: discountId,
      products: listProduct,
      paymentMethod: paymentMethod,
    };
    // console.log(data);
    const res = await callCheckOutSuccess(data);
    if (res.data.code === 200) {
      nav("/checkoutsuccess");
    }
  };
  return (
    <div className="container my-12">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Thanh toán</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <Row gutter={[30, 30]}>
        <Col span={16}>
          <div
            style={{ border: "1px solid #ccc", padding: 10, borderRadius: 10 }}
          >
            <span className="text-lg font-medium leading-6 text-gray-900">
              Thông tin giao hàng
            </span>
            <Divider></Divider>
            <Form
              form={form}
              name="basic"
              onFinish={onFinishFormUser}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                ]}
              >
                <Input defaultValue={profile.email} />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Tên hiển thị"
                name="fullName"
                rules={[
                  { required: true, message: "Tên không được để trống!" },
                ]}
              >
                <Input value={profile.fullName} />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
                ]}
              >
                <Input value={profile.phone} />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Địa chỉ"
                name="address"
              >
                <TextArea />
              </Form.Item>
              <Form.Item>
                <Button onClick={() => form.submit()}>
                  Lưu thông tin giao hàng
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{ border: "1px solid #ccc", padding: 10, borderRadius: 10 }}
          >
            <span className="text-lg font-medium leading-6 text-gray-900">
              Thông tin đơn hàng
            </span>
            <Divider></Divider>
            <div className="flex flex-col gap-4">
              {buyProduct &&
                buyProduct.map((item, index) => {
                  return (
                    <div className="flex justify-between gap-4" key={index}>
                      <div className="flex justify-between gap-3">
                        <img
                          src={item.infoProduct.images[0]}
                          className="object-cover w-20 h-20 rounded-md"
                          alt=""
                        />
                        <div className="flex flex-col justify-between">
                          <div className="flex gap-1">
                            <span>{item.infoProduct.title}</span>
                            <span> </span>
                            {item.childTitle !== "none" ? (
                              <span>({item.childTitle})</span>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{item.quantity} </span>
                            <span>x</span>
                            <span className="text-[#2DA5F3]">
                              {formatCurrency(
                                item?.infoProduct?.productChild?.priceNew ||
                                  item.infoProduct.price *
                                    (1 - item.infoProduct.discountPercent / 100)
                              )}{" "}
                              VND
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <Divider></Divider>

            <div className="p-5 bg-white rounded-lg">
              <div className="pb-5">
                <span className="text-lg font-medium leading-6 text-gray-900 ">
                  Card Totals
                </span>
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-lg font-medium leading-6">
                  Coupon Code
                </span>
                <Select
                  onChange={handleChangeCoupon}
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={listDiscount.map((item) => {
                    return {
                      value: item._id,
                      label: item.value,
                    };
                  })}
                />
              </div>
              <div className="flex flex-col gap-3 py-5">
                <div className="flex justify-between ">
                  <span className="text-sm font-normal text-gray-600">
                    Sub-total
                  </span>
                  <span className="text-sm font-medium leading-5">
                    {formatCurrency(totalCheckedPerchasesPrice)}đ
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
                    {formatCurrency(totalCheckedPerchasesPrice - totalDiscount)}
                    đ
                  </span>
                </div>
              </div>
              <Divider></Divider>
              <Select
                onChange={handleChangePayment}
                style={{
                  width: "100%",
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                options={listPayment.map((item) => {
                  return {
                    value: item.id,
                    label: item.label,
                    method: item.method,
                  };
                })}
              />

              {valuePayment === 2 && (
                <div className="w-full mt-7">
                  <Paypal
                    amount={totalCheckedPerchasesPrice - totalDiscount}
                    payload={{
                      fullName: dataShipping.fullName,
                      phone: dataShipping.phone,
                      address: dataShipping.address,
                      discountId: discountId,
                      products: listProduct,
                      paymentMethod: paymentMethod,
                    }}
                  />
                </div>
              )}
              {valuePayment === 1 && (
                <Button
                  onClick={() => handleSaveOrder()}
                  className="w-full mt-5"
                >
                  Đặt hàng
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CheckOut;
