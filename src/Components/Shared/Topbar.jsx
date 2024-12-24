import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, ConfigProvider, Dropdown, Grid } from "antd";
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useGetAllNotificationQuery } from "../../Redux/api/notificationApi";
import moment from "moment/moment";

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
  const {data:notification1} = useGetAllNotificationQuery();
console.log('noti', notification1?.data);
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
      className="w-80 p-4 bg-white rounded-lg shadow-md"
    >
      <div>
        <h2 className="text-2xl font-semibold text-center text-[#1B7443]">
          Notification
        </h2>
        <p className="text-end -mt-7 cursor-pointer">X</p>
      </div>
      <p className="border-b-[1px]  border-[#1B7443] py-2 mb-2"></p>
      {notification1?.data?.map((notification) => (
        <div key={notification.id} className="flex items-center gap-2 py-3 ">
          <FaRegBell
            // className="bg-[#B2DAC4] text-2xl"
            style={{
              backgroundColor: "#B2DAC4",
              color: "#1B7443",
              fontSize: "28px",
              padding: "4px",
              borderRadius: "20%",
            }}
          />
          <div className="flex flex-col items-start justify-center">
            <p>{notification.message}</p>
            <p className="text-gray-400 text-sm">{moment(notification.createdAt).fromNow()}</p>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <Link
          to="/notifications"
          className="bg-[#1B7443] text-white hover:text-gray-200 px-4 py-2 rounded inline-block"
        >
          See More
        </Link>
      </div>
    </div>
  );

  return (
    <div className="py-2 mx-[-50px] flex justify-between items-center bg-[#ffffff] rounded-lg ">
      <div className="flex items-center gap-2 text-[#1B7443] ml-4 mt-2 cursor-pointer">
        <GiHamburgerMenu
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl"
        />
      </div>
      <div className="flex items-center justify-center gap-3 mr-5">
        {/* notification */}
        <div className="border border-[#1B7443] rounded-full px-2 py-2 h-9 flex cursor-pointer">
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
              <Badge count={notification1?.data?.length} size="small">
                <BellOutlined
                  shape="circle"
                  size="small"
                  className="text-lg font-bold text-[#1B7443]"
                />
              </Badge>
            </Dropdown>
          </ConfigProvider>
        </div>

        <Link
          to="profile"
          className="flex items-center justify-center text-center gap-2 bg-transparent border rounded-full border-[#1B7443] p-2 mr-5"
        >
          <UserOutlined className="text-lg text-[#1B7443]" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
