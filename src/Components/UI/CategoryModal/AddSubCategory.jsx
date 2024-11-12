// AddSubCategoryModal.js
import React from "react";
import { Modal, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddSubCategoryModal = ({ visible, onClose, onSave }) => {
  return (
    <Modal
      open={visible} // or use `visible={visible}` in older versions of Ant Design
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      className="rounded-lg"
    >
      <div className="p-6 bg-[#FAF8F5]">
        <div className="mt-4">
          <Input placeholder="Enter Sub Category Name" className="mb-4" />
          <Button
            type="primary"
            className="w-full bg-[#1B7443] text-white py-2 rounded-md"
            onClick={onSave}
          >
            Save Sub Category
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSubCategoryModal;
