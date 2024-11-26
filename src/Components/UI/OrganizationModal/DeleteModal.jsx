/* eslint-disable react/prop-types */
// RequestDetailsModal.js

import { Button, Input, Modal } from "antd";

const DeleteModal = ({ visible, onClose, data }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="custom-modal-bg"
      bodyStyle={{
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div className="flex flex-col items-center ">
        {/* Textarea */}
        <Input.TextArea
          className="bg-[#DEF2E7]"
          rows={5}
          placeholder="Write a reason"
          //   value={reason}
          //   onChange={(e) => setReason(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-around w-full  mt-5">
          <Button
            // onClick={handleCancel}
            style={{
              backgroundColor: "#FFB8B8",
              color: "red",
              border: "none",
              borderRadius: "5px",
              fontWeight: "200",
              width: "100px",
            }}
          >
            Cancel
          </Button>
          <Button
            // onClick={handleSubmit}
            style={{
              backgroundColor: "#1B7443",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "200",
              width: "100px",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
