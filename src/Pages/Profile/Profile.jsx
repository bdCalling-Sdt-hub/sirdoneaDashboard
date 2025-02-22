import {
  CalendarOutlined,
  EditOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyprofileQuery } from "../../Redux/api/usersApi";
const countryCodes = [
  { label: "+1", value: "US", flag: "https://flagcdn.com/w320/us.png" },
  { label: "+44", value: "UK", flag: "https://flagcdn.com/w320/gb.png" },
  { label: "+91", value: "IN", flag: "https://flagcdn.com/w320/in.png" },
  { label: "+880", value: "BD", flag: "https://flagcdn.com/w320/bd.png" }, // Bangladesh
  { label: "+92", value: "PK", flag: "https://flagcdn.com/w320/pk.png" }, // Pakistan
  { label: "+54", value: "AR", flag: "https://flagcdn.com/w320/ar.png" }, // Argentina
  { label: "+90", value: "TR", flag: "https://flagcdn.com/w320/tr.png" }, // Turkey
];

const Profile = () => {
  // eslint-disable-next-line no-unused-vars
  // const [profileData, setProfileData] = useState({
  //   fullName: "Sirdonea",
  //   lastName: "",
  //   email: "sirdonea@example.com",
  //   phoneCode: "US",
  //   phoneNumber: "01846875456",
  //   birthday: "1990-01-01",
  // });
  const navigate = useNavigate();

  const {data:profileDate, refetch} = useGetMyprofileQuery();

  console.log("profileDate",profileDate?.data);
  

  const handleEditClick = () => {
    navigate("/edit-profile", { state: { profileDate } });
  };

  return (
    <div className=" lg:p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 ">
        <div className="flex items-center">
          <LeftOutlined
            className="text-black text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-2xl font-semibold">
            Profile Information
          </h2>
        </div>
        <Button
          icon={<EditOutlined />}
          onClick={handleEditClick}
          className="bg-[#1b7443] text-white h-10"
        >
          Edit Profile
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap20 text-sm md:text-xl">
          <div className="col-span-1 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl lg:text-2xl font-bold">
              {profileDate?.data?.fullName}
            </h2>
            <h3 className="xl:text-lg font-semibold">Admin</h3>
          </div>

          <div className="col-span-2">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    // colorTextPlaceholder: "rgba(255,255,255,0.7)",
                    hoverBg: "#B2DAC4",
                    activeBg: "#B2DAC4",
                  },
                  Select: {
                    optionSelectedBg: "rgb(254,188,96)",
                    optionActiveBg: "rgb(255,217,165)",
                  },
                },
              }}
            >
              <Form layout="vertical">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Form.Item
                      label={
                        <label
                          htmlFor="firstName"
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          Full Name
                        </label>
                      }
                    >
                      <Input
                        id="firstName"
                        placeholder="First Name"
                        className="bg-[#B2DAC4] rounded-lg h-10 font-semibold w-full"
                        value={profileDate?.data?.fullName}
                        readOnly
                      />
                    </Form.Item>
                  </div>
                </div>
                <Form.Item
                  label={
                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Email
                    </label>
                  }
                >
                  <Input
                    className=" bg-[#B2DAC4] rounded-lg h-10 font-semibold w-full text-black"
                    value={profileDate?.data?.email}
                    readOnly
                  />
                </Form.Item>
                <div className="flex flex-col">
                  <Form.Item
                    label={
                      <label className="text-black font-bold text-lg ">
                        Phone Number
                      </label>
                    }
                    name="phoneCode"
                  >
                    <div className="flex gap-2">
                      {/* <Select
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
                      /> */}
                      <Form.Item noStyle>
                        <Input
                          className="bg-[#B2DAC4] rounded-lg h-12 font-semibold"
                          placeholder="Enter Phone Number"
                          value={profileDate?.data?.phone}
                        />
                      </Form.Item>
                    </div>
                  </Form.Item>
                </div>
                
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
