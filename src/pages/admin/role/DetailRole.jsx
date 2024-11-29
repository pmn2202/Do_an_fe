/* eslint-disable react/prop-types */
import { Descriptions, Drawer } from "antd";
import moment from "moment";

const DetailRole = ({ openDetail, setOpenDetail, dataDetail }) => {

  return (
    <Drawer
      title={`Thông tin chi tiết role = ${dataDetail?.title}`}
      width="50vw"
      placement="right"
      onClose={() => setOpenDetail(false)}
      open={openDetail}
    >
      <Descriptions title="Thông tin chi tiết" bordered column={2}>
        <Descriptions.Item label="Tên" span={2}>
          {dataDetail?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả" span={2}>
          {dataDetail?.description}
        </Descriptions.Item>

        <Descriptions.Item label="Danh Sách Quyền" span={2}>
          <div className="flex flex-col gap-1">
            {dataDetail?.permissions?.map((item, index) => {
              return <span key={index}>{item}</span>;
            })}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian tạo" span={2}>
          {moment(dataDetail?.createdAt).format("DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian sửa" span={2}>
          {moment(dataDetail?.updatedAt).format("DD-MM-YYYY")}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default DetailRole;
