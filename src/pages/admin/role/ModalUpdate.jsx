/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import {
  callUpadatePermission,
  callUpdateInfoRole,
} from "../../../services/adminApi";

const ModalUpdate = ({
  setOpenEdit,
  openEdit,
  fetchRole,
  dataDetail,
  setDataDetail,
}) => {
  const [form] = useForm();
  const [permissionList, setPermissionList] = useState([]);

  const handleChange = (value) => {
    setPermissionList(value);
  };
  useEffect(() => {
    const init = {
      title: dataDetail?.title,
      description: dataDetail?.description,
      permissions: dataDetail?.permissions,
    };
    form.setFieldsValue(init);
  }, [
    dataDetail?.description,
    dataDetail?.permissions,
    dataDetail?.title,
    form,
  ]);
  const listPermission = [
    {
      label: "Xem danh mục sản phẩm",
      value: "products-category_view",
    },
    {
      label: "Tạo danh mục sản phẩm",
      value: "products-category_create",
    },
    {
      label: "Sửa danh mục sản phẩm",
      value: "products-category_edit",
    },
    {
      label: "Xóa danh mục sản phẩm",
      value: "products-category_delete",
    },
    {
      label: "Xem sản phẩm",
      value: "products_view",
    },
    {
      label: "Tạo sản phẩm",
      value: "products_create",
    },
    {
      label: "Sửa sản phẩm",
      value: "products_edit",
    },
    {
      label: "Xóa sản phẩm",
      value: "products_delete",
    },
    {
      label: "Xem quyền",
      value: "roles_view",
    },
    {
      label: "Tạo quyền",
      value: "roles_create",
    },
    {
      label: "Sửa quyền",
      value: "roles_edit",
    },
    {
      label: "Xóa quyền",
      value: "roles_delete",
    },
    {
      label: "Phân quyền",
      value: "roles_permissions",
    },
    {
      label: "Xem tài khoản",
      value: "account_view",
    },
    {
      label: "Tạo tài khoản",
      value: "account_create",
    },
    {
      label: "Sửa tài khoản",
      value: "account_edit",
    },
    {
      label: "Xóa tài khoản",
      value: "account_delete",
    },
    {
      label: "Xem đơn hàng",
      value: "order_view",
    },
    {
      label: "Sửa đơn hàng",
      value: "order_edit",
    },
    {
      label: "Xóa comment",
      value: "comment-delete",
    },
    {
      label: "Xem thông tin trang web",
      value: "setting-general_view",
    },
    {
      label: "Sửa thông tin trang web",
      value: "setting-general_edit",
    },
    {
      label: "Chat",
      value: "chat",
    },
  ];

  const onFinish = async (values) => {
    const data1 = {
      title: values.title,
      description: values.description,
    };
    const data2 = [
      {
        role_id: dataDetail?.id,
        permissions: permissionList,
      },
    ];
    const res1 = await callUpdateInfoRole(dataDetail?.id, data1);
    const res2 = await callUpadatePermission(data2);
    if (res1.data.code === 200 && res2.data.code === 200) {
      message.success("Cập nhật thành công");
      fetchRole();
      setOpenEdit(false);
      return;
    }
    if (res1.data.code === 400 || res2.data.code === 400) {
      message.error(res1.data.message);
      setOpenEdit(false);
      return;
    }
  };
  return (
    <Modal
      width="50vw"
      title="Update Role"
      open={openEdit}
      maskClosable={false}
      onCancel={() => {
        setOpenEdit(false);
        setDataDetail({});
      }}
      footer={<></>}
    >
      <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
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
        <Form.Item label="Permissions" name="permissions">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select permission"
            defaultValue={dataDetail?.permissions}
            onChange={handleChange}
            optionLabelProp="label"
            options={listPermission}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdate;
