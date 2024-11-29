/* eslint-disable react/prop-types */
import { memo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const CountDown = ({ unit, number }) => {
  return (
    <div className="flex items-center justify-center gap-1 text-base font-normal text-black">
      <span className="text-[18px]">{number}</span>
      <span className="text-xs ">{unit}</span>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(CountDown);
