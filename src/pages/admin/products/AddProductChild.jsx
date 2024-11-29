/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import { useEffect } from "react";

const AddProductChild = ({
  productChildren,
  setProductChildren,
  formAddChild,
}) => {
  // const [form] = Form.useForm();

  return (
    <Form
      form={formAddChild}
      name="dynamic_form_complex"
      style={{
        maxWidth: "100%",
      }}
      autoComplete="off"
      initialValues={{
        items: [{}],
      }}
      onChange={() => {
        setProductChildren(formAddChild.getFieldsValue());
      }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => {
          return (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Nhóm phân loại  ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                        setProductChildren(formAddChild.getFieldsValue());
                      }}
                    />
                  }
                >
                  <Form.Item label="Name" name={[field.name, "name"]}>
                    <Input placeholder="ví dụ: màu sắc v.v" />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Phân loại hàng">
                    <Form.List name={[field.name, "list"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item
                                noStyle
                                name={[subField.name, "first"]}
                              >
                                <Input placeholder="ví dụ: Trắng ..." />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                  setProductChildren(formAddChild.getFieldsValue());
                                }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Add Sub Item
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}
              {productChildren?.items?.length < 2 && (
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  + Add Item
                </Button>
              )}
            </div>
          );
        }}
      </Form.List>
    </Form>
  );
};
export default AddProductChild;
