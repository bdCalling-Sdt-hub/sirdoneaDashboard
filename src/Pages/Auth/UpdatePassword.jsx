import { Button, ConfigProvider, Form, Input, Typography } from "antd";

import changePasswordImg from "/images/authImages/updatePass.png";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/signin");
  };

  return (
    <div className="lg:w-full mx-auto flex flex-col lg:flex-row justify-center gap-20 items-center min-h-screen py-20 px-5">
      <div className="">
        <img
          src={changePasswordImg}
          alt="logo"
          className="h-[320px] w-[320px] md:h-[380px] md:w-[400px] lg:h-[520px] lg:w-[550px]"
        />
      </div>
      <div className="h-[80vh] w-[2px] bg-[#1B7443] hidden lg:block"></div>
      <div className="w-full lg:w-[50%]">
        <div className="">
          <div className="mb-10 flex flex-col gap-4">
            <p className="sm:text-3xl lg:text-4xl text-base-color font-semibold">
              Set New Password
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
              onFinish={onFinish}
              layout="vertical"
              className="bg-transparent w-full"
            >
              <Typography.Title level={4} style={{ color: "black" }}>
                New Password
              </Typography.Title>
              <Form.Item name="newPassword" className="text-white">
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-white focus:bg-transparent focus:border-black"
                />
              </Form.Item>
              <Typography.Title level={4} style={{ color: "black" }}>
                Confirm New Password
              </Typography.Title>
              <Form.Item
                name="reEnterPassword"
                className="text-white"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-white focus:bg-transparent focus:border-black"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="w-full py-6 border text-lg sm:text-xl text-white bg-[#1B7443] hover:border-[#4fa576]  font-semibold rounded-2xl mt-5 lg:mt-14"
                  htmlType="submit"
                >
                  Change password
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
