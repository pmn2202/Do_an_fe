import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Scrollbar } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
/* eslint-disable react/prop-types */
const Category = ({ categories }) => {
  const [cate, setCate] = useState([]);
  useEffect(() => {
    const cateParent = categories.filter((item) => {
      return item.parentId === "";
    });
    setCate(cateParent);
  }, [categories]);
  return (
    <>
      <div className="my-8 text-center">
        <span className="font-semibold text-[32px] leading-10 text-gray-900">
          Shop with Categories
        </span>
      </div>
      <Swiper
        className="flex gap-2"
        modules={[Scrollbar]}
        scrollbar={{ draggable: true }}
        slidesPerView={5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <div className="flex items-center justify-center gap-2">
          {cate.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="px-3 py-6 text-center border border-gray-200 rounded"
              >
                <Link
                  to={`/productlist/${item._id}`}
                  className="flex flex-col items-center w-full"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-[148px] h-[148px] object-cover"
                  />
                  <span>{item.title}</span>
                </Link>
              </SwiperSlide>
            );
          })}
          {/* {cate.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="px-3 py-6 text-center border border-gray-200 rounded"
              >
                <Link
                  to={`/productlist/${item._id}`}
                  className="flex flex-col items-center w-full"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-[148px] h-[148px] object-cover"
                  />
                  <span>{item.title}</span>
                </Link>
              </SwiperSlide>
            );
          })} */}
        </div>
      </Swiper>
    </>
  );
};

export default Category;
