// import { CalendarOutlined, LeftOutlined } from "@ant-design/icons";
// import { Button, ConfigProvider, Form, Input, Select } from "antd";
// import moment from "moment";
// import { useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { useLocation, useNavigate } from "react-router-dom";

// const countryCodes = [
//   { label: "+1", value: "US", flag: "https://flagcdn.com/w320/us.png" },
//   { label: "+44", value: "UK", flag: "https://flagcdn.com/w320/gb.png" },
//   { label: "+91", value: "IN", flag: "https://flagcdn.com/w320/in.png" },
//   { label: "+880", value: "BD", flag: "https://flagcdn.com/w320/bd.png" },
//   { label: "+92", value: "PK", flag: "https://flagcdn.com/w320/pk.png" },
//   { label: "+54", value: "AR", flag: "https://flagcdn.com/w320/ar.png" },
//   { label: "+90", value: "TR", flag: "https://flagcdn.com/w320/tr.png" },
// ];

// const EditProfile = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   console.log(state);
//   const [selectedBirthday, setSelectedBirthday] = useState(
//     new Date(state?.profileData?.birthday || "1990-01-01")
//   );
//   const [isPickerVisible, setIsPickerVisible] = useState(false);

//   const onFinish = (values) => {
//     console.log("Form Values:", values);
//     console.log("Selected Birthday:", selectedBirthday);
//     navigate("/profile");
//   };

//   const handleDateChange = (date) => {
//     setSelectedBirthday(date);
//     setIsPickerVisible(false);
//   };

//   return (
//     <div className="p-4 lg:p-8 min-h-screen">
//       <div className="flex justify-between items-center mb-8 mx-10 xl:mx-40">
//         <div className="flex items-center">
//           <LeftOutlined
//             className="text-black text-xl mr-4 cursor-pointer"
//             onClick={() => navigate(-1)}
//           />
//           <h2 className="text-black text-2xl font-semibold">Edit Profile</h2>
//         </div>
//       </div>

//       <div className="relative bg-white rounded-lg shadow-lg p-6 md:mx-10 xl:mx-40">
//         <div className="relative">
//           <ConfigProvider
//             theme={{
//               components: {
//                 Button: {
//                   defaultHoverBg: "#1b7443",
//                   defaultHoverBorderColor: "rgb(255,255,255)",
//                   defaultHoverColor: "rgb(255,255,255)",
//                 },
//               },
//             }}
//           >
//             <Form
//               layout="vertical"
//               id="editProfileForm"
//               onFinish={onFinish}
//               initialValues={{
//                 fullName: state?.profileData?.fullName,
//                 email: state?.profileData?.email,
//                 phoneCode: state?.profileData?.phoneCode,
//                 phoneNumber: state?.profileData?.phoneNumber,
//               }}
//             >
//               <Form.Item
//                 label={
//                   <label className="text-black font-bold text-lg">
//                     Full Name
//                   </label>
//                 }
//                 name="fullName"
//               >
//                 <Input
//                   className="bg-[#B2DAC4] rounded-lg h-12 font-semibold"
//                   placeholder="Enter Full Name"
//                 />
//               </Form.Item>
//               <Form.Item
//                 label={
//                   <label className="text-black font-bold text-lg">Email</label>
//                 }
//                 name="email"
//               >
//                 <Input
//                   className="bg-[#B2DAC4] rounded-lg h-12 font-semibold"
//                   placeholder="Enter Email"
//                 />
//               </Form.Item>
//               <Form.Item
//                 label={
//                   <label className="text-black font-bold text-lg ">
//                     Phone Number
//                   </label>
//                 }
//                 name="phoneCode"
//               >
//                 <div className="flex gap-2">
//                   <Select
//                     style={{
//                       width: 150,
//                       height: "46px",
//                     }}
//                     options={countryCodes.map((country) => ({
//                       label: (
//                         <div className="flex items-center">
//                           <img
//                             src={country.flag}
//                             alt={`${country.value} Flag`}
//                             className="w-5 h-3 inline-block mr-2"
//                           />
//                           {country.label}
//                         </div>
//                       ),
//                       value: country.value,
//                     }))}
//                   />
//                   <Form.Item name="phoneNumber" noStyle>
//                     <Input
//                       className="bg-[#B2DAC4] rounded-lg h-12 font-semibold"
//                       placeholder="Enter Phone Number"
//                     />
//                   </Form.Item>
//                 </div>
//               </Form.Item>
//               <Form.Item
//                 label={
//                   <label className="text-black font-bold text-lg">
//                     Date of Birth
//                   </label>
//                 }
//                 name="birthday"
//               >
//                 <div
//                   className="bg-[#B2DAC4] rounded-lg h-12 font-semibold w-full flex items-center justify-between cursor-pointer"
//                   onClick={() => setIsPickerVisible(!isPickerVisible)}
//                 >
//                   <span className="ml-2">
//                     {selectedBirthday
//                       ? moment(selectedBirthday).format("YYYY-MM-DD")
//                       : "Select Your Birthday"}
//                   </span>
//                   <CalendarOutlined style={{ marginRight: "10px" }} />
//                 </div>
//               </Form.Item>
//               {isPickerVisible && (
//                 <div className="absolute top-10 right-5 bg-white p-2 shadow-lg rounded-md">
//                   <DayPicker
//                     mode="single"
//                     selected={selectedBirthday}
//                     onSelect={handleDateChange}
//                   />
//                 </div>
//               )}

//               <Button
//                 block
//                 form="editProfileForm"
//                 htmlType="submit"
//                 className="bg-[#1b7443] text-white h-12 py-5 rounded-xl font-semibold text-lg"
//               >
//                 Save Changes
//               </Button>
//             </Form>
//           </ConfigProvider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

import { CalendarOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const countryCodes = [
  { label: "+1", value: "US", flag: "https://flagcdn.com/w320/us.png" },
  { label: "+44", value: "UK", flag: "https://flagcdn.com/w320/gb.png" },
  { label: "+91", value: "IN", flag: "https://flagcdn.com/w320/in.png" },
  { label: "+880", value: "BD", flag: "https://flagcdn.com/w320/bd.png" }, // Bangladesh
  { label: "+92", value: "PK", flag: "https://flagcdn.com/w320/pk.png" }, // Pakistan
  { label: "+54", value: "AR", flag: "https://flagcdn.com/w320/ar.png" }, // Argentina
  { label: "+90", value: "TR", flag: "https://flagcdn.com/w320/tr.png" }, // Turkey
];

const EditProfile = () => {
  // eslint-disable-next-line no-unused-vars
  const [profileData, setProfileData] = useState({
    fullName: "Sirdonea",
    lastName: "",
    email: "sirdonea@example.com",
    phoneCode: "US",
    phoneNumber: "01846875456",
    birthday: "1990-01-01",
  });
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 xl:mx-40">
        <div className="flex items-center">
          <LeftOutlined
            className="text-black text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-2xl font-semibold">
            Edit Profile Information
          </h2>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 xl:mx-40">
        <div className="flex items-center justify-between gap-20 mx-48">
          <div className="flex flex-col items-center">
            <img
              className="rounded-full"
              src="https://i.ibb.co.com/xJdQCTG/download.jpg"
              alt="pic"
            />
            <h3 className="xl:text-lg font-bold">Admin</h3>
            <h2 className="text-xl lg:text-2xl font-bold">
              {profileData.fullName}
            </h2>
          </div>
          <div className="flex-1">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    // colorTextPlaceholder: "rgba(255,255,255,0.7)",
                    hoverBg: "#B2DAC4",
                    activeBg: "#B2DAC4",
                  },
                },
              }}
            >
              <Form layout="vertical">
                <div className="grid grid-cols-2 gap-4">
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
                          First Name
                        </label>
                      }
                    >
                      <Input
                        id="firstName"
                        placeholder="First Name"
                        className="bg-[#B2DAC4] rounded-lg h-10 font-semibold w-full"
                        value={profileData.firstName}
                        readOnly
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label={
                        <label
                          htmlFor="lastName"
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          Last Name
                        </label>
                      }
                    >
                      <Input
                        id="lastName"
                        placeholder="Last Name"
                        className="bg-[#B2DAC4] rounded-lg h-10 font-semibold w-full"
                        value={profileData.lastName}
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
                    value={profileData.email}
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
                          className="bg-[#B2DAC4] rounded-lg h-12 font-semibold"
                          placeholder="Enter Phone Number"
                        />
                      </Form.Item>
                    </div>
                  </Form.Item>
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
                      Date of Birth
                    </label>
                  }
                >
                  <Input
                    className="bg-[#B2DAC4] rounded-lg h-10 font-semibold w-full"
                    value={profileData.birthday}
                    prefix={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CalendarOutlined />
                        <span style={{ marginLeft: "8px" }}></span>
                      </div>
                    }
                    readOnly
                  />
                </Form.Item>
                <Button
                  block
                  form="editProfileForm"
                  htmlType="submit"
                  className="bg-[#1b7443] text-white h-12 py-5 rounded-xl font-semibold text-lg w-full"
                >
                  Save Changes
                </Button>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
