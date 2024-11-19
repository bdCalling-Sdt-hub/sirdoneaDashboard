/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useEffect } from "react";

const ViewEarningModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  useEffect(() => {
    if (isViewModalVisible && currentRecord) {
      console.log("Current Record:", currentRecord);
    }
  }, [isViewModalVisible, currentRecord]);

  return (
    <Modal
      title={
        <div className="pt-5 text-center">
          <h2 className="text-[#1b7443] text-2xl font-semibold">
            User payment details
          </h2>
          <hr className="mt-2 border-t border-[#1b7443]" />
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:min-w-[400px]"
    >
      {currentRecord && (
        <div className="flex flex-col items-center p-5">
          <div className="text-center mb-5">
            <img
              src={
                currentRecord.avatar || "../../../public/images/userImage.png"
              }
              alt="avatar"
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <h1 className="text-lg font-semibold">{currentRecord.userName}</h1>
          </div>
          <h3 className="text-[#1b7443] font-semibold text-lg mb-2">
            Information
          </h3>
          <div className="text-left space-y-2">
            <p>
              Amount:{" "}
              <span className="font-semibold text-lg">
                ${currentRecord.amount}
              </span>
            </p>
            <p>
              Serial ID:<strong> {currentRecord.id}</strong>
            </p>
            <p>
              Email: <strong>{currentRecord.email}</strong>
            </p>
            <p>
              User Bank Account:{" "}
              <strong>
                ****
                {currentRecord.accNumber.slice(-4)}
              </strong>
            </p>
            <p>
              Time & Date: <strong>{currentRecord.time}</strong>
            </p>
            <p>
              Payment Method:{" "}
              <strong>{currentRecord.paymentMethod || "N/A"}</strong>
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewEarningModal;
