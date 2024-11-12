import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { useState } from "react";
import { CalendarOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import moment from "moment";

const countryCodes = [
  { label: "+1", value: "US", flag: "https://flagcdn.com/w320/us.png" },
  { label: "+44", value: "UK", flag: "https://flagcdn.com/w320/gb.png" },
  { label: "+91", value: "IN", flag: "https://flagcdn.com/w320/in.png" },
  { label: "+880", value: "BD", flag: "https://flagcdn.com/w320/bd.png" },
  { label: "+92", value: "PK", flag: "https://flagcdn.com/w320/pk.png" },
  { label: "+54", value: "AR", flag: "https://flagcdn.com/w320/ar.png" },
  { label: "+90", value: "TR", flag: "https://flagcdn.com/w320/tr.png" },
];

const EditProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state);
  const [selectedBirthday, setSelectedBirthday] = useState(
    new Date(state?.profileData?.birthday || "1990-01-01")
  );
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Form Values:", values);
    console.log("Selected Birthday:", selectedBirthday);
    navigate("/profile");
  };

  const handleDateChange = (date) => {
    setSelectedBirthday(date);
    setIsPickerVisible(false);
  };

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 mx-10 xl:mx-40">
        <div className="flex items-center">
          <LeftOutlined
            className="text-black text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-2xl font-semibold">Edit Profile</h2>
        </div>
      </div>

      <div className=" bg-white rounded-lg shadow-lg p-6 md:mx-10 xl:mx-40">
        <div className="relative">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBg: "rgb(43,66,87)",
                  defaultHoverBorderColor: "rgb(255,255,255)",
                  defaultHoverColor: "rgb(255,255,255)",
                },
              },
            }}
          >
            <Form
              layout="vertical"
              id="editProfileForm"
              onFinish={onFinish}
              initialValues={{
                fullName: state?.profileData?.fullName,
                email: state?.profileData?.email,
                phoneCode: state?.profileData?.phoneCode,
                phoneNumber: state?.profileData?.phoneNumber,
              }}
            >
              <Form.Item
                label={
                  <label className="text-black font-bold text-lg">
                    Full Name
                  </label>
                }
                name="fullName"
              >
                <Input
                  className="bg-[#E8E8F5] rounded-lg h-12 font-semibold"
                  placeholder="Enter Full Name"
                />
              </Form.Item>
              <Form.Item
                label={
                  <label className="text-black font-bold text-lg">Email</label>
                }
                name="email"
              >
                <Input
                  className="bg-[#E8E8F5] rounded-lg h-12 font-semibold"
                  placeholder="Enter Email"
                />
              </Form.Item>
              <Form.Item
                label={
                  <label className="text-black font-bold text-lg ">
                    Phone Number
                  </label>
                }
                name="phoneCode"
              >
                <div className="flex gap-2">
                  <Select
                    style={{
                      width: 150,
                      height: "46px",
                    }}
                    options={countryCodes.map((country) => ({
                      label: (
                        <div className="flex items-center">
                          <img
                            src={country.flag}
                            alt={`${country.value} Flag`}
                            className="w-5 h-3 inline-block mr-2"
                          />
                          {country.label}
                        </div>
                      ),
                      value: country.value,
                    }))}
                  />
                  <Form.Item name="phoneNumber" noStyle>
                    <Input
                      className="bg-[#E8E8F5] rounded-lg h-12 font-semibold"
                      placeholder="Enter Phone Number"
                    />
                  </Form.Item>
                </div>
              </Form.Item>
              <Form.Item
                label={
                  <label className="text-black font-bold text-lg">
                    Date of Birth
                  </label>
                }
                name="birthday"
              >
                <div
                  className="bg-[#E8E8F5] rounded-lg h-12 font-semibold w-full flex items-center justify-between cursor-pointer"
                  onClick={() => setIsPickerVisible(!isPickerVisible)}
                >
                  <span className="ml-2">
                    {selectedBirthday
                      ? moment(selectedBirthday).format("YYYY-MM-DD")
                      : "Select Your Birthday"}
                  </span>
                  <CalendarOutlined style={{ marginRight: "10px" }} />
                </div>
              </Form.Item>
              {isPickerVisible && (
                <div className="absolute bg-white p-2 shadow-lg rounded-md">
                  <DayPicker
                    mode="single"
                    selected={selectedBirthday}
                    onSelect={handleDateChange}
                  />
                </div>
              )}

              <Button
                block
                form="editProfileForm"
                htmlType="submit"
                className="bg-[#2B4257] text-white h-12 py-5 rounded-xl font-semibold text-lg"
              >
                Save Changes
              </Button>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
