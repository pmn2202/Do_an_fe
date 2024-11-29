/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import NotPermitted from "./NotPermitted";
import { Navigate } from "react-router-dom";
const RoleBaseRoute = (props) => {
  //có vào trang admin ko
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const profile = useSelector((state) => state.account.profile);
  const role = profile?.role?.title;
  if ((isAdminRoute && role !== "Khách hàng") || !isAdminRoute) {
    return <>{props.children}</>;
  } else {
    return <NotPermitted></NotPermitted>;
  }
};
const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <>
      {isAuthenticated === true && (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      )}
      {!localStorage.getItem("token") && <Navigate to="/login" />}
    </>
  );
};
export default ProtectedRoute;
