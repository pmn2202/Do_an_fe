import instance from "../utils/axios-customize";

export const callRegister = (data) => {
  return instance.post("/account/register", data);
};
export const callLogin = (data) => {
  return instance.post("/account/login", data);
};
export const callForgotPasswordEmail = (data) => {
  return instance.post("/account/forgot/email", data);
};
export const callOtp = (data) => {
  return instance.post("/account/forgot/otp", data);
};
export const callDetailUser = () => {
  return instance.get("/account/detail");
};
export const callUpdateUser = (data) => {
  return instance.patch("/account/edit", data);
};
export const callCheckOldPassword = (data) => {
  return instance.post("/account/change-password/old-password", data);
};
export const callUpdatePassword = (data) => {
  return instance.patch("/account/change-password/reset", data);
};
export const callUpdateAvatar = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("avatar", fileImg);
  return instance({
    method: "patch",
    url: "/account/uploadImage",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const resetPass = (data) => {
  return instance.patch("/account/forgot/reset", data);
};
