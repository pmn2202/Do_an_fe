import { Divider, Form, Input, message } from "antd";

// import './'
import { useState } from "react";
import Button from "../../components/Button";
import { useForm } from "antd/es/form/Form";
import { resetPass } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const onFinish = async (values) => {
    const data = {
      email: localStorage.getItem("emailVerify"),
      password: values.password,
    };
    setIsLoading(true);

    const res = await resetPass(data);
    if (res.data.code === 200) {
      message.success("Đổi mật khẩu thành công");
      nav("/login");
      localStorage.removeItem("emailVerify");
    } else if (res.data.code === 400) {
      message.error(res.data.message);
    }
  };
  return (
    <div className="register-page">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Cấp lại mật khẩu</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Reset Password</h2>
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
                  kind="primary"
                  isLoading={isLoading}
                  onClick={() => form.submit()}
                  className="w-full"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
