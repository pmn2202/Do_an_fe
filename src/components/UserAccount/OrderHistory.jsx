/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Select, Table } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { callOrderHistory, callUpdateOrder } from "../../services/cartApi";
import moment from "moment";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import { callAdminOrder } from "../../services/adminApi";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
const OrderHistory = () => {
  const token = useSelector((state) => state.account.token);
  const [orderHistory, setOrderHistory] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const isAdmin = pathname.includes("admin") ? true : false;
  const to = isAdmin ? "/admin/order" : "/orderhistory";
  const fetchOrderHistory = async () => {
    if (!isAdmin) {
      const res = await callOrderHistory();
      if (res.status === 200) {
        setOrderHistory(res.data?.historyPurchase?.reverse());
      }
    } else {
      const res = await callAdminOrder();
      if (res.status === 200) {
        setOrderHistory(res.data.listOrder);
      }
    }
  };
  useEffect(() => {
    fetchOrderHistory();
  }, []);
  const status = [
    {
      statusOrder: 0,
      des: "Chờ thanh toán",
    },
    {
      statusOrder: 1,
      des: "Vận chuyển",
    },
    {
      statusOrder: 2,
      des: "Chờ giao hàng",
    },
    {
      statusOrder: 3,
      des: "Hoàn thành",
    },
    {
      statusOrder: 4,
      des: "Đã hủy",
    },
  ];
  const paymentMethod = [
    {
      data: "tienmat",
      des: "Tiền mặt",
    },
    {
      data: "paypal",
      des: "PayPal",
    },
  ];
  //
  const dataSource = orderHistory;
  const [isEdit, setIsEdit] = useState(false);
  const [newStatus, setNewStatus] = useState();
  const handleChangeStatus = (value) => {
    setNewStatus(value);
  };
  const [idSelectUpdate, setIdSelectUpdate] = useState();
  const handleEdit = (id) => {
    setIsEdit(true);
    setIdSelectUpdate(id);
  };
  const handleSaveStatus = async (product) => {
    const data = {
      statusOrder: newStatus,
    };
    await callUpdateOrder(product.id, data);
    fetchOrderHistory();
  };
  const columns = [
    {
      title: "Tóm tắt đơn hàng",
      width: "20%",
      render: (text, record, index) => {
        const product = record.products.map(
          (item) => item?.inforProduct?.title
        );
        return (
          <JsonView enableClipboard={false} collapsed={false} src={product} />
        );
      },
    },
    {
      title: "Thông tin người mua",
      width: "30%",
      render: (text, record, index) => {
        return (
          <JsonView
            enableClipboard={false}
            collapsed={false}
            src={record.userInfo}
          />
        );
      },
    },
    {
      title: "Status",
      render: (text, record, index) => {
        return (
          <>
            {!isEdit && <span>{status[record.statusOrder].des}</span>}
            {isEdit && idSelectUpdate !== record.id && (
              <span>{status[record.statusOrder].des}</span>
            )}
            {isEdit && idSelectUpdate === record.id && (
              <Select
                defaultValue={status[record.statusOrder].des}
                style={{ width: 120 }}
                onChange={handleChangeStatus}
                options={status.map((item) => {
                  return {
                    value: item.statusOrder,
                    label: item.des,
                  };
                })}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Date",
      key: "date",
      render: (text, record, index) => {
        return <span>{moment(record.createdAt).format("DD-MM-YYYY")}</span>;
      },
    },
    {
      title: "Payment Method",
      render: (text, record, index) => {
        const tmp = paymentMethod.filter(
          (item) => item.data === record.paymentMethod
        );
        return <span>{tmp[0]?.des}</span>;
      },
    },
    {
      title: "Total",
      render: (text, record, index) => {
        const total = record.products.reduce((res, current) => {
          return res + current.totalPrice;
        }, 0);
        // const dis = total * (record?.discountDetail?.discountPercent / 100);
        // const discount = record.
        return <span>{total}</span>;
      },
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <div className="flex items-center justify-between gap-2">
            {!isEdit && <Link to={`${record.id}`}>Detail</Link>}
            {isAdmin && !isEdit && (
              <Button onClick={() => handleEdit(record.id)}>update</Button>
            )}
            {isEdit && idSelectUpdate !== record.id && (
              <Link to={`${record.id}`}>Detail</Link>
            )}
            {(isAdmin && !isEdit && idSelectUpdate !== record.id) ||
              !isEdit ||
              (idSelectUpdate !== record.id && (
                <Button onClick={() => handleEdit(record.id)}>update</Button>
              ))}
            {isAdmin && isEdit && idSelectUpdate === record.id && (
              <>
                <Button
                  onClick={() => {
                    handleSaveStatus(record);
                    setIsEdit(false);
                    setIdSelectUpdate();
                  }}
                >
                  save
                </Button>
                <Button
                  onClick={() => {
                    setIsEdit(false);
                    setIdSelectUpdate();
                  }}
                >
                  cancel
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div
      className={`container p-4 border border-gray-100 ${
        isAdmin ? "my-0" : "my-12"
      }`}
    >
      <Helmet>
        <title>Lịch sử mua hàng</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <span className="text-sm font-medium text-gray-900 uppercase ">
        Order history
      </span>
      <div className="mt-10">
        <Table dataSource={dataSource} columns={columns} pagination={true} />
      </div>
    </div>
  );
};

export default OrderHistory;
