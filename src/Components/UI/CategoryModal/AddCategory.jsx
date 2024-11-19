/* eslint-disable react/prop-types */
import { Modal, Input, Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddCategoryModal = ({ visible, onClose, onSave }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      className="rounded-lg"
    >
      <div className="p-6 bg-[#FAF8F5]">
        {/* Image Upload Section */}
        <Upload
          listType="picture-card"
          showUploadList={false}
          className="w-full flex items-center justify-center bg-white border border-dashed rounded-lg h-40 mb-4"
        >
          <div className="text-center">
            <PlusOutlined className="text-2xl text-gray-500" />
            <p className="text-gray-500 mt-2">Upload Image Here</p>
          </div>
        </Upload>

        {/* Category Name Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <Input
            placeholder="Enter category name"
            className="w-full border-gray-300 rounded-md"
          />
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <Button
            type="primary"
            className="w-full bg-[#1B7443] text-white py-2 rounded-md"
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
