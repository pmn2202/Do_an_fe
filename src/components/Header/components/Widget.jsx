import { useState } from "react";
import { ArrowRight, DoutoneX } from "../../../utils/icons";
import Button from "../../Button";
import { Link } from "react-router-dom";

const Widget = () => {
  const [isDisplay, setIsDisplay] = useState(true);
  return (
    <>
      {isDisplay ? (
        <div className="bg-[#303639] h-[70px] relative">
          <div className="container flex items-center justify-between h-full">
            <div className="flex">
              <div className="-rotate-6">
                <span className="text-[20px] font-medium bg-secondary px-[10px] py-[6px] ">
                  Black
                </span>
              </div>
              <span className="ml-4 text-white text-[24px] font-semibold">
                Friday
              </span>
            </div>

            <div className="flex items-center justify-between gap-1">
              <span className="text-sm text-white">Up to</span>
              <span className="text-[40px] font-semibold text-secondary">
                59%
              </span>
              <span className="text-lg font-semibold text-white">OFF</span>
            </div>
            <Link to="/productlist">
              <Button kind="secondary">
                Shop now <ArrowRight></ArrowRight>
              </Button>
            </Link>
          </div>

          <div
            onClick={() => setIsDisplay(false)}
            className="p-2 bg-gray-100 bg-opacity-10  absolute top-[50%] translate-y-[-50%] right-[20px] rounded-lg cursor-pointer"
          >
            <DoutoneX></DoutoneX>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Widget;
