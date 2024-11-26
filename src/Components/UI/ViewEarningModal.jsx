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
          <hr className="mt-2 border-t border-[#B2DAC4]" />
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:min-w-[400px]"
    >
      {currentRecord && (
        <div className="flex flex-col p-5">
          <div className="flex items-center justify-center gap-8">
            <img
              src={
                currentRecord.avatar || "../../../public/images/userImage.png"
              }
              alt="avatar"
              className="w-32 h-32   mb-2"
            />
            <h1 className="text-lg font-semibold">{currentRecord.userName}</h1>
          </div>
          <h3 className="text-[#1b7443] font-semibold text-2xl mb-2 mt-6 text-center">
            Information
          </h3>
          <div className="ml-8 space-y-2 text-[#000000]">
            <p>
              Amount: <span className="">${currentRecord.amount}</span>
            </p>
            <p>Serial ID {currentRecord.id}</p>
            <p>Email:{currentRecord.email}</p>
            <p>
              User Bank Account: ****
              {currentRecord.accNumber.slice(-4)}
            </p>
            <p>Time & Date:{currentRecord.time}</p>
            <p>Payment Method: {currentRecord.paymentMethod || "N/A"}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewEarningModal;
