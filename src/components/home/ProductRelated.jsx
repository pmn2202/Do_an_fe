/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Col, Row } from "antd";
import SuggestProduct from "../product/SuggestProduct";

const ProductRelated = ({
  productsBestSellers,
  productBestRate,
  productFeatureds,
}) => {
  return (
    <Row
      gutter={[20, 20]}
      style={{
        marginBlock: "72px",
      }}
    >
      <Col span={6}>
        <SuggestProduct
          data={productFeatureds}
          label="PRODUCT FEATUREDS"
        ></SuggestProduct>
      </Col>
      <Col span={6}>
        <SuggestProduct
          data={productsBestSellers}
          label="BEST SELLERS"
        ></SuggestProduct>
      </Col>
      <Col span={6}>
        <SuggestProduct
          data={productBestRate}
          label="TOP RATED"
        ></SuggestProduct>
      </Col>
      <Col span={6}>
        <SuggestProduct
          data={productsBestSellers}
          label="NEW ARRIVAL"
        ></SuggestProduct>
      </Col>
    </Row>
  );
};

export default ProductRelated;
