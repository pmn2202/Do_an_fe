import { NavLink } from "react-router-dom";

const navbarUser = [
  {
    label: "Order History",
    path: "orderhistory",
  },
  {
    label: "Shopping Cart",
    path: "shoppingcart",
  },
  {
    label: "Wish List",
    icon: <></>,
    path: "wishlist",
  },
  {
    label: "Setting",
    icon: <></>,
    path: "setting",
  },
];

const UserNavbar = () => {
  return (
    <div className="flex flex-col border border-gray-100 shadow-lg">
      {navbarUser.map((item, index) => {
        return (
          <div className="cursor-pointer" key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 py-2 px-2  ${
                  isActive ? "text-white bg-primary" : "text-black bg-white"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default UserNavbar;
