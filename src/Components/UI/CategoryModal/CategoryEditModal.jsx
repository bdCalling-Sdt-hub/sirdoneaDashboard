import { Button, ConfigProvider, Input, Modal, Upload } from "antd";
import { useState, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { useUpdateCategoryMutation } from "../../../Redux/api/categoryApi";
import Swal from "sweetalert2";

const CategoryEditModal = ({ visible, onClose, product, refetch }) => {
  const [categoryName, setCategoryName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    setCategoryName(product?.name || "");
    setImageUrl(`http://139.59.0.25:8050/${product?.image}`);
  }, [product]);

  const handleUpload = (info) => {
    console.log('Upload info:', info);
    if (info.file) {
      setImageUrl2(info.file); // Ensure the file is being stored
      setImageUrl(URL.createObjectURL(info.file)); // Update the preview
    } else {
      console.warn("No file was uploaded");
    }
  };
  
  // console.log({imageUrl});
  
  const handleSave = async () => {
    const formData = new FormData();
  
    if (categoryName) {
      formData.append("name", categoryName);
    }
    if (imageUrl2) {
      formData.append("image", imageUrl2);
    }
    console.log('name', categoryName, 'image', imageUrl2);
    
  
    // // Debug FormData
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
  
    try {
      const response = await updateCategory({id:product._id, formData}).unwrap();
      console.log("Category response:", response);
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.message,
        });
        refetch();
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.data?.message || "Failed to update. Please try again.",
      });
    }
  };
  

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "rgb(255,239,217)",
            colorBorder: "#FEBC60",
          },
        },
      }}
    >
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
        width={600}
        className="rounded-lg"
      >
        <div className="p-5">
          <div className="flex items-center justify-center mb-4">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="relative w-[572px] h-[338px] rounded-sm flex justify-center items-center">
                {imageUrl ? (
                  <img
                    src={ imageUrl  ? imageUrl : `http://139.59.0.25:8050/${product?.image}`}
                    alt="Uploaded"
                    className="w-full h-[338px] object-cover rounded-sm"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full bg-gray-200">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <Upload
  className="absolute bottom-0 right-0 flex justify-center items-center"
  listType="picture-card"
  showUploadList={false}
  onChange={handleUpload}
  beforeUpload={(file) => {
    setImageUrl2(file); // Handle file upload for preview
    setImageUrl(URL.createObjectURL(file)); // Update the preview
    return false; // Prevent automatic upload
  }}
>
  <div className="bg-[#40C4FF] text-white w-8 h-8 rounded-full flex justify-center items-center">
    <MdModeEdit className="text-2xl font-bold" />
  </div>
</Upload>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label>Change Category Name</label>
            <br />
            <Input
              className="w-[584px] border border-green-600"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="text-center">
            <Button
              className="mt-6 h-12 w-80 bg-[#1b7443] text-white text-lg"
              onClick={handleSave}
            >
              Save Change
            </Button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default CategoryEditModal;
