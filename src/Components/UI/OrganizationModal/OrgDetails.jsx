/* eslint-disable react/prop-types */
// OrganizationDetails.js
import React from "react";
import { Button, Modal } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const OrganizationDetails = ({ visible, onClose, data }) => {
  if (!data) return null;

  console.log(data);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      className="bg-[#FAF8F5] rounded-lg"
    >
      <div className="p-5">
        <div className="flex items-center text-[#1b7443] mb-6">
          <ArrowLeftOutlined
            onClick={onClose}
            className="cursor-pointer mr-2"
          />
          <span className="text-lg font-semibold">Details</span>
        </div>

        <h2 className="text-center text-[#1b7443] text-2xl font-bold mb-4">
          Organization Name: {data.organization}
        </h2>

        <div className="flex justify-between items-center mb-6">
          <img
            src={data.image}
            alt="Event"
            className="w-40 h-40 rounded-lg object-cover"
          />
          <div className="text-right">
            <p className="text-green-600 font-semibold">
              Starting Date: {data.startDate}
            </p>
            <p className="text-red-600 font-semibold">
              Ending Date: {data.endDate}
            </p>
          </div>
        </div>

        <p className="text-lg font-semibold mb-1">
          Organization Creator Name:{" "}
          <span className="font-normal">{data.name}</span>
        </p>
        <p className="text-lg font-semibold mb-1">
          Target: <span className="font-normal">{data.target}</span>
        </p>
        <p className="text-lg font-semibold mb-4">
          Percentage: <span className="font-normal">{data.percentage}</span>
        </p>

        <h3 className="text-lg font-semibold mb-2">Organization’s Details</h3>
        <p className="text-gray-600 whitespace-pre-line">{data.details}</p>

        <div className="flex justify-center mt-8">
          <Button
            type="primary"
            onClick={onClose}
            className="bg-[#1b7443] text-white px-8 py-2 rounded-full"
          >
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrganizationDetails;
