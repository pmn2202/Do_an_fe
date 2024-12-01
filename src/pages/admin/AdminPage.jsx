import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Col, Row } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const AdminPage = () => {
  let location = useLocation();
  const pathname = location.pathname;
  const a = pathname.split("/");
  let path = a[a.length - 1];
  if (path === "admin") {
    path = "";
  }

  const navbarAdmin = [
    {
      path: "categories",
      label: "Categories",
    },
    {
      path: "products",
      label: "Products",
    },
    {
      path: "user",
      label: "Users",
    },
    {
      path: "order",
      label: "Orders",
    },
    {
      path: "role",
      label: "Role",
    },
  ];
  return (
    <>
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Trang quản trị</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <Header />
      <div className="container my-12">
        <Row gutter={[30, 30]}>
          <Col
            span={4}
            style={{
              height: "400px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              paddingInline: "0px",
              overflow: "hidden",
            }}
          >
            <div className="flex flex-col">
              {navbarAdmin.map((item, index) => {
                return (
                  <NavLink
                    to={item.path}
                    key={index}
                    className={`p-3 ${
                      path === item.path
                        ? "bg-primary text-white"
                        : "bg-white text-black"
                    } `}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </Col>
          <Col span={20}>
            <Outlet />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
