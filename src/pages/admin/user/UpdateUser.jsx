/* eslint-disable react/prop-types */
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { callUpdateAvatar } from "../../../services/authApi";
import {
  callAllPermission,
  callUpdateUserByAdmin,
} from "../../../services/adminApi";

const UpdateUser = ({
  dataDetail,
  openCreateUser,
  setOpenCreateUser,
  setDataDetail,
  fetchAccount,
}) => {
  const [valueStatus, setValueStatus] = useState(dataDetail?.status);
  const onChangeStatus = (e) => {
    setValueStatus(e.target.value);
  };
  const [listPer, setListPer] = useState();
  const fetchPermission = async () => {
    const res = await callAllPermission();
    if (res.data.roles) {
      setListPer(res.data.roles);
    }
  };
  useEffect(() => {
    fetchPermission();
  }, []);
  const [tmpAvatar, setTmpAvatar] = useState("");
  useEffect(() => {
    setTmpAvatar(dataDetail?.avatar);
  }, [dataDetail?.avatar]);

  const handleUploadAvatar = async ({ file }) => {
    const res = await callUpdateAvatar(file);
    if (res.data.code === 200) {
      setTmpAvatar(res.data.avatar);
    }
  };
  const propsUpload = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    customRequest: handleUploadAvatar,
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(` file upload failed.`);
      }
    },
  };
  const [form] = useForm();
  useEffect(() => {
    const init = {
      fullname: dataDetail.fullName,
      email: dataDetail.email,
      phone: dataDetail.phone,
      status: dataDetail.status,
    };
    form.setFieldsValue(init);
  }, [
    dataDetail.email,
    dataDetail.fullName,
    dataDetail.phone,
    dataDetail.status,
    form,
  ]);
  const [idRole, setIdRole] = useState();
  useEffect(() => {
    setIdRole(dataDetail?.role_id);
  }, [dataDetail?.role_id]);

  const onFinish = async (values) => {
    const data = {
      email: values.email,
      fullName: values.fullname,
      phone: values.phone,
      status: values.status,
      avatar: tmpAvatar,
      role_id: idRole,
    };
    const res = await callUpdateUserByAdmin(dataDetail.id, data);
    if (res.data.code === 200) {
      message.success("Update thành công");
      setOpenCreateUser(false);
      fetchAccount();
    }
  };

  const handleChange = (value) => {
    setIdRole(value);
  };

  return (
    <Modal
      width="30vw"
      title="Update user"
      open={openCreateUser}
      onOk={() => setOpenCreateUser(true)}
      onCancel={() => {
        setOpenCreateUser(false);
        setDataDetail({});
        setIdRole("");
      }}
      footer={<></>}
      maskClosable={false}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Avatar size={100} icon={<UserOutlined />} src={tmpAvatar} />
        <Upload {...propsUpload}>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </div>
      <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Họ và tên "
          name="fullname"
          rules={[
            { required: true, message: "Họ và tên không được để trống!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email không được để trống!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Số điện thoại"
          name="phone"
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Quyền"
          name="permission"
        >
          <Select
            onChange={handleChange}
            options={listPer?.map((item) => {
              return {
                value: item.id,
                label: item.title,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Trạng thái"
          name="status"
        >
          <Radio.Group onChange={onChangeStatus} value={valueStatus}>
            <Radio value={"active"}>Active</Radio>
            <Radio value={"inactive"}>InActive</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUser;
