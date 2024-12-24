import { Button, ConfigProvider, Form } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import otpImage from "/images/authImages/otp.png";
import OTPInput from "react-otp-input";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../Redux/api/authApi";
import Swal from "sweetalert2";

const OtpPage = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  const handleOTPSubmit = async () => {
    const token = localStorage.getItem("otpToken");
    if (!token) {
      alert("Error!. Please start the reset process again.");
      navigate("/forgot-password");
      return;
    }

    try {
      const data = { token, otp };
      console.log("Success:", data);
      const response = await verifyOtp(data).unwrap();
      console.log("OTP verification response:", response);

      if (response.success === true) {
        localStorage.setItem(
          "verifiedOtpToken",
          response?.data?.forgetOtpMatchToken
        );
        // toast.success("OTP verified successfully!");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "OTP verified successfully!.",
        });
        // navigate("/reset-password");
        navigate("/update-password");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.data?.message === "Invalid OTP") {
        // toast.error("Invalid OTP. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Invalid OTP. Please try again.",})
      } else {
        // toast.error("Failed to verify OTP. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to verify OTP. Please try again.",})
      }
    }
  };

  const handleResendOtp = async () => {

    const token = localStorage.getItem("otpToken");
    if (!token) {
      alert("Error!. Please start the reset process again.");
      navigate("/forgot-password");
      return;
    }


    try {
      const response = await resendOtp().unwrap();
      console.log('response', response);
      
      if (response.success === true) {
        // toast.success("An OTP has been sent to your email!");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "An OTP has been sent to your email!",
        })
        // navigate("/verify-otp");
      }
    } catch (error) {
      // console.error("Error sending reset code:", error);
      if (error.data?.success === false) {
        // toast.error("Incorrect Email.");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.data?.message,})
      } else {
        // toast.error("Failed to resend OTP. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to resend OTP. Please try again.",})
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1350px] w-[90%] mx-auto  flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen py-10">
        <div className="w-full md:w-[80%] lg:w-[50%] flex justify-center items-center">
          <img
            src={otpImage}
            alt="forgot_Password_Img"
            className="h-[320px] w-[320px] md:h-[380px] md:w-[400px] lg:h-[520px] lg:w-[550px]"
          />
        </div>
        <div className="h-[80vh] w-[2px] bg-[#1B7443] hidden lg:block"></div>
        <div className="w-full md:w-[80%] lg:w-[50%] ">
          <div className="">
            <div className="mb-8">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4">
                Verify OTP
              </h1>
              <p className="text-sm md:text-lg lg:text-xl mb-2">
                Please check your email. We have sent a code to contact
                @gmail.com
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
                },
              }}
            >
              <Form layout="vertical" className="bg-transparent w-full">
                <Form.Item className="">
                  <div className="flex justify-center items-center">
                    <OTPInput
                      inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-[20px] sm:text-[30px] font-bold bg-transparent border border-[#1B7443] 
                      hover:border-[#3A3A3A] focus:bg-transparent focus:border-secoundary-color rounded-lg mr-[10px] sm:mr-[20px]"
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={(props) => <input {...props} required />}
                    />
                  </div>
                </Form.Item>
                <div className="flex justify-between py-1 text-sm sm:text-base">
                  <p>Didn’t receive code?</p>
                  <Link
                    // href="/otp-verification"
                    className="text-[#1B7443] !underline"
                    onClick={handleResendOtp}
                  >
                    Resend
                  </Link>
                </div>

                <Form.Item>
                  <Button
                    className="w-full py-5 sm:py-7 border text-lg sm:text-2xl text-white bg-[#1B7443] hover:border-[#45ad74] font-semibold rounded-2xl mt-5 sm:mt-14"
                    onClick={handleOTPSubmit}
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
export default OtpPage;
