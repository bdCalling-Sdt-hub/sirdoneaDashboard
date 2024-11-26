import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Input,
  Table,
  Tag,
  Tooltip,
  Modal,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrDownload } from "react-icons/gr";
import ReasonModal from "../../UI/OrganizationModal/ReasonModal"; // ReasonModal component
import RequestDetailsModal from "../../UI/OrganizationModal/ReqDetailsModal"; // RequestDetailsModal component

const OrganizationRequest = () => {
  const [data, setData] = useState([]); // Raw data
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on search
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [reasonModalVisible, setReasonModalVisible] = useState(false); // Reason modal visibility
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/requestData.json"); // Adjust path if necessary
        setData(response.data);
        setFilteredData(response.data); // Initially, show all data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle the search input change
  const handleSearch = (value) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredData(data); // Show all data if search is empty
    } else {
      // Filter data based on the search term (case-insensitive)
      const lowercasedValue = value.toLowerCase();
      const filtered = data.filter((record) => {
        return (
          record.eventName.toLowerCase().includes(lowercasedValue) ||
          record.name.toLowerCase().includes(lowercasedValue) ||
          record.target.toLowerCase().includes(lowercasedValue)
        );
      });
      setFilteredData(filtered); // Update filtered data
    }
  };

  // Open Delete Confirmation Modal
  const handleDelete = (record) => {
    setSelectedDelete(record); // Store the record to delete
    setDeleteVisible(true); // Show delete confirmation modal
  };

  const handleDeleteClose = () => {
    setDeleteVisible(false); // Close the delete modal
    setSelectedDelete(null);
  };

  // Handle deletion confirmation
  const handleConfirmDelete = () => {
    // Close the delete modal
    setDeleteVisible(false);
    // Open the reason modal for deleting
    setReasonModalVisible(true);
  };

  // Close Reason Modal
  const handleReasonModalClose = () => {
    setReasonModalVisible(false); // Close the reason modal
    setSelectedDelete(null); // Reset selected record for deletion
  };

  // Show Details Modal
  const showDetailsModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: "SL ID",
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
      title: "Organization",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Organizer",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "Approve or Deny",
      dataIndex: "approve",
      key: "approve",
      render: (approve) => {
        let bgColor = "";
        let color = "";
        if (approve === "Approved") {
          bgColor = "#DEF2E7";
          color = "#1B7443";
        } else {
          bgColor = "#F1F2DE";
          color = "#9FA800";
        }

        return (
          <Tag
            className="ml-4"
            style={{
              backgroundColor: bgColor,
              border: "none",
              color: color,
              fontSize: "16px",
              padding: "2px 8px",
            }}
          >
            {approve}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "delete",
      render: (_, record) => (
        <div className="flex">
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              shape="circle"
              className="-ml-4 mr-2"
              onClick={() => showDetailsModal(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              shape="circle"
              className="text-red-500"
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header and Search */}
      <div className="bg-[#1b7443] rounded-t-lg p-4 flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">
          Organization Request
        </h2>
        <div className="flex items-center flex-col md:flex-row gap-5">
          <Input.Search
            placeholder="Search User"
            className="w-64"
            style={{ borderRadius: "5px" }}
            value={searchTerm} // Bind the search term state
            onChange={(e) => handleSearch(e.target.value)} // Handle search input change
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
              cellFontSizeMD: 14,
              cellFontSizeLG: 18,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredData} // Display the filtered data
          pagination={{ pageSize: 8 }}
          loading={loading}
          rowKey="id"
          className="bg-white rounded-b-lg shadow-lg mt-4"
          scroll={{ x: true }}
        />
      </ConfigProvider>

      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "rgb(255,239,217)",
              headerBg: "rgb(255,239,217)",
            },
            Button: {
              colorPrimary: "#1B7443",
              colorPrimaryHover: "#3B6441",
              colorPrimaryTextHover: "rgb(0,0,0)",
              defaultBg: "#C8F0DA",
              defaultHoverColor: "rgb(0,0,0)",
              defaultHoverBorderColor: "rgb(0,0,0)",
            },
          },
        }}
      >
        {/* Delete Confirmation Modal */}
        <Modal
          title="Confirm Deletion"
          open={deleteVisible}
          onCancel={handleDeleteClose}
          onOk={handleConfirmDelete}
          okText="Yes, Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this record?</p>
        </Modal>
      </ConfigProvider>

      {/* Reason Modal */}
      {reasonModalVisible && (
        <ReasonModal
          visible={reasonModalVisible}
          onClose={handleReasonModalClose}
          data={selectedDelete}
        />
      )}

      {/* Request Details Modal */}
      {selectedRecord && (
        <RequestDetailsModal
          visible={isModalVisible}
          onClose={closeModal}
          data={selectedRecord}
        />
      )}
    </div>
  );
};

export default OrganizationRequest;
