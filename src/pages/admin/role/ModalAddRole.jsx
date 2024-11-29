/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

import { callAddNewRole } from "../../../services/adminApi";

const ModalAddRole = ({ openAddRole, setOpenAddRole, fetchRole }) => {
  const [form] = useForm();
  const onFinish = async (values) => {
    const res = await callAddNewRole(values);
    if (res.data.code === 200) {
      message.success("Thêm mới quyền thành công");
      setOpenAddRole(false);
      form.resetFields();
      fetchRole();
    }
  };
  return (
    <Modal
      width="30vw"
      title="Add New Role"
      open={openAddRole}
      maskClosable={false}
      onCancel={() => {
        setOpenAddRole(false);
        form.resetFields();
      }}
      footer={<></>}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên quyền"
          name="title"
          rules={[
            {
              required: true,
              message: "Tên quyền ko được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Mô tả không được để trống!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Thêm mới</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddRole;
