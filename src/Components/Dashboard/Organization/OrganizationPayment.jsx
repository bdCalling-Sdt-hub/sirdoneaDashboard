import { EyeOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrDownload } from "react-icons/gr";
import OrgPayment from "../../UI/OrganizationModal/OrgPayment";
import CheckPayoutModal from "../../UI/OrganizationPaymentModal/CheckPayoutModal"; // Import the CheckPayoutModal
import DirectDepositModal from "../../UI/OrganizationPaymentModal/DirectDepositModal";
import PayNowModal from "../../UI/OrganizationPaymentModal/PayNowModal";

const OrganizationPayment = () => {
  const [data, setData] = useState([]); // Raw data
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on search
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Actions modal state
  const [isActionVisible, setActionVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  // Details modal state
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedDetailsRecord, setSelectedDetailsRecord] = useState(null);

  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  // Show actions modal
  const showActionsModal = (record) => {
    setSelectedAction(record); // Set the selected record
    setActionVisible(true); // Show the modal
  };

  // Close actions modal
  const closeActionsModal = () => {
    setActionVisible(false); // Hide the modal
    setSelectedAction(null); // Clear the selected action
  };

  // Show detailed modal based on payout option or status
  const showDirectsModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  // Show details modal
  const showDetailsModal = (record) => {
    setSelectedDetailsRecord(record); // Store the clicked record's data
    setIsDetailsModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setIsDetailsModalVisible(false); // Hide the modal
    setSelectedDetailsRecord(null); // Clear the selected record
  };

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/paymentData.json"); // Fetch your data
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
    setSearchTerm(value); // Update search term

    if (value.trim() === "") {
      setFilteredData(data); // Show all data if search is empty
    } else {
      // Perform case-insensitive search on relevant fields
      const lowercasedValue = value.toLowerCase();
      const filtered = data.filter((record) => {
        return (
          record.founderName.toLowerCase().includes(lowercasedValue) ||
          record.eventName.toLowerCase().includes(lowercasedValue) ||
          record.target.toLowerCase().includes(lowercasedValue)
        );
      });
      setFilteredData(filtered); // Update filtered data
    }
  };

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
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Payout option",
      dataIndex: "payoutOption",
      key: "payoutOption",
      render: (_, record) => (
        <Tag
          className={`px-3 py-1 rounded-lg cursor-pointer font-semibold ${
            record.payoutOption === "Direct Deposit"
              ? "bg-[#1b7443] text-white"
              : "bg-[#B2DAC4] text-[#1b7443]"
          }`}
          onClick={() => showDirectsModal(record)}
        >
          {record.payoutOption}
        </Tag>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <Tooltip title="View Details">
          <Button
            icon={<EyeOutlined />}
            shape="circle"
            onClick={() => showDetailsModal(record)}
          />
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Tag
          color={record.status === "Pay Now" ? "red" : "#1b7443"}
          className="px-3 py-1 rounded-lg cursor-pointer"
          onClick={() => showActionsModal(record)} // Open actions modal when status is "Pay Now"
        >
          <div>{record.status}</div>
        </Tag>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header and Search */}
      <div className="bg-[#1b7443] rounded-t-lg p-4 flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">Payment</h2>
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
              headerBg: "white",
              headerColor: "rgb(27,120,67)",
              colorTextHeading: "rgb(27,116,67)",
              fontWeightStrong: 500,
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
          className="bg-white rounded-b-lg shadow-lg"
          scroll={{ x: true }}
        />
      </ConfigProvider>

      {/* Details modal actions */}
      {isDetailsModalVisible && selectedDetailsRecord && (
        <OrgPayment
          visible={isDetailsModalVisible}
          onClose={handleModalClose}
          data={selectedDetailsRecord}
        />
      )}

      {/* Show PayNowModal if selectedAction's status is "Pay Now" */}
      {selectedAction &&
        isActionVisible &&
        selectedAction.status === "Pay Now" && (
          <PayNowModal
            visible={isActionVisible}
            onClose={closeActionsModal}
            data={selectedAction}
          />
        )}

      {/* Show other modals for other payout options */}
      {selectedRecord &&
        isModalVisible &&
        (selectedRecord.payoutOption === "Check Payout" ? (
          <CheckPayoutModal
            visible={isModalVisible}
            onClose={closeModal}
            data={selectedRecord}
          />
        ) : (
          <DirectDepositModal
            visible={isModalVisible}
            onClose={closeModal}
            data={selectedRecord}
          />
        ))}
    </div>
  );
};

export default OrganizationPayment;
