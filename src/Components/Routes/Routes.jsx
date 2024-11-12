import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Main from "../Layout/Main";
import DashboardLayout from "../Layout/DashboardLayout";

import Dashboard from "../Dashboard/Dashboard";
import Users from "../Dashboard/Users";
import Subscription from "../Dashboard/Subscription";

import Profile from "../../Pages/Profile/Profile";
import EditProfile from "../../Pages/Profile/EditProfile";

import SignIn from "../../Pages/Auth/SignIn";
import UpdatePassword from "../../Pages/Auth/UpdatePassword";
import OtpPage from "../../Pages/Auth/OtpPage";
import SettingsChangePassword from "../Dashboard/settings/SettingsChangePassword";
import SettingsForgotPassword from "../Dashboard/settings/SettingsForgotPassword";
import SettingsOtpPage from "../Dashboard/settings/SettingsOtpPage";
import SettingsUpdatePassword from "../Dashboard/settings/SettingsUpdatePassword";
import Logout from "../Dashboard/Logout";

import TermsOfService from "../Dashboard/settings/TermsOfService";

import PrivacyPolicy from "../Dashboard/settings/PrivacyPolicy";

import Notifications from "../Dashboard/Notifications";
import Earning from "../Dashboard/Earning";
import AllDrivers from "../Dashboard/Driver/AllDrivers";
import DriverRequest from "../Dashboard/Driver/DriverRequest";
import DriverRequestPage from "../Dashboard/Driver/DriverRequestDetails";

//

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <OtpPage />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "all-drivers",
            element: <AllDrivers />,
          },
          {
            path: "driver-request",
            element: <DriverRequest />,
          },
          {
            path: "driver-request/:id",
            element: <DriverRequestPage />,
          },
          {
            path: "earning",
            element: <Earning />,
          },
          {
            path: "subscription",
            element: <Subscription />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "terms-of-service",
            element: <TermsOfService />,
          },
          {
            path: "settings/forgot-password",
            element: <SettingsForgotPassword />,
          },
          {
            path: "settings/change-password",
            element: <SettingsChangePassword />,
          },
          {
            path: "settings/update-password",
            element: <SettingsUpdatePassword />,
          },
          {
            path: "settings/otp-page",
            element: <SettingsOtpPage />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
