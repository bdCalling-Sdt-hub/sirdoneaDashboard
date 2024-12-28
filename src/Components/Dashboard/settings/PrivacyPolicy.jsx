import { LeftOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddSettingsMutation, useGetSettingsQuery, useUpdateSettingsMutation } from "../../../Redux/api/settingsApi";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Fetch privacy policy data
  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();
  console.log('privacyPolicy', getSettingsData?.data);
  console.log('privacyPolicy-1', getSettingsData?.data?.privacyPolicy);

  // Mutations for adding and updating privacy policy
  const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Load privacy policy data on component mount
  useEffect(() => {
    if (getSettingsData?.data?.privacyPolicy) {
      setContent(getSettingsData?.data?.privacyPolicy); // Load the latest policy
    }
  }, [getSettingsData]);

    const handleOnSave = async () => {
    try {
      if (getSettingsData?.data) {
        // Update existing privacy policy
   const res =  await updateSettings({ privacyPolicy: content }).unwrap();
   if(res.success){
     Swal.fire({
       icon: "success",
       title: "Success!",
       text: "Privacy Policy updated successfully.",
     })
   }
      } else {
        // Add a new privacy policy if not existing
     const res =  await addSettings({ privacyPolicy: content }).unwrap();
     if(res.success){
       Swal.fire({   
         icon: "success",
         title: "Success!",
         text: "Privacy Policy added successfully.",
       })
     }
      }
      refetch(); // Refresh the data after save
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to save Privacy Policy. Please try again.",
      })
      console.error("Save error:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading Privacy Policy..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Privacy Policy. Please try again later.
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
            Privacy Policy
          </h1>
        </div>
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <Button
          onClick={handleOnSave}
          className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-[#1B7443] hover:!bg-[#1B7443] font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
