import { SearchOutlined } from "@ant-design/icons";
import {
  ConfigProvider,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  Tooltip,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { GrDownload } from "react-icons/gr";

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Canceled"];

const statusColors = {
  Pending: "orange",
  Processing: "blue",
  Shipped: "purple",
  Delivered: "green",
  Canceled: "red",
};

export default function Orders() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // New state for status filter
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
    let filtered = data;

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter((item) =>
        item.customerName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by selected status
    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [data, searchText, statusFilter]);

  const onSearch = (value) => setSearchText(value);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleStatusChange = (value, record) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.orderId === record.orderId ? { ...item, orderStatus: value } : item
      )
    );
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value); // Update the status filter
  };

  return (
    <div className="min-h-screen rounded-lg">
      <div className="flex items-center justify-between p-3 bg-[#1b7443] rounded">
        <h1 className="text-2xl font-bold text-white ">Orders List</h1>
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

        {/* Add Select for Status Filter */}
        <ConfigProvider
          theme={{
            components: {
              Select: {
                optionSelectedBg: "rgb(27,116,67)",
                optionSelectedColor: "rgba(255,255,255,0.88)",
              },
            },
          }}
        >
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            placeholder="Filter by Status"
            style={{ width: 200, marginLeft: 16 }}
          >
            <Select.Option value="">All</Select.Option>
            {statuses.map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
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
          rowKey="orderId"
          scroll={{ x: true }}
        >
          <Table.Column title="Order ID" dataIndex="orderId" key="orderId" />
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
          <Table.Column title="Items" dataIndex="totalItems" key="totalItems" />
          <Table.Column
            title="Total"
            dataIndex="totalPrice"
            key="totalPrice"
            render={(price) => `$${price}`}
          />
          <Table.Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(status) => (
              <Tag color={statusColors[status] || "gray"}>{status}</Tag>
            )}
          />
          <Table.Column
            title="Change Status"
            dataIndex="status"
            key="changeStatus"
            render={(status, record) => (
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionSelectedBg: "rgb(27,116,67)",
                      optionSelectedColor: "rgba(255,255,255,0.88)",
                    },
                  },
                }}
              >
                <Select
                  value={status}
                  onChange={(value) => handleStatusChange(value, record)}
                  options={statuses.map((status) => ({
                    value: status,
                    label: status,
                  }))}
                  style={{ width: 150 }}
                />
              </ConfigProvider>
            )}
          />
          <Table.Column
            className="cursor-pointer"
            title="Details"
            key="action"
            render={(_, record) => (
              <Tooltip title="View Details">
                <AiOutlineEye
                  className="text-lg"
                  onClick={() => showViewModal(record)}
                />
              </Tooltip>
            )}
          />
        </Table>
      </ConfigProvider>

      {/* Order Details Modal */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "rgb(255,239,217)",
            },
          },
        }}
      >
        <Modal
          title={
            <div className="pt-5 text-center bg-[#FFEFD9]">
              <h2 className="text-[#1b7443] text-3xl font-bold">
                Order Details
              </h2>
            </div>
          }
          open={isViewModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          width={600}
        >
          {currentRecord && (
            <div className="my-4">
              <div className="flex justify-between">
                <div>
                  <p>
                    Order ID: <strong>#{currentRecord.orderId}</strong>
                  </p>
                  <p>
                    Customer: <strong>{currentRecord.customerName}</strong>
                  </p>
                  <p>
                    Payment Date:{" "}
                    <strong>
                      {" "}
                      {moment(currentRecord.date).format("MM/DD/YYYY")}
                    </strong>
                  </p>
                  <p>
                    Organization Name:{" "}
                    <strong> {currentRecord.organizationName}</strong>
                  </p>
                  <p>
                    Order Status:{" "}
                    <Tag color={statusColors[currentRecord.orderStatus]}>
                      {currentRecord.orderStatus}
                    </Tag>
                  </p>
                  <p>
                    Location: <strong>{currentRecord.location}</strong>
                  </p>
                </div>
                <div>
                  <button className="rounded-full bg-white w-10 h-10 md:w-10 flex items-center justify-center border border-[#1B7443]">
                    <GrDownload className="text-4xl text-[#1B7443] p-2" />
                  </button>
                </div>
              </div>
              <table className="table-auto w-full mt-4 border border-collapse ">
                <thead>
                  <tr className="bg-[#FEBC60]">
                    <th className="border border-[#FFEFD9] px-4 py-2 rounded-tl-lg">
                      Product Name
                    </th>
                    <th className="border border-[#FFEFD9] px-4 py-2">
                      Product Price
                    </th>
                    <th className="border border-[#FFEFD9] px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-[#FFEFD9] px-4 py-2 rounded-tr-lg">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecord.productList.map((product, index) => (
                    <tr key={index} className="text-center bg-[#F2F2F7]">
                      <td className="border border-[#FFEFD9] px-4 py-2">
                        {product.productName}
                      </td>
                      <td className="border border-[#FFEFD9] px-4 py-2">
                        ${product.productPrice.toFixed(2)}
                      </td>
                      <td className="border border-[#FFEFD9] px-4 py-2">
                        {product.quantity}
                      </td>
                      <td className="border border-[#FFEFD9] px-4 py-2">
                        ${product.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-green-200 font-bold">
                    <td
                      colSpan="3"
                      className="border px-4 py-2 text-right text-[#1B7443] "
                    >
                      Total Price
                    </td>
                    <td className="border border-[#FFEFD9] px-4 py-2 text-[#1B7443] ">
                      ${currentRecord.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
}
