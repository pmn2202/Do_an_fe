import {
  CompareIcon,
  NeedHelpIcon,
  PhoneIcon,
  SupportIcon,
} from "../../../utils/icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SubCategory from "./SubCategory";
import { Button } from "antd";
const navbar = [
  {
    label: "Compare",
    icon: <CompareIcon />,
    path: "/compare",
  },
  {
    label: "Customer Support",
    icon: <SupportIcon />,
    path: "/support",
  },
  {
    label: "Need Help",
    icon: <NeedHelpIcon />,
    path: "/needhelp",
  },
];
const BottomNav = () => {
  const [showSubCategory, setShowSubCategory] = useState(false);

  return (
    <div className="container flex items-center justify-between py-4 bg-white">
      <div className="flex items-center gap-4 text-sm text-[#5F6C72] relative">
        <Button
          onClick={() => setShowSubCategory(!showSubCategory)}
          className="px-3 text-black bg-gray-2"
        >
          All Category
          {showSubCategory && (
            <div className="absolute z-50 top-[calc(100%+10px)] left-0 shadow-sm">
              <SubCategory />
            </div>
          )}
        </Button>

        {navbar.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => {
                return `flex items-center gap-1 ${
                  isActive ? "text-primary" : ""
                }`;
              }}
            >
              <span>{item.icon}</span>
              <span> {item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span>
          <PhoneIcon />
        </span>
        <span>0358616245</span>
      </div>
    </div>
  );
};

export default BottomNav;
