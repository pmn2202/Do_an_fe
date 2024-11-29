/* eslint-disable react/prop-types */

import { Form, InputNumber } from "antd";
import { useEffect } from "react";

const TableAddProduct = ({
  productChildren,
  dataTableChild,
  setDataTableChild,
}) => {
  const data = productChildren?.items;

  useEffect(() => {
    let result = [];
    if (data?.[0]) {
      for (let i = 0; i < data[0]?.list?.length; i++) {
        if (data[1]?.list) {
          for (let j = 0; j < data[1]?.list?.length; j++) {
            result.push({
              childTitle: `${data[0]?.list[i]?.first}-${data[1]?.list[j]?.first}`,
              price: 0,
              quantity: 0,
              stock: 0,
            });
          }
        } else {
          result.push({
            childTitle: `${data[0]?.list[i]?.first}`,
          });
        }
      }
      setDataTableChild(result);
    }
  }, [data]);

  // console.log(result);
  const handleChangeInput = (e, type, id) => {
    const newDataTableChild = dataTableChild?.map((item) => {
      if (item.childTitle === id) {
        item[type] = e;
        return item;
      } else {
        return item;
      }
    });
    setDataTableChild(newDataTableChild);
  };

  if (!data) return null;
  return (
    <div className="relative w-full overflow-x-auto">
      <div className="flex justify-between w-full text-sm text-gray-500">
        <div className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <div
            className={`grid ${data[1]?.list ? "grid-cols-5" : "grid-cols-4"}`}
          >
            {data?.map((item, index) => {
              return (
                <div key={index} className="col-span-1 px-6 py-3 ">
                  {item?.name}
                </div>
              );
            })}
            <div className="col-span-1 px-6 py-3 ">Giá</div>
            <div className="col-span-1 px-6 py-3 ">Số lượng</div>
            <div className="col-span-1 px-6 py-3 ">Còn lại</div>
          </div>
        </div>
      </div>
      <Form
        className="w-full"
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="">
          {data[0]?.list?.map((item, index) => {
            return (
              <div
                key={index}
                className={`grid  border-b ${
                  data[1]?.list ? "grid-cols-5" : "grid-cols-4"
                }`}
              >
                <div className="col-span-1 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item?.first}
                </div>
                <div
                  className={`grid   gap-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ${
                    data[1]?.list
                      ? "grid-cols-4 col-span-4"
                      : "grid-cols-3 col-span-3"
                  }`}
                >
                  {data[1]?.list?.map((item2, index2) => {
                    return (
                      <div
                        key={index2}
                        className="grid grid-cols-4 col-span-4 gap-2 "
                      >
                        <div className="w-[calc(1/4 - 16px)] col-span-1">
                          {item2?.first}
                        </div>
                        <div className="w-[calc(1/4 - 16px)] col-span-1 ">
                          <InputNumber
                            onChange={(e) =>
                              handleChangeInput(
                                e,
                                "price",
                                item?.first + "-" + item2?.first
                              )
                            }
                          />
                        </div>
                        <div className="w-[calc(1/4 - 16px)] col-span-1 ">
                          <InputNumber
                            onChange={(e) =>
                              handleChangeInput(
                                e,
                                "quantity",
                                item?.first + "-" + item2?.first
                              )
                            }
                          />
                        </div>
                        <div className="w-[calc(1/4 - 16px)] col-span-1 ">
                          <InputNumber
                            onChange={(e) =>
                              handleChangeInput(
                                e,
                                "stock",
                                item?.first + "-" + item2?.first
                              )
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                  {!data[1]?.list && (
                    <div className="grid grid-cols-3 col-span-4">
                      <div className="w-[calc(1/3 - 16px)] col-span-1 ">
                        <InputNumber
                          onChange={(e) =>
                            handleChangeInput(e, "price", item?.first)
                          }
                        />
                      </div>
                      <div className="w-[calc(1/3 - 16px)] col-span-1 ">
                        <InputNumber
                          onChange={(e) =>
                            handleChangeInput(e, "quantity", item?.first)
                          }
                        />
                      </div>
                      <div className="w-[calc(1/3 - 16px)] col-span-1 ">
                        <InputNumber
                          onChange={(e) =>
                            handleChangeInput(e, "stock", item?.first)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Form>
    </div>
  );
};

export default TableAddProduct;
