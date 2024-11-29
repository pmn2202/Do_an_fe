/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import AsideFilter from "../../components/productList/AsideFilter";
import AllProduct from "../../components/productList/AllProduct";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callGetHomeProduct } from "../../services/productApi";
import { Helmet } from "react-helmet";

const ProductList = () => {
  //id category

  const params = useParams();
  const id = params.id;
  const [categories, setCategories] = useState([]);
  const [cate, setCate] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortkey, setSortKey] = useState("rate");
  const [sortValue, setSortValue] = useState("desc");
  const fetchHomeData = async () => {
    const res = await callGetHomeProduct();
    if (res.status === 200) {
      setCategories(res.data.productCategorys);
    }
  };
  useEffect(() => {
    fetchHomeData();
  }, []);
  useEffect(() => {
    const cateChildren = categories.filter((item) => {
      return item.parentId === id;
    });
    setCate(cateChildren);
  }, [categories, id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [filter, setFilter] = useState(
    `&categoryParent=${id}&page=${current}&limit=${pageSize}&sortKey=${sortkey}&sortValue=${sortValue}`
  );
  const [filterAside, setFilterAside] = useState("");
  const [filterName, setFilterName] = useState("");
  useEffect(() => {
    setFilter(
      filterAside +
        filterName +
        `&categoryParent=${id}&page=${current}&limit=${pageSize}`
    );
  }, [current, filterAside, filterName, pageSize, sortValue, sortkey]);

  return (
    <div className="container my-8">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Tìm kiếm sản phẩm</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={5}>
          <AsideFilter
            setCurrent={setCurrent}
            cate={cate}
            setFilterAside={setFilterAside}
          />
        </Col>
        <Col span={19}>
          <AllProduct
            sortValue={sortValue}
            sortkey={sortkey}
            setSortKey={setSortKey}
            setSortValue={setSortValue}
            current={current}
            setCurrent={setCurrent}
            pageSize={pageSize}
            setPageSize={setPageSize}
            filter={filter}
            setFilterName={setFilterName}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
