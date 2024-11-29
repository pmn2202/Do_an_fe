/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment/moment";

const ModalUserDetail = (props) => {
  const { dataDetail, openViewDetail, setOpenViewDetail } = props;
  
  return (
    <Drawer
      title={`Thông tin chi tiết người dùng = ${dataDetail?.fullName}`}
      width="50vw"
      placement="right"
      onClose={() => setOpenViewDetail(false)}
      open={openViewDetail}
    >
      <Descriptions title="Thông tin chi tiết" bordered column={2}>
        <Descriptions.Item label="Avatar" span={2}>
          <img
            src={
              dataDetail?.avatar ||
              "https://tse2.mm.bing.net/th?id=OIP.daEyoZ1lIjFm8k6jKAU6hwHaEo&pid=Api&P=0&h=220"
            }
            className="object-cover w-20 h-20"
            alt=""
          />
        </Descriptions.Item>

        <Descriptions.Item label="email">{dataDetail.email}</Descriptions.Item>

        <Descriptions.Item label="Số điện thoại">
          {dataDetail?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Rank">{dataDetail?.rank}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={2}>
          <Badge status="processing" text={dataDetail?.status}></Badge>
        </Descriptions.Item>
        <Descriptions.Item label="Role" span={2}>
          {dataDetail?.role?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Danh Sách Quyền">
          <div className="flex flex-col gap-1">
            {dataDetail?.role?.permissions?.map((item, index) => {
              return <span key={index}>{item}</span>;
            })}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ModalUserDetail;
