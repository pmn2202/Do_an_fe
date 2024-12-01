import { useRoutes } from "react-router-dom";
import MainLayout from "./src/layout";
import ProductList from "./src/pages/productList";
import Home from "./src/pages/home";
import ProductDetail from "./src/components/product/ProductDetail";
import OrderHistory from "./src/components/UserAccount/OrderHistory";
import ShoppingCart from "./src/components/UserAccount/ShoppingCart";
import WishList from "./src/components/UserAccount/WishList";
import Profile from "./src/components/UserAccount/Profile";
import Login from "./src/pages/login/Login";
import Register from "./src/pages/register/Register";
import ForgotPassword from "./src/pages/forgotPassword/ForgotPassword";
import ResetPassword from "./src/pages/forgotPassword/ResetPassword";
import OrderDetail from "./src/components/UserAccount/OrderDetail";
import AdminPage from "./src/pages/admin/AdminPage";
import CategoriesPage from "./src/pages/admin/categories/CategoriesPage";
import UserPage from "./src/pages/admin/user/UserPage";
import ProductPage from "./src/pages/admin/products/ProductPage";
import VerifyEmail from "./src/pages/forgotPassword/VerifyEmail";
import CheckOut from "./src/components/UserAccount/CheckOut";
import CheckoutSuccess from "./src/components/UserAccount/CheckoutSuccess";
import ProtectedRoute from "./src/components/protectedRoute/ProtectedRoute";
import RolePage from "./src/pages/admin/role/RolePage";
import NotFound from "./src/components/notFound/NotFound";

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "productlist",
          element: <ProductList />,
        },
        {
          path: "productlist/:id",
          element: <ProductList />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },

        {
          path: "orderhistory",
          element: (
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          ),
        },
        {
          path: "orderhistory/:id",

          element: (
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: "shoppingcart",
          element: (
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkoutsuccess",
          element: (
            <ProtectedRoute>
              <CheckoutSuccess />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "resetpassword",
      element: <ResetPassword />,
    },
    {
      path: "verifyemail",
      element: <VerifyEmail />,
    },
    {
      path: "/admin",
      errorElement: <NotFound />,
      element: (
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <ProtectedRoute>{/* <Dashboard /> */}</ProtectedRoute>,
        },
        {
          path: "user",
          element: (
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          ),
        },

        {
          path: "order",
          element: (
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          ),
        },
        {
          path: "role",
          element: (
            <ProtectedRoute>
              <RolePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "order/:id",
          element: (
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routeElements;
}
