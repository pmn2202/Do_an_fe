/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { SearchIcon } from "../../utils/icons";
import { Pagination, Select } from "antd";
import Product from "../product/Product";
import { callGetProducts } from "../../services/productApi";

const AllProduct = ({
  setFilterName,
  current,
  setCurrent,
  pageSize,
  setPageSize,
  filter,
  setSortKey,
  setSortValue,
  sortValue,
  sortkey,
}) => {
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const handleChange = (value) => {
    setSortKey(value);
    let f = ``;
    f += `&sortKey=${value}`;
    if (search) {
      f += `&search=${search}`;
    }
    if (sortValue) {
      f += `&sortValue=${sortValue}`;
    }
    setFilterName(f);
  };
  const handleChangeSortValues = (value) => {
    setSortValue(value);
    let f = ``;
    f += `&sortValue=${value}`;
    if (search) {
      f += `&search=${search}`;
    }
    if (sortkey) {
      f += `&sortKey=${sortkey}`;
    }
    setFilterName(f);
  };
  const handleChangeInput = (e) => {
    setSearch(e.target.value);
    let f = ``;
    f += `&search=${e.target.value}`;
    if (sortkey) {
      f += `&sortKey=${sortkey}`;
    }
    if (sortValue) {
      f += `&sortValue=${sortValue}`;
    }
    setFilterName(f);
  };
  const [productList, setProductList] = useState([]);
  const handleCallProducts = async () => {
    const filterProduct = filter?.slice(1);
    const res = await callGetProducts(filterProduct);

    setProductList(res.data.products);
    setTotal(res.data.countRecord);
  };
  const onChangePagi = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };
  useEffect(() => {
    handleCallProducts();
  }, [filter]);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="px-5 py-2 border border-gray-200 rounded-lg w-[50%] flex ">
          <input
            type="text"
            onChange={(e) => handleChangeInput(e)}
            placeholder="Search for any thing"
            className="w-full outline-none "
          />
          <SearchIcon></SearchIcon>
        </div>
        <div className="flex items-center gap-2">
          <span>Sort by : </span>
          <Select
            defaultValue="rate"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "createdAt",
                label: "Date",
              },
              {
                value: "rate",
                label: "Rate",
              },
              {
                value: "price",
                label: "Price",
              },
              {
                value: "buyed",
                label: "Buy",
              },
            ]}
          />
          <Select
            defaultValue="desc"
            style={{
              width: 120,
            }}
            onChange={handleChangeSortValues}
            options={[
              {
                value: "desc",
                label: "Giảm dần",
              },
              {
                value: "asc",
                label: "Tăng dần",
              },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-start gap-2 py-5">
        {productList &&
          productList.map((product, index) => (
            <div key={index} className="w-[calc(25%-8px)] h-[305px]">
              <Product product={product} star />
            </div>
          ))}
        {!productList && <div>Không có sản phẩn nào</div>}
      </div>
      <div className="flex items-center justify-center mt-[20px]">
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          responsive
          onChange={(p, s) => onChangePagi({ current: p, pageSize: s })}
        />
      </div>
    </>
  );
};

export default AllProduct;
