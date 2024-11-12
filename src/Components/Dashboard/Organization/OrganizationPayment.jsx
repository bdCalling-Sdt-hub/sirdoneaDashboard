// PaymentTable.js
import { useState, useEffect } from "react";
import { Table, Button, Input, Tooltip, Tag, ConfigProvider } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";

const OrganizationPayment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/paymentData.json"); // Adjust the path as needed
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
      title: "Organizer",
      dataIndex: "founderName",
      key: "founderName",
    },
    {
      title: "Organization",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Ending Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "Sells",
      dataIndex: "sells",
      key: "sells",
    },
    // {
    //   title: "Per.(%)",
    //   dataIndex: "percentage",
    //   key: "percentage",
    // },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Tag
          color={record.status === "Completed" ? "red" : "#1b7443"}
          className="px-3 py-1 rounded-lg cursor-pointer"
        >
          {record.status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-4 min-h-screen bg-[#FAF8F5]">
      {/* Header and Search */}
      <div className="bg-[#1b7443] rounded-t-lg p-4 flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">Payment</h2>
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

export default OrganizationPayment;
