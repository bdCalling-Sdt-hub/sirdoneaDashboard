import { useState, useEffect } from "react";
import { Table, Input, Button, Tag, Tooltip, ConfigProvider } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import OrganizationDetails from "../../UI/OrganizationModal/OrgDetails";

const OrganizationTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/public/data/organizationData.json"); // Adjust path if necessary
        console.log(response);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "Starting Date",
      dataIndex: "startDate",
      key: "startDate",
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
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <Tooltip title="View Details">
          <Button
            icon={<EyeOutlined />}
            shape="circle"
            onClick={() => handleDetailsClick(record)}
          />
        </Tooltip>
      ),
    },
    {
      title: "Situation",
      dataIndex: "situation",
      key: "situation",
      render: (status) => {
        let color = "";
        if (status === "Running") color = "green";
        else if (status === "Completed") color = "red";
        else if (status === "Pending") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const handleDetailsClick = (record) => {
    setSelectedRecord(record); // Set the selected record data
    setIsModalVisible(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRecord(null); // Reset the selected record
  };

  return (
    <div className="min-h-screen">
      {/* Header and Search */}
      <div className="bg-[#1b7443] rounded-t-lg p-4 flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">All Organization</h2>
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

      {/* Organization Details Modal */}
      {isModalVisible && (
        <OrganizationDetails
          visible={isModalVisible}
          onClose={handleModalClose}
          data={selectedRecord}
        />
      )}
    </div>
  );
};

export default OrganizationTable;
