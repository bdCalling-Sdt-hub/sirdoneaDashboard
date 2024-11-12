import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const SettingsUpdatePassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/signin");
  };
  return (
    <div
      className="container w-[90%] mx-auto min-h-[80vh] p-20 flex justify-center items-center"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="w-full lg:w-[70%]">
        <div className="mb-10">
          <p className="text-3xl lg:text-[40px] text-base-color font-medium mb-8">
            Update Password
          </p>
          <p className="md:text-xl text-base-color">
            To update your password, check email for OTP being sent. Enter it in
            designated field to complete reset process.
          </p>
        </div>
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent w-full"
        >
          <Typography.Title level={4} style={{ color: "#222222" }}>
            New password
          </Typography.Title>
          <Form.Item
            rules={[
              { required: true, message: "Please enter your new password!" },
            ]}
            name="newPassword"
            className="text-white"
          >
            <Input.Password
              placeholder="Enter your password"
              className="py-2 px-3 text-xl bg-site-color border border-white text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Re-enter new Password
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
              className="py-2 px-3 text-xl bg-site-color border border-white text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
              htmlType="submit"
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SettingsUpdatePassword;
