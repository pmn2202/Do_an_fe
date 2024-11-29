import { Divider, Form, Input, message, notification } from "antd";

import { Link, useNavigate } from "react-router-dom";

import "./register.scss";
import Button from "../../components/Button";
import { useForm } from "antd/es/form/Form";
import { callRegister } from "../../services/authApi";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();
  const nav = useNavigate();
  const onFinish = async (values) => {
    setIsLoading(true);
    const data = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    const res = await callRegister(data);
    if (res && res.data && res.data.code === 200) {
      message.success(res.data.message);
      nav("/login");
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
        <title>Đăng Kí</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
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
                label="Họ tên"
                name="fullName"
                rules={[
                  { required: true, message: "Họ tên không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

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
                labelCol={{ span: 24 }} //whole column
                label="Confirm Password"
                name="confirmpassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The confirm pasword that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button
                  isLoading={isLoading}
                  kind="primary"
                  onClick={() => form.submit()}
                  className="w-full"
                >
                  Đăng ký
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal">
                Đã có tài khoản ?
                <span>
                  <Link to="/login"> Đăng Nhập </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Register;
