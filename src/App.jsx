/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch } from "react-redux";
import useRouteElement from "../useRouterElement";
import { doGetUserInfo, doLoginAction } from "./redux/account/accountSlice";
import { useEffect } from "react";
import { callGetWishlist } from "./services/productApi";
import {
  doGetCompareProduct,
  doGetInfoWeb,
  doGetWishListAction,
} from "./redux/product/productSlice";
import { callInfoWeb } from "./services/adminApi";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(doLoginAction(localStorage.getItem("token")));
    }
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      dispatch(doGetUserInfo(JSON.parse(localStorage.getItem("profile"))));
    }
  }, []);
  useEffect(() => {
    const fetchWishlist = async () => {
      const res2 = await callGetWishlist();
      if (res2.data.code === 200) {
        dispatch(doGetWishListAction(res2.data.listProductsFavorite));
      }
    };
    fetchWishlist();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const fetchCompare = () => {
        dispatch(doGetCompareProduct());
      };
      fetchCompare();
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await callInfoWeb();
      dispatch(doGetInfoWeb(res.data.setting));
    };
    fetch();
  }, []);

  const routerElements = useRouteElement();
  return <div>{routerElements}</div>;
}

export default App;
