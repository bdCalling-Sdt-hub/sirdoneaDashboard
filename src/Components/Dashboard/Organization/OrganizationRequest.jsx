// RequestTable.js
import { useState, useEffect } from "react";
import { Table, Button, Input, Tooltip, ConfigProvider } from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const OrganizationRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/requestData.json"); // Adjust path if necessary
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "S.ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Event" className="w-8 h-8 rounded-full" />
      ),
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
    },
    {
      title: "Details",
      key: "details",
      render: () => (
        <Tooltip title="View Details">
          <Button icon={<EyeOutlined />} shape="circle" />
        </Tooltip>
      ),
    },
    {
      title: "Approve",
      key: "approve",
      render: () => (
        <Tooltip title="Approve">
          <Button
            icon={<CheckCircleOutlined />}
            shape="circle"
            className="text-green-800"
          />
        </Tooltip>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: () => (
        <Tooltip title="Delete">
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            className="text-red-500"
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="p-4 min-h-screen bg-[#FAF8F5]">
      {/* Header and Search */}
      <div className="bg-[#1b7443] rounded-t-lg p-4 flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">Request</h2>
        <Input.Search
          placeholder="Search User"
          className="w-64"
          style={{ borderRadius: "5px" }}
        />
      </div>

      {/* Table with Custom Theme */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "white",
              headerColor: "rgb(27,116,67)",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 8 }}
          loading={loading}
          rowKey="id"
          className="bg-white rounded-b-lg shadow-lg"
        />
      </ConfigProvider>
    </div>
  );
};

export default OrganizationRequest;
