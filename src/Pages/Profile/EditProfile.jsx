import { CalendarOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyprofileQuery, useUpdateMyprofileMutation } from "../../Redux/api/usersApi";
import Swal from "sweetalert2";

const EditProfile = () => {
  const navigate = useNavigate();
  const { data: profileData, isLoading ,refetch} = useGetMyprofileQuery();
  const [updateProfile] = useUpdateMyprofileMutation();

  const [form] = Form.useForm();

  if (isLoading) return <div>Loading...</div>;

  const onFinish = async (values) => {
    const formData = new FormData();
    console.log({values});
    formData.append("fullName", values.fullName);
    formData.append("phone", values.phone);
   


   
    
    try {
      const response = await updateProfile(formData).unwrap();
      console.log("Profile updated successfully:", response);
      if(response.success){
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully!",
        })
        refetch();
      }
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center">
          <LeftOutlined
            className="text-black text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-2xl font-semibold">Edit Profile Information</h2>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-20">
          <div className="col-span-1 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl lg:text-2xl font-bold">
              {profileData?.data?.fullName || "User"}
            </h2>
            <h3 className="xl:text-lg font-bold"></h3>
          </div>
          <div className="col-span-2">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    hoverBg: "#B2DAC4",
                    activeBg: "#B2DAC4",
                  },
                },
              }}
            >
              <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={{
                  fullName: profileData?.data?.fullName,
                  email: profileData?.data?.email,
                  phone: profileData?.data?.phone,
                }}
              >
                <Form.Item
                  label={
                    <label
                      htmlFor="fullName"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Full Name
                    </label>
                  }
                  name="fullName"
                  rules={[{ required: true, message: "Full Name is required" }]}
                >
                  <Input
                    id="fullName"
                    placeholder="Enter Full Name"
                    className="bg-[#B2DAC4] rounded-lg h-10 font-semibold w-full"
                  />
                </Form.Item>
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
                  name="email"
                  rules={[
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    className="bg-[#B2DAC4] rounded-lg h-10 font-semibold w-full text-black"
                    placeholder="Enter Email"
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <label className="text-black font-bold text-lg">
                      Phone Number
                    </label>
                  }
                  name="phone"
                  rules={[
                    {
                      pattern: /^[0-9]{10,15}$/,
                      message: "Enter a valid phone number",
                    },
                  ]}
                >
                  <Input
                    className="bg-[#B2DAC4] rounded-lg h-12 font-semibold"
                    placeholder="Enter Phone Number"
                  />
                </Form.Item>
                <Button
                  block
                  htmlType="submit"
                  className="bg-[#1b7443] text-white h-12 py-5 rounded-xl font-semibold text-lg"
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
