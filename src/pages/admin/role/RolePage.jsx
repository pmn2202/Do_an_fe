/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { callDeleteRoles, callGetAllRoles } from "../../../services/adminApi";
import { Button, Popconfirm, Table, message } from "antd";
import { MdDelete } from "react-icons/md";
import ModalAddRole from "./ModalAddRole";
import { EditFilled, EyeFilled } from "@ant-design/icons";
import DetailRole from "./DetailRole";
import ModalUpdate from "./ModalUpdate";
import { Helmet } from "react-helmet";

const RolePage = () => {
  const [listRole, setListRole] = useState([]);
  const fetchRole = async () => {
    const res = await callGetAllRoles();
    if (res.data.code === 400) {
      message.error(res.data.message);
      return;
    }
    if (res.data.roles) {
      setListRole(res.data.roles);
    }
  };
  useEffect(() => {
    fetchRole();
  }, []);
  //   console.log(listRole);

  const handleDeleteRole = async (id) => {
    const res = await callDeleteRoles(id);
    if (res.data.code === 200) {
      message.success(res.data.message);
      fetchRole();
    }
  };
  const [openAddRole, setOpenAddRole] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});

  const columns = [
    {
      title: "Id",
      render: (text, record, index) => {
        return <span title={record.id}>{record.id.slice(0, 3)}...</span>;
      },
    },
    {
      title: "Nhóm quyền",
      render: (text, record, index) => {
        return <span>{record.title}</span>;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      render: (text, record, index) => {
        return (
          //   <></>
          <div style={{ display: "flex", gap: "5px" }}>
            <Popconfirm
              placement="leftTop"
              title="Xác nhận xóa khỏi nhóm quyền"
              description="Bạn có chắc chắn muốn xóa nhóm quyền này ? "
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ type: "default" }}
              onConfirm={() => handleDeleteRole(record.id)}
            >
              <Button>
                <MdDelete color="red"></MdDelete>
              </Button>
            </Popconfirm>

            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setDataDetail(record);
                setOpenDetail(true);
              }}
            >
              <EyeFilled />
            </Button>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setOpenEdit(true);
                setDataDetail(record);
              }}
            >
              <EditFilled />
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
        <title>Quản lí phân quyền</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <div className="flex items-center justify-between mb-10">
        <span className="uppercase">Roles</span>
        <Button onClick={() => setOpenAddRole(true)}>Add New Role</Button>
      </div>
      <Table dataSource={listRole} columns={columns} />
      <ModalAddRole
        fetchRole={fetchRole}
        openAddRole={openAddRole}
        setOpenAddRole={setOpenAddRole}
      ></ModalAddRole>
      <DetailRole
        openDetail={openDetail}
        dataDetail={dataDetail}
        setOpenDetail={setOpenDetail}
      />
      <ModalUpdate
        setDataDetail={setDataDetail}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        dataDetail={dataDetail}
        fetchRole={fetchRole}
      />
    </div>
  );
};

export default RolePage;
