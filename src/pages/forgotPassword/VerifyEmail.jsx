/* eslint-disable no-unused-vars */
import { Divider, Form, Input, notification } from "antd";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { callOtp } from "../../services/authApi";
import { Helmet } from "react-helmet";

const VerifyEmail = () => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const onFinish = async (values) => {
    const data = {
      email: localStorage.getItem("emailVerify"),
      otp: values.otp,
    };
    // console.log(data);
    setIsLoading(true);
    const res = await callOtp({ ...data });

    setIsLoading(false);
    if (res.data.code === 200) {
      nav("/resetpassword");
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
        <title>Xác thực email</title>
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
                label="Verification Code"
                name="otp"
                rules={[
                  { required: true, message: "Otp không được để trống!" },
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
                  Verify me
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmail;
