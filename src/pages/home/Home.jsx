/* eslint-disable react-hooks/exhaustive-deps */
import { BestDeals, Widget } from "../../components/home";
import Category from "../../components/home/Category";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import NewProduct from "../../components/home/NewProduct";
import ProductRelated from "../../components/home/ProductRelated";

import { WechatOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { callGetHomeProduct } from "../../services/productApi";
import { useDispatch } from "react-redux";
import { doGetCategoryParent } from "../../redux/product/productSlice";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const Home = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [productsBestSellers, setProductsBestSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productFeatureds, setProductFeatureds] = useState([]);
  const [productBestRate, setProductBestRate] = useState([]);

  const fetchHomeData = async () => {
    const res = await callGetHomeProduct();
    if (res.status === 200) {
      setProductsBestSellers(res.data.productBestSellers);
      setCategories(res.data.productCategorys);
      dispatch(doGetCategoryParent(res.data.productCategorys));
      setProductFeatureds(res.data.productFeatureds);
      setProductBestRate(res.data.productBestRate);
    }
  };
  useEffect(() => {
    fetchHomeData();
  }, []);
  return (
    <div className="container relative py-4">
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="chi tiết sản phẩm" />
      </Helmet>
      <Widget />
      <BestDeals productsBestSellers={productsBestSellers} />
      <div className="py-8">
        <Category categories={categories} />
      </div>
      <FeaturedProducts productFeatureds={productFeatureds} />
      <div className="flex gap-2 py-4 contaier">
        <img src="Banner.png" className="w-1/2" alt="" />
        <img src="banner2.png" className="w-1/2" alt="" />
      </div>
      <NewProduct />
      <img src="banner6.png" alt="" />
      <ProductRelated
        productFeatureds={productFeatureds}
        productBestRate={productBestRate}
        productsBestSellers={productsBestSellers}
      />
      {token && (
        <div className="fixed bottom-[20px] right-[20px] w-10 h-10 border border-gray-200 flex items-center justify-center text-primary rounded-full cursor-pointer">
          <Link
            to={`https://do-an-web.onrender.com/api/v1/chat?token=${token}`}
            target="_blank"
          >
            <WechatOutlined />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
