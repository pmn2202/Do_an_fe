/* eslint-disable no-unused-vars */
import { EditOutlined } from "@ant-design/icons";
import { Badge, Button, Input, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import CreateCategory from "./CreateCategory";
import CategoryDetail from "./CategoryDetail";
import { SearchOutlined } from "@ant-design/icons";
import {
  callAdminCategoryDetail,
  callAdminDeleteCategory,
  callAllCategory,
} from "../../../services/adminApi";
import ModalUpdateCate from "./ModalUpdateCate";

import moment from "moment";
import { Helmet } from "react-helmet";

const CategoriesPage = () => {
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const fetchHomeData = async () => {
    const res = await callAllCategory();
    if (res.status === 200) {
      setData(res.data.productCategory);
    }
    if (res?.data?.code === 400) {
      message.error(res?.data?.message);
    }
  };
  useEffect(() => {
    fetchHomeData();
  }, []);

  const [searchedColumn, setSearchedColumn] = useState("");
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="default"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const [openDetail, setOpenDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [idDetail, setIdDetail] = useState();
  const handleDeleteCategory = async (id) => {
    const res = await callAdminDeleteCategory(id);
    if (res.data.code === 200) {
      message.success("Xóa Thành công ");
      const res = await callAllCategory();
      if (res.status === 200) {
        setData(res.data.productCategory);
      }
      if (res?.data?.code === 400) {
        message.error(res?.data?.message);
      }
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record, index) => {
        return (
          <a
            onClick={async () => {
              const res = await callAdminCategoryDetail(record.id);
              setDataDetail(res.data.productCategory);
              setOpenDetail(true);
            }}
          >
            {record.title}
          </a>
        );
      },
      ...getColumnSearchProps("title"),
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <Popconfirm
              placement="leftTop"
              title="Xác nhận xóa category này"
              description="Bạn có chắc chắn muốn xóa category này ? "
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ type: "default" }}
              onConfirm={() => handleDeleteCategory(record.id)}
            >
              <Button>
                <MdDelete color="red"></MdDelete>
              </Button>
            </Popconfirm>

            <Button
              onClick={async () => {
                // console.log(record);
                const res = await callAdminCategoryDetail(record.id);
                // console.log(record.id);
                // console.log(res);
                setIdDetail(record.id);
                setDataDetail(res.data.productCategory);
                setOpenUpdateCategory(true);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EditOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  return (
    <>
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Quản lí danh mục sản phẩm</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-10">
          <span className="uppercase">categories</span>
          <Button onClick={() => setOpenCreateCategory(true)}>
            Add New Category
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
        <CreateCategory
          data={data}
          setData={setData}
          openCreateCategory={openCreateCategory}
          setOpenCreateCategory={setOpenCreateCategory}
        />
      </div>
      <CategoryDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      ></CategoryDetail>
      <ModalUpdateCate
        data={data}
        setData={setData}
        idDetail={idDetail}
        setIdDetail={setIdDetail}
        openUpdateCategory={openUpdateCategory}
        setOpenUpdateCategory={setOpenUpdateCategory}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
      ></ModalUpdateCate>
    </>
  );
};

export default CategoriesPage;
