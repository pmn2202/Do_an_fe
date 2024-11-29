/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import {
  callCheckOutSuccess,
  callGetCart,
  callUpdateOrder,
} from "../../services/cartApi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { doGetCartListItemAction } from "../../redux/cart/cartSlice";

const style = { layout: "vertical" };
const ButtonWrapper = ({ currency, showSpinner, amount, payload }) => {
  const nav = useNavigate();

  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  const handleSaveOrder = async () => {
    const res = await callCheckOutSuccess(payload);
    if (res.data.code === 200) {
      nav("/checkoutsuccess");
    }
  };

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderId) => orderId);
        }}
        //khi nhấn nút tt xong lưu chi tiết đơn hàng vào db
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              handleSaveOrder();
            }
          })
        }
      />
    </>
  );
};

export default function Paypal({ amount, payload }) {
  return (
    <div style={{ maxWidth: "750px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
