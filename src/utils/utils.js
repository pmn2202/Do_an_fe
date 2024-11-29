/* eslint-disable no-useless-escape */
import UserImage from "../../src/assets/images/user.svg";
export function formatCurrency(currency) {
  return new Intl.NumberFormat("de-DE").format(currency);
}
export function formatNumberToSocialStyle(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}

export const removeSpecialCharacter = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );
export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};
export const getIdFromNameId = (nameId) => {
  const arr = nameId.split("-i-");
  return arr[arr.length - 1];
};
export const price_before_discount = (num, price_after) => {
  return price_after / (1 - num / 100);
};
export function rateSale(original, sale) {
  return Math.round(((original - sale) / original) * 100) + "%";
}
export const getAvatarUrl = (avtarName) => {
  return avtarName
    ? `https://res.cloudinary.com/debcojldf/image/upload/v1702457308/${avtarName}`
    : UserImage;
};

