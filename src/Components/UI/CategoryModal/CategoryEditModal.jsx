/* eslint-disable react/prop-types */
// ProductDetailsModal.js
import { Button, ConfigProvider, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

const CategoryEditModal = ({ visible, onClose, product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  if (!product) return null; // If no product is selected, don't render

  const handleUpload = (info) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
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
        className=" rounded-lg"
      >
        <div className="p-5">
          <div className="flex items-center justify-center mb-4">
            <div className="flex flex-col items-center justify-center w-full  ">
              <div className="relative w-[572px] h-[338px] rounded-sm  flex justify-center items-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className=" w-full h-[338px]  object-cover rounded-sm "
                  />
                ) : (
                  <img
                    src={product.images}
                    alt="Uploaded"
                    className=" w-full h-[338px]  object-cover rounded-sm"
                  />
                )}
                <Upload
                  className="absolute bottom-0 right-0 flex justify-center items-center"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={handleUpload}
                >
                  <div className="bg-[#40C4FF] text-white w-8 h-8 rounded-full flex justify-center items-center">
                    <MdModeEdit className="text-2xl font-bold" />
                  </div>
                </Upload>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="">Change Category Name</label>
            <br />
            <Input
              className=" w-[584px] border border-green-600"
              placeholder={product.product}
              rows={4}
            />
          </div>

          <div className="text-center">
            <Button
              className="mt-6 h-12 w-80 bg-[#1b7443] text-white text-lg "
              onClick={onClose}
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
