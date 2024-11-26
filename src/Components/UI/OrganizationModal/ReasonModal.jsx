/* eslint-disable react/prop-types */
import { Button, Input, Modal } from "antd";
import { useState } from "react";

const ReasonModal = ({ visible, onClose }) => {
  const [reason, setReason] = useState("");

  // Handle the reason input change
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleCancel = () => {
    setReason("");
    onClose();
  };
  const handleSubmit = () => {
    // if (reason.trim() === "") {
    //   alert("Please provide a reason before submitting.");
    //   return;
    // }
    console.log("Reason for deletion:", reason);
    onClose();
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={600}
      className="custom-modal-bg"
    >
      <div className="flex flex-col items-center">
        {/* Textarea for reason */}
        <Input.TextArea
          className="bg-[#DEF2E7]"
          rows={5}
          placeholder="Write a reason"
          value={reason}
          onChange={handleReasonChange}
        />

        {/* Buttons */}
        <div className="flex justify-around w-full mt-5">
          <Button
            onClick={handleCancel}
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
            onClick={handleSubmit}
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

export default ReasonModal;
