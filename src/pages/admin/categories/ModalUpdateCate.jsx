/* eslint-disable no-unused-vars */
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
import { useEffect, useState } from "react";
import {
  callUpdateImageCategory,
  callUpdateCategory,
  callAllCategory,
} from "../../../services/adminApi";

const ModalUpdateCate = ({
  dataDetail,
  setDataDetail,
  openUpdateCategory,
  setOpenUpdateCategory,
  data,
  idDetail,
  setIdDetail,
  setData,
}) => {
  const [tmpAvatar, setTmpAvatar] = useState(dataDetail?.image);
  useEffect(() => {
    if (dataDetail?.image) {
      setTmpAvatar(dataDetail?.image);
    }
  }, [dataDetail?.image]);
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
  useEffect(() => {
    const init = {
      title: dataDetail?.title,
      status: dataDetail?.status,
      description: dataDetail?.description,
    };
    form.setFieldsValue(init);
  }, [dataDetail?.description, dataDetail?.status, dataDetail?.title, form]);
  //   onchange switch

  const [isParent, setIsParent] = useState();
  useEffect(() => {
    if (!dataDetail?.parentName) {
      setIsParent(true);
    } else {
      setIsParent(false);
    }
  }, [dataDetail?.parentName]);

  //select cate cha
  const [newParentId, setNewParentId] = useState(dataDetail?.parentId);
  const handleChangeParentCate = (value) => {
    //id
    setNewParentId(value);
    // console.log(`selected ${value}`);
  };
  const onFinish = async (values) => {
    const data = {
      title: values.title,
      description: values.description,
      status: values.status,
      image: tmpAvatar,
      properties: properties,
      parentId: newParentId,
    };
    const res = await callUpdateCategory(idDetail, data);
    if (res.data.code == 200) {
      message.success("update thành công");
      setDataDetail();
      setIdDetail();
      setOpenUpdateCategory(false);
      const res = await callAllCategory();
      if (res.status === 200) {
        setData(res.data.productCategory);
      }
      if (res?.data?.code === 400) {
        message.error(res?.data?.message);
      }
    }
    // console.log(values);
  };
  const onChangeCheckbox = (checkedValues) => {
    // console.log("checked = ", checkedValues);
  };
  //new properties
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    setProperties(dataDetail?.properties);
  }, [dataDetail?.properties]);
  const [isNewProperty, setIsNewProperty] = useState(false);
  const [newProperty, setNewProperty] = useState("");
  const handleOnChangeInput = (e) => {
    setNewProperty(e.target.value);
  };
  const handleCheckParent = (e) => {
    setIsParent(e);
  };
  const handleAddNewProperties = () => {
    setProperties((prev) => [...prev, newProperty]);
    setNewProperty("");
  };
  const handleDelete = (value) => {
    const a = properties.filter((item) => item !== value);
    setProperties(a);
  };

  //active
  const [valueStatus, setValueStatus] = useState(dataDetail?.status);
  const onChangeStatus = (e) => {
    setValueStatus(e.target.value);
  };
  if (!dataDetail) return null;

  return (
    <Modal
      width="30vw"
      title="Update category"
      open={openUpdateCategory}
      onOk={() => setOpenUpdateCategory(true)}
      onCancel={() => {
        setOpenUpdateCategory(false);
        setDataDetail({});
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
                checked={isParent}
                onChange={(e) => handleCheckParent(e)}
              />
            </Form.Item>
          </Col>
        </Row>
        {!isParent && (
          <Form.Item
            value="categoryParent"
            label="Select Category Parent"
            labelCol={{ span: 24 }}
          >
            <Select
              defaultValue={dataDetail?.parentName}
              onChange={handleChangeParentCate}
              style={{ marginBottom: "10px" }}
              options={data.map((item) => {
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
                onChange={onChangeCheckbox}
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
          <Button htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateCate;
