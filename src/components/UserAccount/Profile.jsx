/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Tabs,
  Upload,
  message,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  callCheckOldPassword,
  callUpdateAvatar,
  callUpdatePassword,
  callUpdateUser,
} from "../../services/authApi";
import InputFile from "../input/InputFile";
import { doUpdateUserInfo } from "../../redux/account/accountSlice";
import { Helmet } from "react-helmet";

const Profile = () => {
  const profile = useSelector((state) => state.account.profile);

  const init = {
    email: profile.email,
    fullName: profile.fullName,
    phone: profile.phone,
    address: profile.address,
  };
  useEffect(() => {
    form.setFieldsValue(init);
  }, [profile]);

  const [avatar, setAvatar] = useState();
  const handleChangeFile = async (file) => {
    const res = await callUpdateAvatar(file);
    if (res.data.code === 200) {
      setAvatar(res.data.avatar);
    }
    setFile(file);
  };
  const [form] = useForm();
  const [form2] = useForm();

  const dispatch = useDispatch();
  const updateInfoUser = async (values) => {
    const data = {
      email: values.email,
      phone: values.phone,
      fullName: values.fullName,
      address: values.address,
      avatar: avatar,
    };
    console.log(data);
    const res = await callUpdateUser(data);
    if (res.data.code === 200) {
      localStorage.setItem("profile", JSON.stringify(res.data.user));
      console.log(res);
      dispatch(doUpdateUserInfo(res.data.user));
      message.success("Update thông tin thành công");
    }
  };
  const handleChangePassword = async (values) => {
    const oldPass = {
      password: values.password,
    };
    const newPass = {
      password: values.newPassword,
    };
    const checkPass = await callCheckOldPassword(oldPass);
    if (checkPass.data.code === 200) {
      const updatePass = await callUpdatePassword(newPass);
      if (updatePass.data.code === 200) {
        message.success("Update password thành công");
      }
    } else {
      notification.error({
        description: "Mật khẩu cũ sai rồi",
        message: checkPass.data.message,
      });
    }
  };

  const [file, setFile] = useState();
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  const items = [
    {
      key: "1",
      label: "Cập nhật thông tin",
      children: (
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className="w-24 h-24 my-5">
                <img
                  src={previewImage || profile.avatar}
                  alt="avatar"
                  className="object-cover w-full h-full border border-gray-300 rounded-full"
                />
              </div>

              <InputFile onChange={handleChangeFile}></InputFile>
            </div>
          </Col>
          <Col span={12}>
            <Form
              form={form}
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={updateInfoUser}
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
                <Input defaultValue={profile.email} />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Tên hiển thị"
                name="fullName"
                rules={[
                  { required: true, message: "Tên không được để trống!" },
                ]}
              >
                <Input value={profile.fullName} />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
                ]}
              >
                <Input value={profile.phone} />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Địa chỉ"
                name="address"
              >
                <TextArea />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Cập nhật</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Đổi mật khẩu",
      children: (
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form
              form={form2}
              name="basic"
              onFinish={handleChangePassword}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu hiện tại"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu hiện tại không được để trống!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu mới không được để trống!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Cập nhật</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ),
    },
  ];
  return (
    <div className="container p-10 my-12 border border-gray-100">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Thông tin người dùng</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <span>Profile</span>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Profile;
