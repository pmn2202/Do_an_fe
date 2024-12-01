/* eslint-disable react-hooks/exhaustive-deps */
import { BestDeals, Widget } from "../../components/home";
import Category from "../../components/home/Category";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import NewProduct from "../../components/home/NewProduct";
import ProductRelated from "../../components/home/ProductRelated";

import { useEffect, useState } from "react";
import { callGetHomeProduct } from "../../services/productApi";
import { useDispatch } from "react-redux";
import { doGetCategoryParent } from "../../redux/product/productSlice";
import { Helmet } from "react-helmet";
const Home = () => {
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

      <NewProduct />
      <ProductRelated
        productFeatureds={productFeatureds}
        productBestRate={productBestRate}
        productsBestSellers={productsBestSellers}
      />
    </div>
  );
};

export default Home;
