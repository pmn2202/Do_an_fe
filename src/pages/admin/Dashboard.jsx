import { useEffect, useState } from "react";
import {
  callEditWeb,
  callInfoWeb,
  callUpdateImageCategory,
} from "../../services/adminApi";
import { Avatar, Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { doUpdateInfoWeb } from "../../redux/product/productSlice";

const Dashboard = () => {
  const [info, setInfo] = useState({});
  const [tmpAvatar, setTmpAvatar] = useState(info?.logo);
  const handleUploadImageCategory = async ({ file }) => {
    const res = await callUpdateImageCategory(file);
    if (res.data.code === 200) {
      setTmpAvatar(res.data.image);
    }
    if (res?.data?.code === 400) {
      message.error(res?.data?.message);
    }
  };
  const propsUpload = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    customRequest: handleUploadImageCategory,
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(` file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(` file upload failed.`);
      }
    },
  };

  const fetchInfo = async () => {
    const res = await callInfoWeb();
    if (res.data.setting) {
      setInfo(res.data.setting);
    }
  };
  const [form] = useForm();
  useEffect(() => {
    fetchInfo();
  }, []);
  useEffect(() => {
    const init = {
      websiteName: info?.websiteName,
      logo: info?.websiteName,
      phone: info?.phone,
      email: info?.email,
      address: info?.address,
    };
    form.setFieldsValue(init);
  }, [form, info?.address, info?.email, info?.phone, info?.websiteName]);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const data = {
      websiteName: values.websiteName,
      phone: values.phone,
      email: values.email,
      address: values.address,
      logo: tmpAvatar,
    };
    const res = await callEditWeb(data);
    if (res.data.code === 200) {
      message.success(res.data.message);
      dispatch(doUpdateInfoWeb(res.data.settingGeneral));
      fetchInfo();
    }
    if (res.code.code === 400) {
      message.error(res.data.message);
    }
  };
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-10">
        <span className="uppercase">Thông tin trang web</span>
      </div>

      <Form form={form} name="basic" onFinish={onFinish}>
        <div className="flex flex-col items-center justify-center gap-2 mb-10">
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={tmpAvatar || info?.logo}
          />
          <Upload {...propsUpload}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </div>
        <Form.Item
          label="websiteName"
          name="websiteName"
          rules={[
            {
              required: true,
              message: "Please input your websiteName!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="flex items-center justify-center">
          <Button htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Dashboard;
