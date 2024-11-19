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
  Tag,
} from "antd";
import axios from "axios";
import moment from "moment";

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
          <Table.Column
            title="Total Items"
            dataIndex="totalItems"
            key="totalItems"
          />
          <Table.Column
            title="Total"
            dataIndex="totalPrice"
            key="totalPrice"
            render={(price) => `$${price}`}
          />
          <Table.Column
            title="Order Status"
            dataIndex="orderStatus"
            key="orderStatus"
            render={(status) => (
              <Tag color={statusColors[status] || "gray"}>{status}</Tag>
            )}
          />
          <Table.Column
            title="Change Status"
            dataIndex="orderStatus"
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

              <table className="table-auto w-full mt-4 border border-collapse">
                <thead>
                  <tr className="bg-[#FEBC60]">
                    <th className="border border-[#FFEFD9] px-4 py-2">
                      Product Name
                    </th>
                    <th className="border border-[#FFEFD9] px-4 py-2">
                      Product Price
                    </th>
                    <th className="border border-[#FFEFD9] px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-[#FFEFD9] px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecord.productList.map((product, index) => (
                    <tr key={index} className="text-center">
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
                    <td colSpan="3" className="border px-4 py-2 text-right">
                      Total Price
                    </td>
                    <td className="border border-[#FFEFD9] px-4 py-2">
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
