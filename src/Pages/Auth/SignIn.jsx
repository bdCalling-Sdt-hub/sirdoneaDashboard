import {
  Checkbox,
  Button,
  Input,
  ConfigProvider,
  Form,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/images/logo.png";

const SignIn = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-20 items-center justify-center min-h-screen py-10">
        <div>
          <img src={logo} alt="logo" width={600} className="rounded-2xl" />
        </div>
        <div className="h-[600px] w-0.5 bg-[#1B7443] hidden lg:block"></div>
        <div className="">
          <div className="text-center mb-10">
            <h1 className="text-[#1f1f1f] text-sm sm:text-4xl font-bold sm:font-semibold mb-4">
              Login to Account!
            </h1>
            <p className="text-[#1f1f1f] sm:text-2xl mb-2 sm:font-medium">
              Please enter your email and password to continue.
            </p>
          </div>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  colorError: "#F44848",
                },
                Button: {
                  defaultHoverBg: "#1B7443",
                  defaultHoverColor: "white",
                },
                Input: {
                  colorTextPlaceholder: "rgb(113,111,111)",
                },
              },
            }}
          >
            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Typography.Title level={4} style={{ color: "#1f1f1f" }}>
                Email
              </Typography.Title>
              <Form.Item name="email" className="text-white">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-[#8bc4fa] focus:bg-transparent focus:border-black"
                />
              </Form.Item>
              <Typography.Title level={4} style={{ color: "#1f1f1f" }}>
                Password
              </Typography.Title>
              <Form.Item name="password" className="text-white">
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-[#8bc4fa] focus:bg-transparent focus:border-black"
                />
              </Form.Item>

              <div className="flex justify-between ">
                <div className="flex gap-2">
                  <Checkbox />
                  <p className="">Remember Password</p>
                </div>
                <div>
                  <Link to="/forgot-password" className="font-bold underline text-[#1b7443]">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <Form.Item>
                {/* <Link to="/"> */}
                <Button
                  className="w-full py-6 border text-lg sm:text-xl text-white bg-[#1B7443] border-[#97C6EA] hover:border-[#97C6EA] font-semibold rounded-2xl mt-14"
                  htmlType="submit"
                >
                  Sign In
                </Button>
                {/* </Link> */}
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
