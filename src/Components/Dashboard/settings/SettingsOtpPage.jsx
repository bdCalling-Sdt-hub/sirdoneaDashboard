import { Button, Form } from "antd";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";

const SettingsOtpPage = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleOTPSubmit = () => {
    console.log("OTP:", otp);
    navigate("/settings/update-password");
  };

  return (
    <>
      <div className="flex justify-start items-center text-xl font-semibold">
        <p>
          <MdKeyboardArrowLeft className="text-3xl" />
        </p>
        <h2>Forget Password</h2>
      </div>
      <div className="container w-[90%] mx-auto min-h-[80vh] p-20 flex justify-center items-center">
        <div className="w-full lg:w-[70%]">
          <div className="mb-10">
            <p className="text-3xl lg:text-[40px] text-secondary-color font-medium mb-8">
              Verify OTP
            </p>
            <p className="md:text-xl text-[#3C3C4399]">
              Please check your email. We have sent a code to contact @gmail.com
            </p>
          </div>
          <Form layout="vertical" className="bg-transparent w-full">
            <Form.Item className="text-base-color ">
              <div className="flex justify-center items-center">
                <OTPInput
                  inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-[20px] sm:text-[30px] bg-transparent border border-black
                    hover:border-[#1B7443] focus:bg-transparent focus:border-[#1B7443] rounded-lg mr-[10px] sm:mr-[20px] text-secondary-color"
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <input {...props} required />}
                />
              </div>
            </Form.Item>
            <div className="flex justify-between py-1">
              <p className=" text-base-color">Didn’t get OTP?</p>
              <Link
                to="/settings/otp-page"
                className="text-[#1B7443] font-semibold hover:text-secondary-color underline"
              >
                Resend
              </Link>
            </div>
            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-[#1B7443] hover:!bg-[#1B7443] font-semibold rounded-2xl mt-8"
                onClick={handleOTPSubmit}
              >
                Verify
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SettingsOtpPage;
