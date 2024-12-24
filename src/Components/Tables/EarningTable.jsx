/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import moment from "moment";
import { render } from "react-dom";
import { AiOutlineEye } from "react-icons/ai";

const EarningTable = ({ data, loading, showViewModal, pageSize = 0 }) => {
  console.log('data payment', data);
  
  const columns = [
    {
      title: "S. ID",
      key: "serialNumber",
      render: (text, record, index) => `${index + 1}`, // Serial number
      responsive: ["md"],
    },
    {
      title: "Email",
      key: "email",
      render: (text, record) => record.userId?.email || "N/A", // Safely access nested email
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      // render: (organizationName) => organizationName || "N/A",
    },
    {
      title: "Total Item",
      dataIndex: "paymentItems",
      key: "paymentItems",
      // render: (paymentItems) => paymentItems?.length || "0", // Handle array length
    },
    
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`, // Format amount
    },
    {
      title: "Payment Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("MM/DD/YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <Button
              className="!p-0"
              style={{
                background: "#FFFFFF",
                border: "none",
                color: "#222222",
              }}
              onClick={() => showViewModal(record)}
            >
              <AiOutlineEye className="ml-6" style={{ fontSize: "18px" }} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default EarningTable;
