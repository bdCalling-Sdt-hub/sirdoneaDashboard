import {
  BarsOutlined,
  BellFilled,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, ConfigProvider, Dropdown, Typography, Grid } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import user from "/images/user.png";

const notifications = [
  {
    id: 1,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 2,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 3,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 4,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 5,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
];

const { useBreakpoint } = Grid;

// eslint-disable-next-line react/prop-types
const Topbar = ({ collapsed, setCollapsed }) => {
  const [notificationCount, setNotificationCount] = useState(
    notifications.length
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const screens = useBreakpoint();

  useEffect(() => {
    if (screens.lg || screens.xl) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [screens, setCollapsed]);

  const handleMenuClick = () => {
    setNotificationCount(0);
  };

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
  };
  const notificationMenu = (
    <div
      onClick={handleMenuClick}
      className="w-64 p-4 bg-white rounded-lg shadow-md"
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex gap-2 py-2 border-b last:border-b-0"
        >
          <BellFilled style={{ color: "#2B4257", fontSize: "20px" }} />
          <div className="flex flex-col items-start">
            <p>{notification.message}</p>
            <p className="text-gray-400 text-sm">{notification.time}</p>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <Link
          to="/notifications"
          className="bg-[#2B4257] text-white hover:text-gray-200 px-4 py-2 rounded inline-block"
        >
          See More
        </Link>
      </div>
    </div>
  );

  return (
    <div className="py-2 mx-[-50px] flex justify-between items-center bg-[#ffffff] rounded-xl">
      <div className="flex items-center gap-2 text-base-color ml-4 mt-2">
        <Typography.Title level={3} type="secondary">
          <BarsOutlined
            onClick={() => setCollapsed(!collapsed)}
            className="text-3xl"
          />
        </Typography.Title>
      </div>
      <div className="flex items-center justify-center gap-3 mr-5">
        {/* notification */}
        <div className="border border-[#013564] rounded-full px-2 py-2 h-9 flex cursor-pointer">
          <ConfigProvider
            theme={{
              components: {
                Badge: {
                  colorError: "rgb(1,53,100)",
                },
              },
            }}
          >
            <Dropdown
              overlay={notificationMenu}
              trigger={["click"]}
              placement="bottomRight"
              onOpenChange={handleDropdownVisibleChange}
              open={isDropdownVisible}
            >
              <Badge count={notificationCount} size="small">
                <BellOutlined
                  shape="circle"
                  size="small"
                  className="text-lg font-bold text-[#013564]"
                />
              </Badge>
            </Dropdown>
          </ConfigProvider>
        </div>

        <Link
          to="profile"
          className="flex items-center justify-center text-center gap-2 bg-transparent border rounded-full border-[#013564] p-2 mr-5"
        >
          <UserOutlined className="text-lg" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
