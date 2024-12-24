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
import { useGetAllOrdersDataQuery, useOrderUpdateStatusMutation } from "../../Redux/api/orderApi";
import { ca } from "react-day-picker/locale";
import Swal from "sweetalert2";

const statuses = ["pending", "processing", "shipped", "delivered", "canceled"];

const statusColors = {
  pending: "#BB1CA9",
  processing: "#0C1020",
  shipped: "#DD8500",
  delivered: "green",
  canceled: "red",
};

export default function Orders() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // New state for status filter

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const {data: orderData, isLoading, refetch} = useGetAllOrdersDataQuery();
  const [updateOrderStatus] = useOrderUpdateStatusMutation();

  console.log('orderData ', orderData?.data); 


  const filteredData = useMemo(() => {
    let filtered = orderData?.data;
    console.log({filtered});
    

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter((item) =>
        item?.organizerId?.organizationDetails?.organizationName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by selected status
    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [orderData?.data, searchText, statusFilter]);

  const onSearch = (value) => setSearchText(value);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleStatusChange = async(value, record) => {
    console.log('value', value, "record", record);

    try {
      const updatedStatus = value;
      const orderId = record._id;
      const updatedData = { orderStatus: updatedStatus };

      const res = await updateOrderStatus({ orderId, updatedData }).unwrap();
      console.log({res});
      
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "order status updated successfully.",
        })
        refetch();
      }else{
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: res.message,
        })
      }

    }catch (error) {
      console.error("Error updating status:", error);
      if(error?.data?.success === false){
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error?.data?.message,
        })
      }
    }

    
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

        <div className="flex items-center gap-2">
          {/* Add Select for Status Filter */}
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionSelectedBg: "rgb(254,188,96)",
                  optionActiveBg: "rgb(255,217,165)",
                },
              },
            }}
          >
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              placeholder="Filter by Status"
              className="w-44 h-10"
              // style={{ width: 200, marginLeft: 16 }}
            >
              <Select.Option value="">All</Select.Option>
              {statuses?.map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </ConfigProvider>
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
            <Input
              placeholder="Search by Organization"
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold w-64 h-10 text-[#010515]"
              prefix={
                <SearchOutlined className="text-[#2B4257] font-bold text-lg mr-2" />
              }
            />
          </ConfigProvider>
        </div>
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
          loading={isLoading}
          pagination={{ pageSize: 8 }}
          rowKey="orderId"
          scroll={{ x: true }}
        >
          <Table.Column title="S. ID"  key="orderId" render={(text, record, index) => `${index + 1}`} />
          <Table.Column
  title="Customer Name"
  key="customerName"
  render={(text, record) => {
    console.log({ record }); // Logs the entire row data
    return record?.userId?.fullName || "N/A"; // Return the full name or "N/A"
  }}
/>

          <Table.Column
        title="Organization"
        key="organizationName"
        render={(record) =>
          record?.organizerId?.organizationDetails?.organizationName || "N/A"
        }
      />
          <Table.Column
            title="Date"
            dataIndex="date"
            key="date"
            render={(text, record) =>
              moment(record?.createdAt).format("MMMM D, h:mm A")
            }
          />
          <Table.Column title="Items"  key="totalItems" render={(text, record) => record.orderProductList.length} />
          <Table.Column
            title="Total Amount"
            dataIndex="totalAmount"
            key="totalAmount"
            // render={(price) => `$${price}`}
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
                      optionSelectedBg: "rgb(254,188,96)",
                      optionActiveBg: "rgb(255,217,165)",
                    },
                  },
                }}
              >
                <Select
                  value={status}
                  onChange={(value) => handleStatusChange(value, record)}
                  options={statuses?.map((status) => ({
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
                Order&apos;s Details
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
                    <strong> Customer: </strong>
                    {currentRecord.userId.fullName}
                  </p>
                  <p>
                    <strong> Payment Date: </strong>
                    {moment(currentRecord.createdAt).format("MM/DD/YYYY")}
                  </p>
                  <p>
                    <strong>Organization Name: </strong>
                    {currentRecord.organizerId?.organizationDetails?.organizationName}
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

                    {currentRecord.orderNumber}
                  </p>
                  <p>
                    <strong>Location: </strong> {currentRecord.orderAddress}
                  </p>
                </div>
                <div>
                  {/* <button className="rounded-full bg-white w-10 h-10 md:w-10 flex items-center justify-center border border-[#1B7443]">
                    <GrDownload className="text-4xl text-[#1B7443] p-2" />
                  </button> */}
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
                    {/* <th className="border border-[#FFEFD9] px-4 py-2">
                      Total Price
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentRecord?.orderProductList?.map((product, index) => (
                    <tr key={index} className="text-center bg-[#F2F2F7]">
                      <td className="border border-[#FFEFD9] px-4 py-2">
                        {product.productId.productName}
                      </td>
                      <td className="border border-[#FFEFD9] px-4 py-2">
                        ${product?.price?.toFixed(2)}
                      </td>
                      <td className="border border-[#FFEFD9] px-4 py-2">
                        {product.quantity}
                      </td>
                      {/* <td className="border border-[#FFEFD9] px-4 py-2">
  ${((product?.price) * (product?.quantity)).toFixed(2)}
</td> */}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-green-200 font-bold">
                    <td
                      colSpan="3"
                      className="border px-4 py-2 text-right text-[#1B7443] "
                    >
                      All Products Price ${currentRecord?.totalAmount?.toFixed(2) }
                    </td>
                    {/* <td className="border border-[#FFEFD9] px-4 py-2 text-[#1B7443] ">
                      ${currentRecord?.totalAmount?.toFixed(2) }
                    </td> */}
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
