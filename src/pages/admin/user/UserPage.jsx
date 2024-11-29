/* eslint-disable no-unused-vars */
import { EditFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, message } from "antd";
import { MdDelete } from "react-icons/md";
import {
  callDeleteAccount,
  callGetAllAccount,
} from "../../../services/adminApi";
import { useEffect, useState } from "react";
import ModalUserDetail from "./ModalUserDetail";
import UpdateUser from "./UpdateUser";
import { Helmet } from "react-helmet";

const UserPage = () => {
  const [dataDetail, setDataDetail] = useState({});
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [listAccount, setListAccount] = useState([]);
  const fetchAccount = async () => {
    const res = await callGetAllAccount();
    if (res.data.code === 400) {
      message.error(res.data.message);
    }
    if (res.data.listAccount) {
      setListAccount(res.data.listAccount);
    }
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  const dataSource = listAccount;

  const handleDeleteAccount = async (id) => {
    const res = await callDeleteAccount(id);
    if (res.data.code === 200) {
      message.success("Xóa người dùng thành công");
      const res2 = await callGetAllAccount();
      if (res2.data.listAccount) {
        setListAccount(res2.data.listAccount);
      }
    } else {
      message.error(res.data.message);
    }
  };

  const columns = [
    {
      title: "Id",
      width: "15px",
      render: (text, record, index) => {
        return (
          <a
            onClick={() => {
              setDataDetail(record);
              setOpenViewDetail(true);
            }}
            title={record.id}
          >
            {record.id.slice(0, 5)}...
          </a>
        );
      },
    },
    {
      title: "Họ và tên",
      render: (text, record, index) => {
        return <span>{record.fullName}</span>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Role",
      key: "role",
      render: (text, record, index) => {
        return <span>{record.role.title}</span>;
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record, index) => {
        return <span>{record.status}</span>;
      },
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <Popconfirm
              placement="leftTop"
              title="Xác nhận xóa khỏi danh sách yêu thích"
              description="Bạn có chắc chắn muốn xóa sản phẩm này ? "
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ type: "default" }}
              onConfirm={() => handleDeleteAccount(record.id)}
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
                setOpenCreateUser(true);
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
        <title>Quản lí người dùng</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <div className="flex items-center justify-between mb-10">
        <span className="uppercase">User</span>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <ModalUserDetail
        openViewDetail={openViewDetail}
        dataDetail={dataDetail}
        setOpenViewDetail={setOpenViewDetail}
      ></ModalUserDetail>
      <UpdateUser
        fetchAccount={fetchAccount}
        setDataDetail={setDataDetail}
        dataDetail={dataDetail}
        openCreateUser={openCreateUser}
        setOpenCreateUser={setOpenCreateUser}
      ></UpdateUser>
    </div>
  );
};

export default UserPage;
