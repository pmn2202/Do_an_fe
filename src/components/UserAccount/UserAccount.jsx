import UserNavbar from "./UserNavbar";
import { Outlet } from "react-router-dom";

const UserAccount = () => {
  return (
    <div className="container my-8">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2">
          <UserNavbar></UserNavbar>
        </div>
        <div className="col-span-10 border border-red-400">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
