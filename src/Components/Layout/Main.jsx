import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import { mainTheme } from "../../theme";

const Main = () => {
  return (
    <ConfigProvider theme={mainTheme}>
      <div className="bg-primary-color">
        <Outlet />
      </div>
    </ConfigProvider>
  );
};

export default Main;
