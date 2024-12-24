import { Button, ConfigProvider, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
import forgotImage from "/images/authImages/ForgotPassword.png";
import { useForgetPasswordMutation } from "../../Redux/api/authApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { el } from "react-day-picker/locale";


const ForgotPassword = () => {
  const navigate = useNavigate();

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   navigate("/verify-otp");
  // };
  const [forgetPassword] = useForgetPasswordMutation();

  const onFinish = async (values) => {
    console.log("values:", values);
const data = values;
//     console.log("Success:", data);
    
    try {
      const response = await forgetPassword(data).unwrap();
      console.log("response token", response);
      if (response.success === true) {
        localStorage.setItem("otpToken", response?.data?.forgetToken);
        // localStorage.setItem("userEmail", email);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "An OTP has been sent to your email!",
        })
        navigate("/verify-otp");
      }else{
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,})
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      // if (error.data?.success === false) {
      //   // toast.error(error.data?.message);
      //   Swal.fire({
      //     icon: "error",
      //     title: "Error",
      //     text: error.data?.message,})
      // }
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen py-10">
        <div className="w-full md:w-[80%] lg:w-[50%] flex justify-center items-center">
          <img
            src={forgotImage}
            alt="forgot_Password_Img"
            className="h-[320px] w-[320px] md:h-[380px] md:w-[380px] lg:h-[520px] lg:w-[520px]"
          />
        </div>
        <div className="h-[80vh] w-[2px] bg-[#1B7443] hidden lg:block"></div>
        <div className="w-full md:w-[80%] lg:w-[50%]">
          <div className="">
            <div className="mb-8">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4">
                Forgot password
              </h1>
              <p className="text-sm md:text-lg lg:text-xl mb-2">
                Enter your email address to ger a verification code for
                resetting your password.
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
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Email is Required",
                    },
                  ]}
                  name="email"
                  className="text-primary-color"
                >
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-[#8bc4fa] focus:bg-transparent focus:border-black"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="w-full py-5 sm:py-7 border text-lg sm:text-2xl text-white bg-[#1B7443] hover:border-[#36ac6b] font-semibold rounded-2xl mt-5 sm:mt-14"
                    htmlType="submit"
                  >
                    Get OTP
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;