/* eslint-disable no-unused-vars */
import { Button, Popconfirm, Table, Tag } from "antd";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "../../utils/icons";
import { formatCurrency, generateNameId } from "../../utils/utils";
import { callDeleteWishlist, callGetWishlist } from "../../services/productApi";
import { doGetWishListAction } from "../../redux/product/productSlice";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.product.wishList);
  const handleDeleteWishlist = async (id) => {
    const res = await callDeleteWishlist(id);
    if (res.data.code === 200) {
      const res2 = await callGetWishlist();
      if (res2.data.code === 200) {
        dispatch(doGetWishListAction(res2.data.listProductsFavorite));
      }
    }
  };

  const dataSource = wishList;

  const columns = [
    {
      title: "Products",
      dataIndex: "products",
      className: "w-[500px]",
      render: (text, record, index) => {
        return (
          <div className="flex items-center w-[500px] gap-4">
            <img
              className="w-[72px] h-[72px]"
              src={
                record.images[0] ||
                "https://s3-alpha-sig.figma.com/img/45ff/ebea/53178df09da5b55aa5ec9c64f9c97219?Expires=1702252800&Signature=RlrhJ4dS9tajw~GAgZInF~DokfoWsc1v4h69o4zD3VlQ0G9o2y4gjQr~7bEoTTlv75r9dHLH2Uho5Fpt4iZnU1Xtn0kqiauOfKuM1MkU4-fkrH4JrFLKkiFif9wkNgkdEw9YH32WaJkoJDinW3ubShmuWntPvfPVtuoIsldE23Tsjlsve~fXPKUCLzpKSOwFwkKuywYA0hEFfWerGrzk-e~w0bQyF5QOdhBTfQ6WKSTONqCdafYxLm5a1Rsq7GF~NmxeaFfXJKYfhB6XldNV1x2IN-yYmlKvhHfT4Cu5KEsJxLOKbMb-rXzkvpKt2NCec8KIvqavsF3kVPJTkk3G3Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              }
              alt=""
            />
            <Link
              to={`/product/${generateNameId({
                name: record.title,
                id: record._id,
              })}`}
              className="text-sm font-normal leading-5 text-gray-700 line-clamp-2"
            >
              {record.title}
            </Link>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "minPrice",
      key: "price",
      render: (text, record, index) => {
        return <span>{formatCurrency(record.minPrice)}đ</span>;
      },
    },
    {
      title: "Sold",
      dataIndex: "buyed",
      key: "buyed",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text, record, index) => {
        return (
          <div className="flex items-center gap-2">
            <span>{record.rate}</span>
            <StarIcon />
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        return record.status;
      },
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <Popconfirm
              placement="leftTop"
              title="Xác nhận xóa khỏi danh sách yêu thích"
              description="Bạn có chắc chắn muốn xóa sản phẩm này ? "
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ type: "default" }}
              onConfirm={() => handleDeleteWishlist(record._id)}
            >
              <Button>
                <MdDelete color="red"></MdDelete>
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container my-12 border border-gray-300">
      <Helmet>
        {/* <title>{dataProduct?.title} | Ecommerce</title> */}
        <title>Yêu thích</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <div className="p-4">
        <span className="my-4 text-lg font-medium leading-6 text-gray-900">
          Wishlist
        </span>
      </div>
      <div className="p-4">
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default WishList;
