/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CountDown from "./CountDown";
// import { Link } from "react-router-dom";
// import { ArrowRightOutlined } from "@ant-design/icons";
import { LargeProduct, Product } from "../product";

const BestDeals = ({ productsBestSellers }) => {
  // console.log(productsBestSellers.slice(1, 9));
  const result = productsBestSellers?.slice(1, 9).map((product, index) => {
    return (
      <div key={index} className="w-[calc(25%-8px)] h-[1/2 - 16px]">
        <Product product={product} star />
      </div>
    );
  });
  const [hour, setHour] = useState(0);
  const [minite, setMinite] = useState(0);
  const [second, setSecond] = useState(0);
  const [expire, setExpire] = useState(false);
  useEffect(() => {
    let idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minite > 0) {
          setMinite((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinite(59);
          } else {
            setExpire(!expire);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [expire, hour, minite, second]);
  useEffect(() => {
    if (expire) {
      //lấy giwof hiện tại
      const h = 24 - new Date().getHours();
      const m = 60 - new Date().getMinutes();
      const s = 60 - new Date().getSeconds();
      setHour(h);
      setMinite(m);
      setSecond(s);
    }
  }, [expire]);
  return (
    <div className="my-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">Best Deals</span>
          <span>Deals ends in</span>
          <div className="flex items-start justify-start gap-2 p-2 rounded-lg bg-secondary">
            <CountDown unit={"Hours"} number={hour} />
            <span>:</span>
            <CountDown unit={"Minites"} number={minite} />
            <span>:</span>
            <CountDown unit={"Seconds"} number={second} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 max-h-[500px] gap-2 mt-4">
        <div className="col-span-1">
          <LargeProduct product={productsBestSellers?.[0]}></LargeProduct>
        </div>
        <div className="flex flex-wrap justify-between w-full col-span-4 gap-2">
          {result}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
