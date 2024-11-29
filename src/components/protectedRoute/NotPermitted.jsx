import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotPermitted = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Bạn ko đủ quyền truy cập trang này."
      extra={<Button onClick={() => navigate("/")}>Back Home</Button>}
    />
  );
};

export default NotPermitted;
