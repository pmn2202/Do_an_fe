/* eslint-disable react/prop-types */
import {
  MinusCircleFilled,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import {
  callAddCategory,
  callAllCategory,
  callUpdateImageCategory,
} from "../../../services/adminApi";

const CreateCategory = ({
  openCreateCategory,
  setOpenCreateCategory,
  data,
  setData,
}) => {
  const [tmpAvatar, setTmpAvatar] = useState("");
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
  const [form] = useForm();

  //   onchange switch
  const [isParent, setIsParent] = useState(false);

  //select cate cha

  const onFinish = async (values) => {
    const data = {
      title: values.title,
      parentId: newParentId,
      description: values.description,
      image: tmpAvatar,
      status: values.status,
      properties: properties,
    };
    const res = await callAddCategory(data);
    if (res.data.code === 200) {
      message.success("thêm thành công 1 category mới");
      const res = await callAllCategory();
      if (res.status === 200) {
        setData(res.data.productCategory);
      }
      setOpenCreateCategory(false);
      form.resetFields();
      setTmpAvatar("");
    }
  };

  const handleCheckParent = (e) => {
    setIsParent(e);
  };
  //new properties
  const [properties, setProperties] = useState([]);
  const [isNewProperty, setIsNewProperty] = useState(false);
  const [newProperty, setNewProperty] = useState("");
  const handleOnChangeInput = (e) => {
    setNewProperty(e.target.value);
  };
  const handleAddNewProperties = () => {
    setProperties((prev) => [...prev, newProperty]);
    setNewProperty("");
  };
  const handleDelete = (value) => {
    const a = properties.filter((item) => item !== value);
    setProperties(a);
  };
  const [newParentId, setNewParentId] = useState("");
  const handleChangeParentCate = (value) => {
    setNewParentId(value);
  };

  const [valueStatus, setValueStatus] = useState();
  const onChangeStatus = (e) => {
    setValueStatus(e.target.value);
  };
  return (
    <Modal
      width="30vw"
      title="Add new category"
      open={openCreateCategory}
      onOk={() => setOpenCreateCategory(true)}
      onCancel={() => {
        setOpenCreateCategory(false);
        setProperties([])
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
      <Form
        form={form}
        name="basic"
        // style={{ maxWidth: 600, margin: '0 auto' }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title không được để trống!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Description không được để trống!" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Row>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item name="isparent" label="Parent">
              <Switch
                defaultChecked={isParent}
                onChange={(e) => handleCheckParent(e)}
              />
            </Form.Item>
          </Col>
        </Row>
        {!isParent && (
          <Form.Item
            value="categoryParent"
            label="Select"
            labelCol={{ span: 24 }}
          >
            <Select
              onChange={handleChangeParentCate}
              style={{ marginBottom: "10px" }}
              options={data?.map((item) => {
                return {
                  value: item.id,
                  label: item.title,
                };
              })}
            ></Select>

            <Form.Item label="Properties" labelCol={{ span: 24 }}>
              <Checkbox.Group
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              // onChange={onChangeCheckbox}
              >
                <Row>
                  {properties?.map((item, index) => (
                    <Col key={index} span={8}>
                      {item}
                      <MinusCircleFilled
                        onClick={() => handleDelete(item)}
                        style={{ cursor: "pointer" }}
                      />
                    </Col>
                  ))}
                </Row>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => setIsNewProperty(true)}>
                    Add new properties
                  </Button>
                  {isNewProperty && (
                    <div className="flex flex-col gap-2">
                      <Input
                        value={newProperty}
                        placeholder="Enter new properties"
                        onChange={(e) => handleOnChangeInput(e)}
                      ></Input>
                      <Button onClick={handleAddNewProperties}>Add</Button>
                    </div>
                  )}
                </div>
              </Checkbox.Group>
            </Form.Item>
          </Form.Item>
        )}
        <Form.Item>
          <Button htmlType="submit">Thêm mới</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategory;
