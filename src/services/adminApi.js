import instance from "../utils/axios-customize";
export const callCategoryDetail = (id) => {
  return instance.get(`/admin/productCategory/detail/${id}`);
};

export const callGetAllAccount = () => {
  return instance.get("/admin/accounts", {});
};
export const callDeleteAccount = (id) => {
  return instance.delete(`admin/accounts/delete/${id}`);
};
export const callUpdateUserByAdmin = (id, data) => {
  return instance.patch(`/admin/accounts/edit/${id}`, data);
};
export const callAllCategory = () => {
  return instance.get("/admin/productCategory");
};
export const callAdminCategoryDetail = (id) => {
  return instance.get(`/admin/productCategory/detail/${id}`);
};
export const callAdminDeleteCategory = (id) => {
  return instance.delete(`/admin/productCategory/delete/${id}`);
};
export const callUpdateImageCategory = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("image", fileImg);
  return instance({
    method: "patch",
    url: "/admin/productCategory/uploadImage",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const callUpdateCategory = (id, data) => {
  return instance.patch(`/admin/productCategory/edit/${id}`, data);
};
export const callAddCategory = (data) => {
  return instance.post("/admin/productCategory/add", data);
};
export const callGetAllProductAdmin = () => {
  return instance.get("/admin/products");
};
export const callDeleteProduct = (id) => {
  return instance.delete(`/admin/products/delete/${id}`);
};
export const callAdminOrder = () => {
  return instance.get("/admin/orders");
};
export const callUpdataImageProduct = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("images", fileImg);
  return instance({
    method: "patch",
    url: "/admin/products/uploadImage",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const callAddProduct = (data) => {
  return instance.post("/admin/products/add", data);
};
export const callAllPermission = () => {
  return instance.get("/admin/roles");
};
export const callUpdateProduct = (id, data) => {
  return instance.patch(`/admin/products/edit/${id}`, data);
};
export const callGetAllRoles = () => {
  return instance.get("/admin/roles");
};
export const callDeleteRoles = (id) => {
  return instance.delete(`/admin/roles/delete/${id}`);
};
export const callAddNewRole = (data) => {
  return instance.post("/admin/roles/add", data);
};
export const callUpadatePermission = (data) => {
  return instance.patch("/admin/roles/permissions", data);
};
export const callUpdateInfoRole = (id, data) => {
  return instance.patch(`/admin/roles/edit/${id}`, data);
};
export const callInfoWeb = () => {
  return instance.get("/general/setting");
};
export const callEditWeb = (data) => {
  return instance.patch("/admin/settings/edit", data);
};
