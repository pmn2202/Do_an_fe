import { Col, Divider, Row, message } from "antd";
import {
  Amazon,
  AppleStore,
  Google,
  GooglePlay,
  Philips,
  Toshiba,
} from "../../utils/icons";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
const Footer = () => {
  const [info, setInfo] = useState({});
  const infoWeb = useSelector((state) => state.product.infoWeb);
  useEffect(() => {
    setInfo(infoWeb);
  }, [infoWeb]);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_w9x0s9x",
        "template_32zbdeq",
        form.current,
        "pOlauerOeZ27z4ltK"
      )
      .then(
        (result) => {
          console.log(result.text);
          message.success("Gửi mail thành công");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <div className="bg-[#1B6392]">
        <div className=" container w-[1320px] px-[300px] pt-[12px] flex flex-col justify-center items-center gap-[32px]">
          <h5 className="text-white text-[32px] font-semibold w-full text-center">
            Subscribe to our letter
          </h5>
          <p className="font-normal text-center text-white text-small w-[536px]">
            Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
            libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
          </p>
          <form
            className="flex flex-col w-1/2 gap-2 p-3 text-white border border-white rounded-lg"
            ref={form}
            onSubmit={sendEmail}
          >
            <label
              htmlFor="user_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>

            <input
              type="text"
              name="user_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
            <label
              htmlFor="user_email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>

            <input
              type="email"
              name="user_email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John@gmail.com"
              required
            />

            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              name="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              defaultValue={""}
            />

            <input
              className="py-3 mt-4 border border-white rounded-lg cursor-pointer"
              type="submit"
              value="Send"
            />
          </form>
          <div className="flex items-center justify-center gap-12">
            <Google />
            <Amazon />
            <Philips />
            <Toshiba />
          </div>
        </div>
      </div>
      <div className="bg-[#191C1F] text-white py-6">
        <div className="container">
          <Row gutter={[20, 20]}>
            <Col
              span={6}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Link to="/">
                <img
                  src={info?.logo}
                  alt=""
                  className="w-[127px] h-[48px] pb-2"
                />
              </Link>
              <div className="flex flex-col">
                <span className="text-[#77878F] text-sm font-normal">
                  Customer Supports :{" "}
                </span>
                <span className="text-lg font-medium text-white">
                  {info?.phone}
                </span>
              </div>
              <span className="text-base font-normal text-gray-300">
                {info?.address}
              </span>
              <span className="text-base font-normal text-white">
                {info?.email}
              </span>
            </Col>
            <Col
              span={6}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span className="text-base font-medium text-white uppercase">
                Top Category
              </span>
              <div className="flex flex-col gap-[10px] text-sm font-medium text-gray-400">
                <span>Computer & laptop</span>
                <span>Headphone</span>
                <span className="h-[21px]">
                  <Row
                    gutter={[10]}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col
                      span={4}
                      style={{
                        height: "21px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Divider
                        style={{
                          height: "2px",
                          backgroundColor: "#EBC80C",
                        }}
                      />
                    </Col>
                    <Col span={20}>
                      <span>Accessories</span>
                    </Col>
                  </Row>
                </span>
                <span>Camera & Photo</span>
                <span>TV & Homes</span>
              </div>
            </Col>
            <Col
              span={6}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span className="text-base font-medium text-white uppercase">
                Quick Links
              </span>
              <span className="text-base font-normal text-gray-400">
                Shop Product
              </span>
              <span className="text-base font-normal text-gray-400">
                Shopping cart
              </span>
              <span className="text-base font-normal text-gray-400">
                Wishlist
              </span>
              <span className="text-base font-normal text-gray-400">
                Compare
              </span>
              <span className="text-base font-normal text-gray-400">
                Track order
              </span>
              <span className="text-base font-normal text-gray-400">
                Customer Help
              </span>
              <span className="text-base font-normal text-gray-400">
                About us
              </span>
            </Col>
            <Col
              span={4}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span className="text-base font-medium text-white uppercase">
                Download app
              </span>
              <div className="flex items-center justify-center gap-4 py-4 bg-gray-800 rounded-lg">
                <GooglePlay />
                <div className="flex flex-col">
                  <span className="">Get it now</span>
                  <span>Goole Play</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 py-4 bg-gray-800 rounded-lg">
                <AppleStore />
                <div className="flex flex-col">
                  <span className="">Get it now</span>
                  <span>App Store</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Divider></Divider>
        <span className="flex justify-center text-gray-100">
          Kinbo - eCommerce Template © 2021. Design by Templatecookie
        </span>
      </div>
    </>
  );
};

export default Footer;
