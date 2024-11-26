import { EyeOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrDownload } from "react-icons/gr";
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
      title: "SL ID",
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
      title: "Start Date",
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
      title: "Actual",
      dataIndex: "sells",
      key: "sells",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
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
      title: "Status",
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
    <div className="min-h-screen bg-white rounded-tr-lg">
      {/* Header and Search */}
      <div className="bg-[#1b7443]  p-4 flex justify-between ">
        <h2 className="text-white text-lg font-semibold">All Organization</h2>
        <div className="flex items-center flex-col md:flex-row gap-5">
          <Input.Search
            placeholder="Search User"
            className="w-64"
            style={{ borderRadius: "5px" }}
          />
          <button className="rounded-full bg-white w-10 h-10 md:w-10 flex items-center justify-center">
            <GrDownload className="text-4xl text-[#1B7443] p-2" />
          </button>
        </div>
      </div>

      {/* Table with Custom Theme */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              bodySortBg: "rgb(204,148,148)",
              borderColor: "#E7E7E7",
              expandIconBg: "rgb(217,194,194)",
              filterDropdownBg: "rgb(56,191,65)",
              filterDropdownMenuBg: "rgb(206,111,111)",
              fixedHeaderSortActiveBg: "rgb(129,78,78)",
              headerBg: "#C8F0DA",
              headerColor: "rgb(27,120,67)",
              headerSplitColor: "rgb(200,240,218)",
              fontWeightStrong: 500,
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
          className="bg-white rounded-b-lg shadow-lg mt-4"
          scroll={{ x: true }}
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
