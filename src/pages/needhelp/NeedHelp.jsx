import { Col, Row } from "antd";

const NeedHelp = () => {
  return (
    <div className="container my-12">
      <Row gutter={[20, 20]}>
        <Col span={18}>
          <span className="text-gray-900 font-semibold text-[40px] leading-10">
            Frequently Asked Questions{" "}
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default NeedHelp;
