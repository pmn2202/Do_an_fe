import { Divider, Form, Input, notification } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { callForgotPasswordEmail } from "../../services/authApi";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const onFinish = async (values) => {
    localStorage.setItem("emailVerify", values.email);
    setIsLoading(true);
    const res = await callForgotPasswordEmail({ ...values });

    // console.log(res);
    setIsLoading(false);
    if (res.data.code === 200) {
      nav("/verifyemail");
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.data.message,
      });
    }
  };
  return (
    <div className="register-page">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Quên mật khẩu</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Forget Password</h2>
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
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                ]}
              >
                <Input />
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
                  Send Code
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
                Đã có tài khoản ?
                <span>
                  <Link to="/login"> Đăng nhập</Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
