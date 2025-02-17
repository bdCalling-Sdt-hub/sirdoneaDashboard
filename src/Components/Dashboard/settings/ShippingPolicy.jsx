import { LeftOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddSettingsMutation, useGetSettingsQuery, useUpdateSettingsMutation } from "../../../Redux/api/settingsApi";
import Swal from "sweetalert2";

const ShippingPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();
  // console.log("terms",getSettingsData?.data.termsOfService);
  // const privesyPolicy = getSettingsData?.data?.termsOfService;
  // console.log({privesyPolicy});
  

  // Mutations for adding and updating Terms & Condition
  const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Load Terms & Condition data on component mount
  useEffect(() => {
    if (getSettingsData?.data.shippingPolicy) {
      setContent(getSettingsData.data.shippingPolicy); // Load the latest policy
    }
  }, [getSettingsData]);

  console.log({content});
  

  const handleOnSave = async () => {
    try {
      // console.log('111');
      // console.log('click',getSettingsData?.data.termsOfService);
      
      
      if (getSettingsData?.data) {
        console.log('222');
        // Update existing Terms & Condition
      const res =  await updateSettings({ shippingPolicy: content }).unwrap();
      console.log('res',res);
      
      if(res.success){
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Terms & Condition updated successfully!",
        })
      }
        // toast.success("Terms & Condition updated successfully!");
      } else {
        // Add a new Terms & Condition if not existing
     const res =  await addSettings({ shippingPolicy: content }).unwrap();
     if(res.success){
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Terms & Condition added successfully!",
        })
     }
        // toast.success("Terms & Condition added successfully!");
      }
      refetch(); // Refresh the data after save
    } catch (error) {
      // toast.error("Failed to save Terms & Condition. Please try again.");
      if(error){
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to save Terms & Condition. Please try again.",
        })
      }
      console.error("Save error:", error);
    }
  };

  // Show loading state while fetching data
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading Terms & Condition..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Shipping Policy. Please try again later.
      </div>
    );
  }
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen py-1">
      <div className="p-2 rounded">
        <div className="flex gap-3">
          <LeftOutlined
            className="text-lg cursor-pointer"
            onClick={handleGoBack}
          />
          <h1 className="text-4xl font-bold py-4 text-[#1B7443]">
            Shipping Policy
          </h1>
        </div>
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
          <div>
          {/* <div
      className="terms-container"
      dangerouslySetInnerHTML={{ __html: privesyPolicy }}
    /> */}
          </div>
        </div>
        <Button
          onClick={handleOnSave}
          className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-[#1b7443] hover:!bg-[#1b7443] font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default ShippingPolicy;
