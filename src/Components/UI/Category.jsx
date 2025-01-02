import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useCreateCategoryMutation } from "../../Redux/api/categoryApi";
import Swal from "sweetalert2";

const CategoryAdd = ({setIsAddModalVisible, refetch}) => {
  const [imageFile, setImageFile] = useState(null);
  // const [imageFile2, setImageFile2] = useState(null);
  // console.log({ imageFile });
  const [addCategory] = useCreateCategoryMutation();

  const handleUpload = (info) => {
    console.log({info});
    
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj || null;
      console.log(file);
      // setImageFile2(info.fileList);
      
      setImageFile(file); 
    } else {
      console.warn("No file was uploaded.");
    }
  };

  const handleSubmit = async(values) => {

    console.log("Image File:", imageFile);

  if (!imageFile) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Please upload an image.",
    });
    return;
  }

  const formData = new FormData();

  // Append category data to the form
  formData.append("name", values.name); // This will be accessible as req.body.name on the backend

  // Append the image file
  formData.append("image", imageFile); 

    try {
  //  console.log({formData});
   
      const response = await addCategory(formData).unwrap();
      console.log("category response:", response);

      if (response.success === true) {
        
        // toast.success("OTP verified successfully!");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Category added successfully.",
        });

        setIsAddModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.data?.message) {
        // toast.error("Invalid OTP. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.data?.message,})
      } else {
        // toast.error("Failed to verify OTP. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to added. Please try again.",})
      }
    }



  };

  return (
    <div className="flex justify-center">
      <div>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
        
          className="w-[584px] bg-white p-6 rounded-sm"
        >
          <Form.Item>
            <div className="relative w-full h-[330px] rounded-sm flex justify-center items-center border border-dashed">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded"
                  className="absolute w-full h-full object-cover rounded-sm"
                />
              ) : (
                <p className="text-[#8E8E93] text-xl text-center">
                  Upload Image Here
                </p>
              )}
              <Upload
  className="absolute flex justify-center items-center"
  listType="picture-card"
  showUploadList={false}
  beforeUpload={(file) => {
    console.log("Selected file:", file);
    setImageFile(file);
    return false; // Prevent automatic upload
  }}
  onChange={handleUpload}
>
  {imageFile ? null : (
    <div className="bg-[#000000B2] text-white w-14 h-14 rounded-full flex justify-center items-center">
      <FaPlus className="text-5xl font-bold" />
    </div>
  )}
</Upload>
            </div>
          </Form.Item>

          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please enter a category name!" }]}
          >
            <Input
              className="placeholder:text-gray-500"
              placeholder="Enter category name"
            />
          </Form.Item>

          <div className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="mt-6 h-12 w-80 text-lg"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CategoryAdd;
