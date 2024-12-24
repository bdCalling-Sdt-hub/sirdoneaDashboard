import { EyeOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { GrDownload } from "react-icons/gr";
import OrganizationDetails from "../../UI/OrganizationModal/OrgDetails";
import { useGetAllOrganizersQuery } from "../../../Redux/api/organizerApi";

const OrganizationTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: organizers, isLoading } = useGetAllOrganizersQuery();

  console.log("organizers", organizers?.data);
  

  useEffect(() => {
    if (Array.isArray(organizers?.data)) {
      setFilteredData(organizers.data);
    } else {
      setFilteredData([]); // Ensure filteredData is always an array
    }
  }, [organizers]);

  const handleSearch = (value) => {
    setSearchQuery(value);

    const filtered = organizers?.data?.filter((record) => {
      const fullName = `${record.firstName || ""} ${record.lastName || ""}`.toLowerCase();
      const organizationName = record.organizationDetails?.organizationName?.toLowerCase() || "";
      const id = record._id.toString();

      return (
        fullName.includes(value.toLowerCase()) ||
        organizationName.includes(value.toLowerCase()) ||
        id.includes(value.toLowerCase())
      );
    });

    setFilteredData(filtered || []); // Fallback to empty array
  };

  const handleDetailsClick = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: "SL ID",
      dataIndex: "_id",
      render: (_, __, index) => `${index + 1}`,
      key: "id",
    },
    {
      title: "Name",
      key: "name",
      render: (record) => `${record?.organizerInfo?.firstName || ""} ${record?.organizerInfo?.lastName || ""}` || "N/A",
    },
    {
      title: "Organization",
      key: "organization",
      render: (record) => record.organizationDetails?.organizationName || "N/A",
    },
    {
      title: "Start Date",
      key: "startDate",
      render: (record) => {
        const info = record.fundraiserInformation;
        return info
          ? `${info.year || ""}/ ${info.startMonth || ""}/ ${info.startDay || ""}/ ${info.startTime || ""}`
          : "N/A";
      },
    },
    {
      title: "Ending Date",
      key: "endDate",
      render: (record) => {
        const info = record.fundraiserInformation;
        return info
          ? `${info.year || ""}/ ${info.endMonth || ""}/ ${info.endDay || ""}/ ${info.endTime || ""}`
          : "N/A";
      },
    },
    {
      title: "Target",
      key: "target",
      render: (record) => record.fundraiserInformation?.goal || "N/A",
    },
    {
      title: "Total Sells",
      dataIndex: "totalSells",
      key: "totalSells",
      render: (totalSells) => totalSells || "0",
    },
    {
      title: "Code",
      dataIndex: "uniquePopsCode",
      key: "uniquePopsCode",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = { running: "green", completed: "red", pending: "orange" };
        return <Tag color={colors[status] || "blue"}>{status || "Unknown"}</Tag>;
      },
    },
    {
      title: "Actions",
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
    
  ];

  return (
    <div className="min-h-screen bg-white rounded-tr-lg">
      <div className="bg-[#1b7443] p-4 flex justify-between">
        <h2 className="text-white text-lg font-semibold">All Organization</h2>
        <div className="flex items-center flex-col md:flex-row gap-5">
          <Input.Search
            placeholder="Search..."
            className="w-64"
            style={{ borderRadius: "5px" }}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {/* <button className="rounded-full bg-white w-10 h-10 md:w-10 flex items-center justify-center">
            <GrDownload className="text-4xl text-[#1B7443] p-2" />
          </button> */}
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: { headerBg: "#C8F0DA", headerColor: "#1B7443" },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={Array.isArray(filteredData) ? filteredData : []} // Ensure an array
          pagination={{ pageSize: 8 }}
          loading={isLoading}
          rowKey="_id"
          className="bg-white rounded-b-lg shadow-lg mt-4"
          scroll={{ x: true }}
        />
      </ConfigProvider>
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
