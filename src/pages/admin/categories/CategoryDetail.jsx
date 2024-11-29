/* eslint-disable react/prop-types */

import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment/moment";

const CategoryDetail = (props) => {
  const { dataDetail, openDetail, setOpenDetail } = props;

  return (
    <Drawer
      title={`Thông tin chi tiết category = ${dataDetail?.title}`}
      width="50vw"
      placement="right"
      onClose={() => setOpenDetail(false)}
      open={openDetail}
    >
      <Descriptions title="Thông tin chi tiết" bordered column={2}>
        <Descriptions.Item label="Image" span={2}>
          <img
            src={
              dataDetail?.image ||
              "https://tse2.mm.bing.net/th?id=OIP.daEyoZ1lIjFm8k6jKAU6hwHaEo&pid=Api&P=0&h=220"
            }
            alt=""
          />
        </Descriptions.Item>
        {/* <Descriptions.Item label="Id">{dataDetail?.id}</Descriptions.Item> */}
        {dataDetail?.parentName && (
          <Descriptions.Item label="parentName">
            {dataDetail.parentName}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Tên">{dataDetail?.title}</Descriptions.Item>
        <Descriptions.Item label="Mô tả">
          {dataDetail?.description}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          <Badge status="processing" text={dataDetail?.status}></Badge>
        </Descriptions.Item>
        <Descriptions.Item label="Created at">
          {moment(dataDetail?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Update at">
          {moment(dataDetail?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Created By">
          {dataDetail?.createdBy?.accountName}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default CategoryDetail;
