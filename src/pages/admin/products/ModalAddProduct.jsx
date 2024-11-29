/* eslint-disable react/prop-types */
import {
  Button,
  Cascader,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import AddProductChild from "./AddProductChild";
import TableAddProduct from "./TableAddProduct";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  callAddProduct,
  callAdminCategoryDetail,
  callAllCategory,
  callUpdataImageProduct,
} from "../../../services/adminApi";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ModalAddProduct = ({
  isOpenAddNewProduct,
  setIsOpenAddNewProduct,
  fetchProduct,
}) => {
  const [dataTableChild, setDataTableChild] = useState([]);
  const [previewOpenSlider, setPreviewOpenSlider] = useState(false);
  const [previewImageSlider, setPreviewImageSlider] = useState("");
  const [previewTitleSlider, setPreviewTitleSlider] = useState("");
  const [fileListSlider, setFileListSlider] = useState([]);
  const handleCancelSlider = () => setPreviewOpenSlider(false);
  const handlePreviewSlider = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageSlider(file.url || file.preview);
    setPreviewOpenSlider(true);
    setPreviewTitleSlider(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChangeSlider = ({ fileList: newFileList }) =>
    setFileListSlider(newFileList);
  const uploadButtonSlider = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const [dataSlider, setDataSlider] = useState([]);
  //file nafy laf thu vien cho
  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    const res = await callUpdataImageProduct(file);
    if (res && res.data.code === 200) {
      setDataSlider((prev) => [
        ...prev,
        {
          name: res.data.images[0],
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi xảy ra khi upload file");
    }
  };
  const handleRemoveFile = (file, type) => {
    if (type === "slider") {
      const newSlider = dataSlider.filter((x) => x.uid !== file.uid);
      setDataSlider(newSlider);
    }
  };

  const [dataCategory, setDataCategory] = useState([]);
  const fetchHomeData = async () => {
    const res = await callAllCategory();
    if (res.status === 200) {
      setDataCategory(res.data.productCategory);
    }
  };
  useEffect(() => {
    fetchHomeData();
  }, []);

  function convertToNewFormat(categories) {
    return categories?.map((category) => {
      const newCategory = {
        value: category.id,
        label: category.title,
      };

      if (category.children && category.children.length > 0) {
        newCategory.children = convertToNewFormat(category.children);
      }

      return newCategory;
    });
  }

  const newDataCategory = convertToNewFormat(dataCategory);

  const [form] = useForm();
  const [formAddChild] = useForm();
  const [categorySelect, setCategorySelect] = useState("");
  //select category
  const onChangeSelectCategory = (e) => {
    setCategorySelect(e[e?.length - 1]);
  };
  const [propertiesCategory, setPropretiesCategory] = useState([]);
  useEffect(() => {
    const fetchPropertyCategory = async () => {
      const res = await callAdminCategoryDetail(categorySelect);
      if (res.data.code === 200) {
        setPropretiesCategory(res.data?.productCategory?.properties);
      }
    };
    fetchPropertyCategory();
  }, [categorySelect]);

  //change status
  const [valueStatus, setValueStatus] = useState("");
  const onChangeStatus = (e) => {
    setValueStatus(e.target.value);
  };
  const [valueFeature, setValueFeature] = useState("");
  const onChangeFeature = (e) => {
    setValueFeature(e.target.value);
  };
  const onFinish = async (values) => {
    const images = dataSlider.map((i) => i.name);
    const data = {
      title: values.title,
      productCategoryId: categorySelect,
      description: valueQuill,
      images: images,
      discountPercent: values.discountPercent,
      group: dataTableChild,
      featured: valueFeature,
      status: valueStatus,
      properties: propertiesCategory.map((item) => {
        return {
          [item]: values[item],
        };
      }),
    };
    // console.log(data);
    const res = await callAddProduct(data);
    if (res.data.code === 200) {
      message.success("Thêm sản phẩm thành công");
      fetchProduct();
      setIsOpenAddNewProduct(false);
      setDataTableChild([]);
      setProductChildren();
      setCategorySelect("");
      setPropretiesCategory([]);
      form.resetFields();
      setFileListSlider([]);
      formAddChild.setFieldsValue({ items: [{}] });
    }
  };

  //chidren product
  const [productChildren, setProductChildren] = useState({});

  //react quill
  const [valueQuill, setValueQuill] = useState("");
  return (
    <Modal
      width="70vw"
      title="Add New Product"
      open={isOpenAddNewProduct}
      maskClosable={false}
      onCancel={() => {
        setIsOpenAddNewProduct(false);
        setDataTableChild([]);
        setProductChildren();
        setCategorySelect("");
        setPropretiesCategory([]);
        form.resetFields();
        setFileListSlider([]);
        formAddChild.setFieldsValue({ items: [{}] });
      }}
      footer={<></>}
    >
      <Form name="basic" form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item labelCol={{ span: 24 }} label="Hình ảnh sản phẩm :">
          <div className="my-4">
            <Upload
              customRequest={handleUploadFileSlider}
              listType="picture-card"
              fileList={fileListSlider}
              onPreview={handlePreviewSlider}
              onChange={handleChangeSlider}
              onRemove={(file) => handleRemoveFile(file, "slider")}
            >
              {fileListSlider.length >= 8 ? null : uploadButtonSlider}
            </Upload>
            <Modal
              open={previewOpenSlider}
              title={previewTitleSlider}
              footer={null}
              onCancel={handleCancelSlider}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImageSlider}
              />
            </Modal>
          </div>
        </Form.Item>
        <Form.Item
          label="title"
          labelCol={{ span: 24 }}
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter your product name!",
            },
            {
              min: 20,
              message: "Product name have min length 20 !",
            },
          ]}
        >
          <Input showCount maxLength={120} />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please enter your product name!",
            },
          ]}
        >
          <Cascader
            options={newDataCategory}
            onChange={onChangeSelectCategory}
            placeholder="Please select category"
          />
        </Form.Item>

        {propertiesCategory.length > 0 &&
          propertiesCategory.map((item, index) => {
            return (
              <Form.Item key={index} label={item} name={item}>
                <Input />
              </Form.Item>
            );
          })}
        <Form.Item
          labelCol={{ span: 24 }}
          label="Description"
          name="decription"
        >
          {/*
           */}
          <ReactQuill
            theme="snow"
            value={valueQuill}
            onChange={setValueQuill}
          />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Giảm giá"
          name="discountPercent"
        >
          <InputNumber></InputNumber>
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
        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Nổi bật"
          name="feature"
        >
          <Radio.Group onChange={onChangeFeature} value={valueFeature}>
            <Radio value={"0"}>No</Radio>
            <Radio value={"1"}>Yes</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Phân loại hàng" labelCol={{ span: 24 }}>
          <AddProductChild
            formAddChild={formAddChild}
            productChildren={productChildren}
            setProductChildren={setProductChildren}
          />
        </Form.Item>
        <TableAddProduct
          dataTableChild={dataTableChild}
          setDataTableChild={setDataTableChild}
          productChildren={productChildren}
        ></TableAddProduct>
        <Form.Item className="mt-10">
          <Button htmlType="submit">Thêm mới</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
