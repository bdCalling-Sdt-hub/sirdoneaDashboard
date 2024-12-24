/* eslint-disable react/prop-types */
import { ConfigProvider, Table } from "antd";
import { render } from "react-dom";


const url = "http://192.168.12.232:8010/";

const InventoryTracking = ({ data, loading, pageSize = 0 }) => {
  console.log('data', data);
  
  const columns = [
    {
      title: "S. ID",
      key: "serialNumber", 
      render: (text, record, index) => `${index + 1}`, 
      responsive: ["md"], 
    },
    
    {
      title: "Product Image",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (coverImage) => (
        <img src={`${url}${coverImage}`} alt="Product Image" className="size-8 rounded-full" />
      ),
    },

    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },

    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },

    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Available Stock",
      dataIndex: "availablestock",
      key: "availablestock",
      
    },
    {
      title: "Active/Inactive",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
      
    },

    {
      title: "Product Publish Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
  ];
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellFontSize: 17,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={pageSize > 0 ? { pageSize } : false}
          rowKey="id"
          scroll={{ x: true }}
        />
      </ConfigProvider>
    </div>
  );
};

export default InventoryTracking;
