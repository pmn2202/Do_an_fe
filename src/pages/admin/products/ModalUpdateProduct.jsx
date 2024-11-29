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
import { v4 as uuidv4 } from "uuid";
import {
  callAllCategory,
  callUpdataImageProduct,
  callUpdateProduct,
} from "../../../services/adminApi";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ModalUpdateProduct = ({
  dataDetail,
  openModalUpdate,
  setOpenModalUpdate,
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
  const [categorySelect, setCategorySelect] = useState();

  useEffect(() => {
    setCategorySelect(dataDetail?.productCategoryId);
  }, [dataDetail?.productCategoryId]);
  //select category
  const onChangeSelectCategory = (e) => {
    setCategorySelect(e[e?.length - 1]);
  };
  const [propertiesCategory, setPropretiesCategory] = useState([]);
  useEffect(() => {
    const dataProperties = dataDetail?.properties;
    const tmp = dataProperties?.map((item) => {
      const keys = Object.keys(item);
      return {
        [keys[0]]: dataProperties[keys[0]],
      };
    });

    setPropretiesCategory(tmp);
    // const fetchPropertyCategory = async () => {
    //   const res = await callAdminCategoryDetail(categorySelect);
    //   if (res.data.code === 200) {
    // const tmp = res.data?.productCategory?.properties?.map((item) => {
    //   return {
    //     [item]: "",
    //   };
    //     });
    //     setPropretiesCategory(tmp);
    //   }
    // };
    // fetchPropertyCategory();
  }, [dataDetail?.properties]);
  //change status
  const [valueStatus, setValueStatus] = useState("");
  const onChangeStatus = (e) => {
    setValueStatus(e.target.value);
  };
  const [valueFeature, setValueFeature] = useState("");
  const onChangeFeature = (e) => {
    setValueFeature(e.target.value);
  };

  //lấy lại dữ liệu cũ
  const [initForm, setInitForm] = useState({});

  useEffect(() => {
    if (dataDetail?._id) {
      const arrImages = dataDetail?.images?.map((item) => {
        return {
          uid: uuidv4(),
          name: item,
          status: "done",
          url: item,
        };
      });
      const init = {
        images: { fileList: arrImages },
        title: dataDetail?.title,
        description: dataDetail?.description,
        category: dataDetail?.productCategoryTitle,
        discountPercent: dataDetail?.discountPercent,
        status: dataDetail?.status,
        feature: dataDetail?.featured,
      };
      setInitForm(init);
      setValueQuill(init.description);
      setPropretiesCategory(dataDetail?.properties);
      setDataSlider(arrImages);
      setValueFeature(dataDetail?.featured);
      setValueStatus(dataDetail?.status);
      //   setDataTableChild(dataDetail?.newGroup);
      form.setFieldsValue(init);
    }
    return () => {
      form.resetFields();
    };
  }, [
    dataDetail?._id,
    dataDetail?.description,
    dataDetail?.discountPercent,
    dataDetail?.featured,
    dataDetail?.images,
    dataDetail?.newGroup,
    dataDetail?.productCategoryTitle,
    dataDetail?.properties,
    dataDetail?.status,
    dataDetail?.title,
    form,
  ]);
  const [oldChildProduct, setOldChildProduct] = useState([]);
  useEffect(() => {
    const tmp = dataDetail?.newGroup?.map((item) => {
      return Object.fromEntries(Object.entries(item).slice(0, -1));
    });
    setOldChildProduct(tmp);
  }, [dataDetail?.newGroup]);
  const onFinish = async (values) => {
    const images = dataSlider.map((i) => i.name);

    const newArr = oldChildProduct?.map((item, index) => {
      //   console.log(item);
      const key = Object.keys(item);
      const tmp = key.map((item2, index2) => {
        return {
          [item2]: values[`${index}${index2}`] || item[item2],
        };
      });
      let resultObject = Object.assign({}, ...tmp);
      return resultObject;
    });

    const data = {
      title: values.title || dataDetail?._id,
      productCategoryId: categorySelect || dataDetail?.productCategoryId,
      description: valueQuill || dataDetail?.description,
      images: images,
      discountPercent: values.discountPercent,
      group: [...newArr, ...dataTableChild],
      featured: valueFeature,
      status: valueStatus,
      properties: propertiesCategory.map((item) => {
        const key = Object.keys(item)[0];
        return {
          [key]: values[key] || item[key],
        };
      }),
    };
    const res = await callUpdateProduct(dataDetail?._id, data);

    if (res.data.newProduct) {
      message.success("Update sản phẩm thành công");
      fetchProduct();
      setOpenModalUpdate(false);
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
      title="Update Product"
      open={openModalUpdate}
      maskClosable={false}
      onCancel={() => {
        setOpenModalUpdate(false);
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
        <Form.Item
          name={`images`}
          labelCol={{ span: 24 }}
          label="Hình ảnh sản phẩm :"
        >
          <div className="my-4">
            <Upload
              customRequest={handleUploadFileSlider}
              listType="picture-card"
              onPreview={handlePreviewSlider}
              onChange={handleChangeSlider}
              onRemove={(file) => handleRemoveFile(file, "slider")}
              defaultFileList={initForm?.images?.fileList ?? []}
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

        {propertiesCategory?.length > 0 &&
          propertiesCategory.map((item, index) => {
            const key = Object.keys(item);
            return (
              //   <></>
              <Form.Item key={index} label={key[0]} name={key[0]}>
                <Input defaultValue={item[key[0]]} />
              </Form.Item>
            );
          })}
        <Form.Item
          labelCol={{ span: 24 }}
          label="Description"
          name="description"
        >
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

        <Form.Item
          labelCol={{ span: 24 }} //whole column
          label="Phân loại sản phẩm cũ"
          name="oldGroup"
        >
          {oldChildProduct?.length > 0 &&
            oldChildProduct?.map((item, index) => {
              const key = Object.keys(item);
              return (
                <div key={index} className="flex gap-4">
                  {key.map((item2, index2) => {
                    if (index2 === 0) {
                      return (
                        <Form.Item
                          key={index2}
                          label={item2}
                          name={`${index}${index2}`}
                        >
                          <Input defaultValue={item[item2]} />
                        </Form.Item>
                      );
                    }
                    return (
                      <Form.Item
                        key={index2}
                        label={item2}
                        name={`${index}${index2}`}
                      >
                        <InputNumber defaultValue={item[item2]} />
                      </Form.Item>
                    );
                  })}
                </div>
              );
            })}
        </Form.Item>

        <Form.Item label="Thêm phân loại hàng" labelCol={{ span: 24 }}>
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
          <Button htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateProduct;
