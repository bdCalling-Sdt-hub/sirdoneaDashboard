import Topbar from "../Shared/Topbar";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
import earning from "../../../public/images/dashboard-logo/earning.svg";
import setting from "../../../public/images/dashboard-logo/setting.svg";
import logout from "../../../public/images/dashboard-logo/logout.svg";

import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import { CgMenuCake } from "react-icons/cg";
import { BiCategoryAlt } from "react-icons/bi";
import { SlHandbag } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";

const DashboardLayout = () => {
  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();
  const [collapsed, setCollapsed] = useState(false);

  // Use effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const adminMenuItems = [
    {
      key: "dashboard",
      icon: (
        <img
          src={dashboardLogo}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("dashboard")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },
    {
      key: "orders",
      icon: <CgMenuCake />,
      label: <NavLink to="orders">Orders</NavLink>,
    },
    {
      key: "categories",
      icon: <BiCategoryAlt />,
      label: <span className="text-base-color">Categories</span>,
      children: [
        {
          key: "main-category",
          icon: <span>&#8226;</span>,
          label: <NavLink to="main-category">Main Category</NavLink>,
        },
        {
          key: "sub-category",
          icon: <span>&#8226;</span>,
          label: <NavLink to="sub-category">Sub Category</NavLink>,
        },
      ],
    },
    {
      key: "products",
      icon: <SlHandbag />,
      label: <NavLink to="products">Products</NavLink>,
    },
    {
      key: "users",
      icon: <FaRegUser />,
      label: <NavLink to="users">Users</NavLink>,
    },
    {
      key: "earning",
      icon: (
        <img
          src={earning}
          alt="warning"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("earning")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="earning">Earning</NavLink>,
    },
    {
      key: "organization",
      label: <span className="text-base-color">Organization</span>,
      icon: <HiOutlineUserGroup />,
      children: [
        {
          key: "organizations",
          icon: <span>&#8226;</span>,
          label: <NavLink to="organizations">Organization</NavLink>,
        },
        {
          key: "organization-request",
          icon: <span>&#8226;</span>,
          label: (
            <NavLink to="organization-request">Organization Request</NavLink>
          ),
        },
        {
          key: "organization-payment",
          icon: <span>&#8226;</span>,
          label: (
            <NavLink to="organization-payment">Organization Payment</NavLink>
          ),
        },
      ],
    },
    {
      key: "settings",
      label: <span className="text-base-color"> Settings</span>,
      icon: <img src={setting} alt="dashboard" width={16} height={16} />,
      children: [
        {
          key: "change-password",
          icon: <span>&#8226;</span>,
          label: (
            <NavLink to="settings/change-password">Change Password</NavLink>
          ),
        },
        {
          key: "privacy-policy",
          icon: <span>&#8226;</span>,
          label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
        },
        {
          key: "terms-of-service",
          icon: <span>&#8226;</span>,
          label: <NavLink to="terms-of-service">Terms & Condition</NavLink>,
        },
      ],
    },
    {
      key: "logout",
      icon: (
        <img
          src={logout}
          alt="dashboard"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: <NavLink to="/signin">Logout</NavLink>,
    },
  ];

  // const userMenuItems = [
  //   {
  //     key: "dashboard",
  //     icon: (
  //       <img
  //         src={dashboardLogo}
  //         alt="dashboard"
  //         width={20}
  //         style={{
  //           filter: location.pathname.includes("dashboard")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="dashboard">Dashboard</NavLink>,
  //   },
  //   {
  //     key: "appointment",
  //     icon: (
  //       <img
  //         src={appointment}
  //         alt="Appointment"
  //         width={20}
  //         style={{
  //           filter: location.pathname.includes("appointment")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="appointment">Appointment</NavLink>,
  //   },
  //   {
  //     key: "chat",
  //     icon: (
  //       <img
  //         src={chat}
  //         alt="Chat"
  //         width={20}
  //         style={{
  //           filter: location.pathname.includes("chat")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="chat">Chat</NavLink>,
  //   },
  //   {
  //     key: "profile",
  //     icon: (
  //       <img
  //         src={profile}
  //         alt="profile"
  //         width={16}
  //         height={16}
  //         style={{
  //           filter: location.pathname.includes("profile")
  //             ? "brightness(0) invert(1)"
  //             : undefined,
  //         }}
  //       />
  //     ),
  //     label: <NavLink to="profile">Profile</NavLink>,
  //   },
  //   {
  //     key: "settings",
  //     label: <span className="text-base-color"> Settings</span>,
  //     icon: <img src={setting} alt="dashboard" width={16} height={16} />,
  //     children: [
  //       {
  //         key: "change-password",
  //         icon: <span>&#8226;</span>,
  //         label: (
  //           <NavLink to="settings/change-password">Change Password</NavLink>
  //         ),
  //       },
  //       {
  //         key: "about-us",
  //         icon: <span>&#8226;</span>,
  //         label: <NavLink to="about-us">About Us</NavLink>,
  //       },
  //       {
  //         key: "terms-of-service",
  //         icon: <span>&#8226;</span>,
  //         label: <NavLink to="terms-of-service">Terms & Condition</NavLink>,
  //       },
  //       {
  //         key: "privacy-policy",
  //         icon: <span>&#8226;</span>,
  //         label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
  //       },
  //     ],
  //   },
  //   {
  //     key: "logout",
  //     icon: (
  //       <img
  //         src={logout}
  //         alt="logout"
  //         width={16}
  //         height={16}
  //         style={{ color: "#222222", fontSize: "16px" }}
  //       />
  //     ),
  //     label: (
  //       <div onClick={() => localStorage.removeItem("user")}>
  //         <NavLink>Logout</NavLink>
  //       </div>
  //     ),
  //   },
  // ];

  // Select the appropriate menu items based on user role

  return (
    <div className="h-screen bg-white ">
      <Layout className="!relative">
        <Sider
          width={240}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 5px #00000040",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              width={150}
              height={150}
              className="my-7 mx-auto"
            />
          </Link>

          <Menu
            mode="inline"
            defaultSelectedKeys={pathSegment}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={adminMenuItems}
          />
        </Sider>
        <Layout style={{ background: "#FFEFD9 ", padding: "20px" }}>
          <Header style={{ background: "#ffffff" }}>
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-[#E8E8F5]py-4 xl:py-8">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
