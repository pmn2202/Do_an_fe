/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useForm } from "antd/es/form/Form";
import Button from "../../components/Button";
import { callLogin } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { doGetUserInfo, doLoginAction } from "../../redux/account/accountSlice";
import { Helmet } from "react-helmet";
const Login = () => {
  const [form] = useForm();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    const data = { ...values };
    setIsLoading(true);
    const res = await callLogin(data);
    if (res.data && res.data.code === 200) {
      message.success(res.data.message);
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem("profile", JSON.stringify(user));
      localStorage.setItem("token", token);
      dispatch(doLoginAction(token));
      dispatch(doGetUserInfo(user));

      nav("/");
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra!",
        description: res.data.message,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="register-page">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Đăng nhập</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Nhập</h2>
              <Divider />
            </div>
            <Form
              name="basic"
              form={form}
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button
                  kind="primary"
                  isLoading={isLoading}
                  onClick={() => form.submit()}
                  className="w-full"
                >
                  Đăng Nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal">
                Chưa có tài khoản ?
                <span>
                  <Link to="/register"> Đăng Kí </Link>
                </span>
              </p>
              <p className="text text-normal">
                <span>
                  <Link to="/forgotpassword">Quên mật khẩu ?</Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
