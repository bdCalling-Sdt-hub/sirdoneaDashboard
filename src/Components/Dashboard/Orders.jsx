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
const { Option } = Select;

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Canceled"];

const statusColors = {
  Pending: "#BB1CA9",
  Processing: "#0C1020",
  Shipped: "#DD8500",
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
        ></ConfigProvider>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorTextPlaceholder: "rgb(0, 0, 0, 0.3)",
                colorBgContainer: "white",
              },
            },
          }}
        >
          <div className="flex items-center gap-2">
            <Select
              style={{ width: 300 }}
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="w-72 h-[44px] mr-6 border-none"
            >
              <Select.Option value="" disabled>
                <span style={{ color: "gray" }}>Filter Status</span>
              </Select.Option>
              {statuses.map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>

            <Input
              placeholder="Search User"
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

            <button className="rounded-full bg-white w-10 h-10 md:w-10 flex items-center justify-center">
              <GrDownload className="text-4xl text-[#1B7443] p-2" />
            </button>
          </div>
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
              fontWeightStrong: 200,
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
            render={(date) => moment(date).format("MMMM D, h:mm A")}
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
              <Tag
                style={{
                  color: statusColors[status] || "blue",
                  border: "none",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                {status}
              </Tag>
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
                      colorBgContainer: "rgb(178,218,196)",

                      hoverBorderColor: "rgb(194,44,162)",
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
                  style={{
                    width: 150,
                    backgroundColor: "!black", // Sets the background color for the select box itself
                    color: "white",
                    zIndex: 1,
                  }}
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
                {/* <Button
                  onClick={() => showViewModal(record)}
                  style={{
                    background: "white",
                    border: "1px solid #013564",
                    color: "#013564",
                    width: "80px",
                  }}
                > */}
                <AiOutlineEye
                  className="text-lg"
                  onClick={() => showViewModal(record)}
                />
                {/* </Button> */}
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
                Order's Details
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
              <div className="flex justify-between leading-7">
                <div>
                  <p>
                    <strong> Order ID: #</strong>
                    {currentRecord.orderId}
                  </p>
                  <p>
                    <strong> Customer: </strong>
                    {currentRecord.customerName}
                  </p>
                  <p>
                    <strong> Payment Date: </strong>
                    {moment(currentRecord.date).format("MM/DD/YYYY")}
                  </p>
                  <p>
                    <strong>Organization Name: </strong>
                    {currentRecord.organizationName}
                  </p>
                  <p>
                    <strong> Order Status: </strong>
                    <Tag
                      style={{
                        color: statusColors[status] || "blue",
                        border: "none",
                        fontSize: "16px",
                        fontWeight: "500",
                        backgroundColor: "transparent",
                      }}
                    >
                      {currentRecord.status}
                    </Tag>
                  </p>
                  <p>
                    <strong> Contact Number: </strong>

                    {currentRecord.contactNumber}
                  </p>
                  <p>
                    <strong>Location: </strong> {currentRecord.location}
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
