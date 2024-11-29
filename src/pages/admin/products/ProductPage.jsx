/* eslint-disable no-unused-vars */
import { Button, Pagination, Popconfirm, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalViewDetail from "./ModalViewDetail";
import ModalAddProduct from "./ModalAddProduct";
import {
  callDeleteProduct,
  callGetAllProductAdmin,
} from "../../../services/adminApi";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  const [listProduct, setListProduct] = useState([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [isOpenAddNewProduct, setIsOpenAddNewProduct] = useState(false);
  const fetchProduct = async () => {
    const res = await callGetAllProductAdmin();
    if (res.data.listProducts) {
      setListProduct(res.data.listProducts);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const handleDeleteProduct = async (id) => {
    const res = await callDeleteProduct(id);
    if (res.data.code === 200) {
      fetchProduct();
      message.success("Xóa sảm phẩm thành công");
    }
  };
  //update
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  // const [dataDetail, setDataDetail] = useState({});
  const dataSource = listProduct;
  const columns = [
    {
      title: "Sản phẩm",
      width: "30%",
      render: (text, record, index) => {
        return (
          <div className="flex items-center w-full gap-4">
            <img
              className="w-[100px] h-[100px] object-cover"
              src={
                record.images[0] ||
                "https://plus.unsplash.com/premium_photo-1700567963303-1b83673c52a4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
            />
            <span
              onClick={() => {
                setIsOpenDetail(true);
                setDataDetail(record);
              }}
              className="text-sm font-normal leading-5 text-gray-700 cursor-pointer line-clamp-1"
            >
              {record.title}
            </span>
          </div>
        );
      },
    },
    {
      title: "Phân loại",
      dataIndex: "productCategoryTitle",
      key: "category",
    },
    {
      title: "Đã bán",
      dataIndex: "buyed",
      key: "buyed",
    },
    {
      title: "Giá",
      dataIndex: "minPrice",
      key: "price",
    },
    {
      title: "Sao",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Discount (%)",
      dataIndex: "discountPercent",
      key: "rate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      render: (text, record, index) => {
        console.log(record)
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <Popconfirm
              placement="leftTop"
              title="Xác nhận xóa khỏi danh sách yêu thích"
              description="Bạn có chắc chắn muốn xóa sản phẩm này ? "
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ type: "default" }}
              onConfirm={() => handleDeleteProduct(record._id)}
            >
              <Button>
                <MdDelete color="red"></MdDelete>
              </Button>
            </Popconfirm>

            <Button
              onClick={() => {
                setDataDetail(record);
                setOpenModalUpdate(true);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaEdit />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Quản lí sản phẩm</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <div className="flex items-center justify-between mb-10">
        <span className="uppercase">Products</span>
        <Button onClick={() => setIsOpenAddNewProduct(true)}>
          Add New Product
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total: listProduct.length,
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      <ModalUpdateProduct
        fetchProduct={fetchProduct}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
      ></ModalUpdateProduct>
      <ModalViewDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isOpenDetail={isOpenDetail}
        setIsOpenDetail={setIsOpenDetail}
      />
      <ModalAddProduct
        fetchProduct={fetchProduct}
        isOpenAddNewProduct={isOpenAddNewProduct}
        setIsOpenAddNewProduct={setIsOpenAddNewProduct}
      />
    </div>
  );
};

export default ProductPage;
