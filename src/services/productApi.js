import instance from "../utils/axios-customize";

export const callGetProducts = (params) => {
  return instance.get(`/products?${params}`);
};

export const callGetProductDetail = (id) => {
  return instance.get(`/products/detail/${id}`);
};
export const callGetHomeProduct = () => {
  return instance.get();
};
export const callAddToWishList = (id) => {
  return instance.get(`/favorite/add/${id}`);
};
export const callGetWishlist = () => {
  return instance.get(`/favorite`);
};
export const callDeleteWishlist = (id) => {
  return instance.delete(`/favorite/delete/${id}`);
};
export const callProductInfo = (data) => {
  return instance.post("/products/compare", data);
};

export const callCreateFeedbacks = (data) => {
  return instance.post("/feedbacks/create", data);
};
