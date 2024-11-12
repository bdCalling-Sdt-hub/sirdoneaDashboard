/* eslint-disable react/prop-types */
// RequestDetailsModal.js
import React from "react";
import { Modal, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const RequestDetailsModal = ({ visible, onClose, data }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      className="rounded-lg"
      bodyStyle={{
        backgroundColor: "#FAF8F5",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div className="flex items-center mb-4">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onClose}
          className="bg-transparent text-black border-none"
        />
        <h2 className="text-center w-full text-2xl font-semibold">
          Request Details
        </h2>
      </div>

      <div className="bg-[#1B7443] text-white p-4 rounded-t-lg text-center">
        <h3 className="text-xl font-semibold">
          Organization Name: {data.organizationName}
        </h3>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4">
          <img
            src={data.image || "../images/default.jpg"}
            alt="Organization"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div>
            <p className="text-lg font-semibold">Organization Creator:</p>
            <p>{data.creatorName}</p>
            <p className="text-lg font-semibold mt-2">Target:</p>
            <p>{data.target}</p>
            <p className="text-lg font-semibold mt-2">Percentage:</p>
            <p>{data.percentage}%</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-semibold">Organization’s Details:</h4>
          <p className="mt-2 text-gray-700">{data.details}</p>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          onClick={() => console.log("Delete clicked")}
          className="bg-red-500 text-white px-6 py-2 rounded-md"
        >
          Delete
        </Button>
        <Button
          onClick={() => console.log("Approve clicked")}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Approve
        </Button>
      </div>
    </Modal>
  );
};

export default RequestDetailsModal;
