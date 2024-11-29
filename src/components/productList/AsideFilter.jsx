/* eslint-disable react/prop-types */
import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import { Checkbox, Col, Divider, Form, InputNumber, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import Button from "../Button/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const AsideFilter = ({ setFilterAside, cate, setCurrent }) => {
  const { t } = useTranslation();
  const [category, setCategory] = useState([]);
  const [form] = useForm();
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const onFinish = (values) => {
    const data = {
      ...values,
      rate: ratingFilter,
    };
    if (values?.range?.from >= 0 && values?.range?.to >= 0) {
      let f = `&minPrice=${values?.range?.from}&maxPrice=${values?.range?.to}`;
      setPriceFilter(
        `&minPrice=${values?.range?.from}&maxPrice=${values?.range?.to}`
      );
      if (values?.category?.length) {
        const cate = values?.category?.join(",");
        f += `&categoryChild=${cate}`;
      }
      if (ratingFilter) {
        f = f + `&rate=${data.rate}`;
      }
      setCurrent(1);
      setFilterAside(f);
    }
  };
  const handleChangeFilter = (changedValues, values) => {
    // console.log(values);
    // cái chages là cái thay đổi mỗi lần bấm
    //còn value là cacs cái còn được tik và giá tiền được nhập => phải lấy được cái gt cate ra và convert sang string nối qua dấu , => join
    // console.log(values);
    if (changedValues.category) {
      //chỉ khi cate của change thay đổi
      const cate = values.category;
      setCategory(cate);
      if (cate && cate.length > 0) {
        let f = cate.join(",");
        if (priceFilter) {
          f += priceFilter;
        }
        if (ratingFilter) {
          f += `&rate=${ratingFilter}`;
        }
        setCurrent(1);
        setFilterAside(`&categoryChild=${f}`);
      } else {
        setCurrent(1);
        setFilterAside("");
      }
    }
  };
  const handleFilterStar = (rating) => {
    const ratingString = rating.toString();
    setRatingFilter(ratingString);
    let f = `&rate=${ratingString}`;
    if (priceFilter) {
      f += priceFilter;
    }
    if (category && category.length > 0) {
      const cateF = category.join(",");
      f += `&categoryChild=${cateF}`;
    }
    setCurrent(1);
    setFilterAside(f);
  };
  const handleResetForm = () => {
    form.resetFields();
    setPriceFilter("");
    setRatingFilter("");
    setCategory([]);
    setFilterAside("");
    setCurrent(1);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: 5,
        border: "1px solid #ccc",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <FilterTwoTone /> {t("aside filter.Filter Search")}
        </span>
        <ReloadOutlined title="Reset" onClick={() => handleResetForm()} />
      </div>
      <Form
        onFinish={onFinish}
        form={form}
        onValuesChange={(changedValues, values) =>
          handleChangeFilter(changedValues, values)
        }
      >
        <Form.Item
          name="category"
          label={t("aside filter.all categories")}
          labelCol={{ span: 24 }}
        >
          <Checkbox.Group>
            <Row>
              {cate &&
                cate.map((item, index) => {
                  return (
                    <Col span={24} key={index} style={{ paddingBlock: "5px" }}>
                      <Checkbox value={item._id}>{item.title}</Checkbox>
                    </Col>
                  );
                })}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Divider />
        <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Form.Item name={["range", "from"]}>
              <InputNumber
                name="from"
                min={0}
                placeholder="đ TỪ"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
            <span>-</span>
            <Form.Item name={["range", "to"]}>
              <InputNumber
                name="to"
                min={0}
                placeholder="đ ĐẾN"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </div>
          <Divider />
          <Form.Item name="rate" label="Đánh giá" labelCol={{ span: 24 }}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <li className="py-1 pl-2" name="rate" key={index}>
                  <div
                    aria-hidden
                    className="flex items-center text-sm cursor-pointer"
                    tabIndex={0}
                    role="button"
                    onClick={() => handleFilterStar(5 - index)}
                  >
                    {Array(5)
                      .fill(0)
                      .map((_, indexStar) => {
                        if (indexStar < 5 - index) {
                          return (
                            <svg
                              viewBox="0 0 9.5 8"
                              className="w-4 h-4 mr-1"
                              key={indexStar}
                            >
                              <defs>
                                <linearGradient
                                  id="ratingStarGradient"
                                  x1="50%"
                                  x2="50%"
                                  y1="0%"
                                  y2="100%"
                                >
                                  <stop offset={0} stopColor="#ffca11" />
                                  <stop offset={1} stopColor="#ffad27" />
                                </linearGradient>
                                <polygon
                                  id="ratingStar"
                                  points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                                />
                              </defs>
                              <g
                                fill="url(#ratingStarGradient)"
                                fillRule="evenodd"
                                stroke="none"
                                strokeWidth={1}
                              >
                                <g transform="translate(-876 -1270)">
                                  <g transform="translate(155 992)">
                                    <g transform="translate(600 29)">
                                      <g transform="translate(10 239)">
                                        <g transform="translate(101 10)">
                                          <use
                                            stroke="#ffa727"
                                            strokeWidth=".5"
                                            xlinkHref="#ratingStar"
                                          />
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          );
                        }
                        return (
                          <svg
                            viewBox="0 0 30 30"
                            className="w-4 h-4 mr-1"
                            key={indexStar}
                          >
                            <defs>
                              <linearGradient
                                id="star__hollow"
                                x1="50%"
                                x2="50%"
                                y1="0%"
                                y2="99.0177926%"
                              >
                                <stop offset="0%" stopColor="#FFD211" />
                                <stop offset="100%" stopColor="#FFAD27" />
                              </linearGradient>
                            </defs>
                            <path
                              fill="none"
                              fillRule="evenodd"
                              stroke="url(#star__hollow)"
                              strokeWidth={2}
                              d="M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"
                            />
                          </svg>
                        );
                      })}
                    {index !== 0 && <span>trở lên</span>}
                  </div>
                </li>
              ))}
          </Form.Item>
          <div>
            <Button
              onClick={() => form.submit()}
              style={{ width: "100%" }}
              type="primary"
            >
              Áp dụng
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AsideFilter;
