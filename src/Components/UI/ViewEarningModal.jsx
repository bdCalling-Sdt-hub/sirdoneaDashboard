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
        <div className="pt-5">
          <h2 className="text-secondary-color text-3xl mb-5">
            User payment details
          </h2>
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:min-w-[600px]"
    >
      {currentRecord && (
        <div>
          <div className="rounded-xl bg-[#F5F9FE] p-5">
            <h2 className="border-b border-secondary-color text-2xl pb-2 px-3">
              User information:
            </h2>
            <div className="flex justify-start items-center gap-2 mt-3 mb-5">
              <img
                src={
                  currentRecord.avatar || "../../../public/images/userImage.png"
                }
                alt="avatar"
                className="w-14 h-14 rounded-full mr-4"
              />
              <div>
                <h1 className="sm:text-lg lg:text-2xl font-medium">
                  {currentRecord.userName}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-[#4E4E4E]">
                  {currentRecord.role}
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg">User name:</p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  {currentRecord.userName}
                </p>
              </div>
              <div className="flex gap-2 mb-3">
                <p className="text-sm sm:text-base lg:text-lg">
                  Contact number:
                </p>
                <p className="text-sm sm:text-base lg:text-lg  font-semibold">
                  {currentRecord.contactNumber}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg">Email:</p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  {currentRecord.email}
                </p>
              </div>
              <div className="flex gap-2 mb-0 ">
                <p className="text-sm sm:text-base lg:text-lg">Date:</p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  {currentRecord.date}
                </p>
              </div>
            </div>
            {/* <div className="rounded-xl bg-[#F5F9FE] p-5">
              <h2 className="border-b border-secondary-color text-3xl pb-2 px-3">
                Subscriptions plan
              </h2>
              <div>
                <h2 className="text-3xl mt-3 mb-4 font-semibold">
                  {currentRecord.subscriptionPlan || "Premium"}
                </h2>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-secondary-color font-semibold mb-3">
                    {currentRecord.subscriptionPrice || "$9.99/mo"}
                  </p>
                  <ul>
                    <li className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#222222] -mt-4">
                        <MdOutlineDone className="size-3 text-primary-color" />
                      </div>
                      <p className="sm:text-lg lg:text-xl text-[#222222] mb-5">
                        Audio call
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#222222] -mt-4">
                        <MdOutlineDone className="size-3 text-primary-color" />
                      </div>
                      <p className="sm:text-lg lg:text-xl text-[#222222] mb-5">
                        Video call
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
          <div className="rounded-xl bg-[#F5F9FE] p-5">
            <h2 className="border-b border-secondary-color text-3xl pb-2 px-3 mb-5">
              Transaction information:
            </h2>
            <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg">User name:</p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  {currentRecord.userName}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg">
                  Transaction number:
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  {currentRecord.transactionNumber || "N/A"}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg">Email:</p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  {currentRecord.email}
                </p>
              </div>
              <div className="flex gap-2 mb-3 ">
                <p className="text-sm sm:text-base lg:text-lg">
                  Contact number:
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  {currentRecord.contactNumber}
                </p>
              </div>
              <div className="flex gap-2 mb-0 ">
                <p className="text-sm sm:text-base lg:text-lg">Amount:</p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold">
                  {currentRecord.amount || "$750"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewEarningModal;
