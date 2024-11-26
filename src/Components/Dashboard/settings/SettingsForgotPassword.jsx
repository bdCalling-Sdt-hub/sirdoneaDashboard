import { Button, Form, Input, Typography } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SettingsForgotPassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/settings/otp-page");
  };
  return (
    <>
      {" "}
      <div className=" text-xl font-semibold items-center flex">
        <p>
          {" "}
          <IoIosArrowBack />
        </p>
        <h2 className="items-center">Forget Password</h2>
      </div>
      <div className="container w-[90%] mx-auto min-h-[80vh] p-20 flex justify-center items-center">
        <div className="w-full lg:w-[70%]">
          <div className="mb-10">
            <p className="text-3xl lg:text-[36px] text-base-color font-medium mb-8">
              Don’t worry! It happens.
            </p>
            <p className="md:text-lg lg:text-xl text-[#3C3C4399]">
              Enter your email address to get a verification code for resetting
              your password.
            </p>
          </div>
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Email is Required",
                },
              ]}
              name="email"
              className="text-base-color "
            >
              <Input
                placeholder="Enter your mail"
                className="py-2 px-3 text-xl bg-site-color border border-white text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-[#1B7443] hover:!bg-[#1B7443] font-semibold rounded-2xl mt-8"
                htmlType="submit"
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SettingsForgotPassword;
