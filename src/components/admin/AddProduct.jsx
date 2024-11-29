import { useState } from "react";
import { Upload } from "antd";
import SubCategory from "../Header/components/SubCategory";
const AddProduct = () => {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const [category, setCategory] = useState("");
//   const [phanLoai, setPhanLoai] = useState([]);
  const [quantityInput, setQuantityInput] = useState(1);
  const handleClick = () => {
    setQuantityInput((prev) => prev + 1);
  };
  const handleDelete = () => {
    setQuantityInput((prev) => prev - 1);
  };
  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && "+ Upload"}
      </Upload>

      <div>
        {category}
        <SubCategory setCategory={setCategory}></SubCategory>
      </div>

      <div className="flex flex-col gap-3">
        {Array(quantityInput)
          .fill(0)
          .map((item, index) => (
            <>
              <input
                type="text"
                key={index}
                className="border border-red-200"
              />
              <button onClick={() => handleDelete()}>-</button>
            </>
          ))}

        <button onClick={() => handleClick()}>+</button>
      </div>
    </>
  );
};

export default AddProduct;
