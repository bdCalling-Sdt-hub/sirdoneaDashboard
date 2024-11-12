import { useState, useEffect, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Input,
  ConfigProvider,
  Table,
  Button,
  Modal,
  Tooltip,
  Select,
} from "antd";
import axios from "axios";
import moment from "moment";

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Canceled"];

export default function Orders() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/orderData.json");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.customerName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const onSearch = (value) => setSearchText(value);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleStatusChange = (value, record) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.order_id === record.order_id
          ? { ...item, order_status: value }
          : item
      )
    );
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  return (
    <div className="min-h-[90vh] bg-[#1b7443] rounded-lg">
      <div className="flex items-center justify-between p-3">
        <h1 className="text-2xl font-bold text-white">Orders List</h1>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorTextPlaceholder: "rgb(0, 0, 0, 0.5)",
                colorBgContainer: "white",
              },
            },
          }}
        >
          <Input
            placeholder="Search Orders"
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
            className="text-base font-semibold"
            prefix={
              <SearchOutlined className="text-[#2B4257] font-bold text-lg mr-2" />
            }
            style={{
              width: 280,
              padding: "8px 16px",
              backgroundColor: "#F3F3F3",
              border: "1px solid white",
              color: "#010515",
            }}
          />
        </ConfigProvider>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgb(255,255,255)",
              colorBgContainer: "rgb(255,255,255)",
              colorText: "rgb(0,0,0)",
              borderColor: "rgb(73,72,72,0.1)",
              headerColor: "#1b7443",
              footerBg: "rgb(255,255,255)",
            },
          },
        }}
      >
        <Table
          dataSource={filteredData}
          loading={loading}
          pagination={{ pageSize: 10 }}
          rowKey="order_id"
          scroll={{ x: true }}
        >
          <Table.Column title="Order ID" dataIndex="orderId" key="order_id" />
          <Table.Column
            title="Customer Name"
            dataIndex="customerName"
            key="customerName"
          />
          <Table.Column
            title="Organization"
            dataIndex="organizationName"
            key="organizationName"
          />
          <Table.Column
            title="Date"
            dataIndex="date"
            key="date"
            render={(date) => moment(date).format("MM/DD/YYYY")}
          />
          <Table.Column
            title="Total Items"
            dataIndex="totalItems"
            key="totalItems"
          />
          <Table.Column title="Total" dataIndex="totalPrice" key="totalPrice" />
          <Table.Column
            title="Order Status"
            dataIndex="orderStatus"
            key="orderStatus"
          />
          <Table.Column
            title="Change Status"
            dataIndex="orderStatus"
            key="orderStatus"
            render={(status, record) => (
              <Select
                value={status}
                onChange={(value) => handleStatusChange(value, record)}
                options={statuses.map((status) => ({
                  value: status,
                  label: status,
                }))}
                style={{ width: 140 }}
              />
            )}
          />
          <Table.Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Tooltip title="View Details">
                <Button
                  onClick={() => showViewModal(record)}
                  style={{
                    background: "white",
                    border: "1px solid #013564",
                    color: "#013564",
                    width: "80px",
                  }}
                >
                  Details
                </Button>
              </Tooltip>
            )}
          />
        </Table>
      </ConfigProvider>

      {/* View Modal */}
      <Modal
        title={
          <div className="pt-5 text-center">
            <h2 className="text-[#010515] text-2xl font-bold">Order Details</h2>
            <p className="text-gray-500 mt-2 font-normal">
              See all details about Order ID:{" "}
              <span className="font-bold">{currentRecord?.order_id}</span>
            </p>
          </div>
        }
        open={isViewModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={450}
      >
        {currentRecord && (
          <div className="my-4">
            <p className="font-semibold mt-2">Order Information</p>
            <div className="text-left mt-4 space-y-2">
              <p>
                Customer Name:{" "}
                <span className="font-semibold">
                  {currentRecord.customerName}
                </span>
              </p>
              <p>
                Organization:{" "}
                <span className="font-semibold">
                  {currentRecord.organizationName}
                </span>
              </p>
              <p>
                Total Items:{" "}
                <span className="font-semibold">
                  {currentRecord.total_items}
                </span>
              </p>
              <p>
                Total Price:{" "}
                <span className="font-semibold">
                  ${currentRecord.total_price}
                </span>
              </p>
              <p>
                Order Status:{" "}
                <span className="font-semibold">
                  {currentRecord.order_status}
                </span>
              </p>
              <p>
                Order Date:{" "}
                <span className="font-semibold">{currentRecord.date}</span>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
