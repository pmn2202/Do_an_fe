import { Link } from "react-router-dom";
import { Facebook, Instagram, Pinterest, Youtube } from "../../../utils/icons";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { locales } from "../../../i18n/i18n";

const TopHeader = () => {
  const { i18n } = useTranslation();
  const currentLanguage = locales[i18n.currentLanguage];
  console.log(currentLanguage);
  const handleChangeLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="py-3 bg-back">
      <div className="container flex items-center justify-between text-white ">
        <span>Welcome to ABC online eCommerce store</span>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <span>Follow Us</span>
            <Link to="https://www.instagram.com/?hl=en">
              <Instagram></Instagram>
            </Link>
            <Link to="https://www.facebook.com/">
              <Facebook></Facebook>
            </Link>
            <Link to="/">
              <Pinterest></Pinterest>
            </Link>
            <Link to="https://www.youtube.com/">
              <Youtube></Youtube>
            </Link>
          </div>
          <div className="border-r border-white h-[20px]"></div>
          <div className="flex gap-3">
            <Select
              defaultValue="Việt Nam"
              className="w-[100px]"
              onChange={handleChangeLanguage}
              options={[
                { value: "en", label: "English" },
                { value: "vi", label: "Việt Nam" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
