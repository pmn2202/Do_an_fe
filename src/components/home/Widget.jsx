import { Col, Row } from "antd";
import Button from "../Button";
import {
  Champion,
  DeliveryIcon,
  PaymentIcon,
  SupportIcon,
} from "../../utils/icons";
import { Link } from "react-router-dom";

const Widget = () => {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={16}>
          <div className="flex px-10 py-6 bg-gray-300">
            <Row gutter={[20, 20]}>
              <Col
                span={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="text-[#2484C2] flex flex-col gap-[20px]">
                  <span className="text-sm font-medium uppercase">
                    The Best Place To play
                  </span>
                  <span className="text-[48px] font-semibold">
                    Xbox Consoles
                  </span>
                  <span className="text-lg font-normal text-gray-700">
                    Save up to 50% on select Xbox games. Get 3 months of PC Game
                    Pass for $2 USD.
                  </span>
                  <Link to="/">
                    <Button className="text-white bg-primary w-[40%] hover:opacity-80 ">
                      Shop now
                    </Button>
                  </Link>
                </div>
              </Col>
              <Col span={12}>
                <img src="img1.png" alt="" />
              </Col>
            </Row>
          </div>
        </Col>
        <Col
          span={8}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <div className="relative overflow-hidden rounded-lg h-1/2">
            <Row
              style={{
                height: "100%",
                backgroundColor: "#191C1F",
              }}
            >
              <Col
                span={12}
                style={{
                  padding: "0 40px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-sm font-medium uppercase text-[#EBC80C]">
                    Summer Sales
                  </span>
                  <span className="text-xl font-semibold leading-8 text-white">
                    New Google Pixel 6 Pro
                  </span>
                  <Link to="/">
                    <Button kind="primary">Shop now</Button>
                  </Link>
                </div>
              </Col>
              <Col span={12}>
                <img
                  src="1.png"
                  alt=""
                  className="w-[312px] h-[312px] absolute top-[35px] left-[35px] object-cover "
                />
              </Col>
              <Button
                kind="secondary"
                className="absolute top-[22px] right-[29px] px-2 py-0"
              >
                <span>29% OFF</span>
              </Button>
            </Row>
          </div>
          <div className="relative overflow-hidden rounded-lg h-1/2">
            <Row
              style={{
                height: "100%",
                backgroundColor: "#F2F4F5",
              }}
            >
              <Col
                span={12}
                style={{
                  padding: "0 40px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src="2.png" alt="" />
              </Col>
              <Col
                span={12}
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                <span className="text-xl font-semibold leading-8 text-gray-900">
                  Xiaomi FlipBuds Pro
                </span>
                <span className="text-[#2DA5F3] text-lg font-semibold leading-6">
                  $ 299 USD
                </span>
                <Link to="/">
                  <Button kind="primary" className="uppercase">
                    Shop now
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className="flex justify-between p-4 mt-4 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between gap-4 ">
          <DeliveryIcon></DeliveryIcon>
          <div className="flex flex-col">
            <span>Fasted Delivery</span>
            <span>Delivery in 24/H</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 ">
          <Champion></Champion>
          <div className="flex flex-col">
            <span>24 Hours Return</span>
            <span>100% money-back guarantee</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 ">
          <PaymentIcon></PaymentIcon>
          <div className="flex flex-col">
            <span>Secure Payment</span>
            <span>Your money is safe</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 ">
          <SupportIcon></SupportIcon>
          <div className="flex flex-col">
            <span>Support 24/7</span>
            <span>Live contact/message</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Widget;
