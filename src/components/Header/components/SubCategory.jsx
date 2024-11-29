/* eslint-disable react/prop-types */
import { Menu } from "antd";
// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }
// const result = Array(4)
//   .fill(0)
//   .map((index) => getItem("Option 1", index));
// const items = [
//   getItem("máy tính", "sub1", null, [
//     getItem(
//       "Item 1",
//       "a",
//       null,
//       // [getItem("Option 1", "1"), getItem("Option 2", "2")],
//       result
//       // {Array(10).fill(0).map((_, _) => {
//       //   return [getItem("Option 1", "1")]
//       // })},
//       // "group"
//     ),
//     getItem(
//       "Item 2",
//       null,
//       null,
//       [getItem("Option 3", 3), getItem("Option 4", "4")],
//       "group"
//     ),
//   ]),
//   getItem("Navigation Two", "sub2", null, [
//     getItem("vOption 5Option 5Option 5Option 5Option 5Option 5Option 5", "5"),
//     getItem("Option 6", "6"),
//     getItem("Submenu", "sub3", null, [
//       getItem("Option 7", "7"),
//       getItem("Option 8", "8"),
//     ]),
//   ]),
//   getItem("Navigation Three", "sub4", null, [
//     getItem("Option 9", "9"),
//     getItem("Option 10", "10"),
//     getItem("Option 11", "11"),
//     getItem("Option 12", "12"),
//   ]),
// ];

const SubCategory = ({ setCategory }) => {
  const onClick = (e) => {
    const cate = e.keyPath;
    let tmp = "";
    for (let i = cate.length - 1; i >= 1; i--) {
      tmp += cate[i] + ">";
    }
    tmp += cate[0];
    setCategory(tmp);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        zIndex: 1000,
      }}
      mode="vertical"
    >
      <Menu.SubMenu key="1" title="Settings">
        <Menu.Item key="2">Option 1</Menu.Item>
        <Menu.Item key="3">Option 2</Menu.Item>
        <Menu.SubMenu key="4" title="Sub-Menu">
          <Menu.Item key="5">Option 3</Menu.Item>
          <Menu.Item key="6">Option 4</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.Item key="8">Option 5</Menu.Item>
    </Menu>
  );
};
export default SubCategory;
