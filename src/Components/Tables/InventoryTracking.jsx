/* eslint-disable react/prop-types */
import { ConfigProvider, Table } from "antd";
import { render } from "react-dom";


const url = "http://139.59.0.25:8050/";

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

    // {
    //   title: "Stock",

    //   dataIndex: "stock",
    //   key: "stock",
    //   render: (record) => (
    //     console.log(record)
    //   ),
    // },
    // {
    //   title: "Available Stock",
    //   dataIndex: "availablestock",
    //   key: "availablestock",
      
    // },
    {
      title: "Stock",
      key: "stock",
      render: (_, record) => record?.addedItems[0]?.stock || "N/A", // Fetch stock from nested structure
    },
    {
      title: "Available Stock",
      key: "availableStock",
      render: (_, record) => record?.addedItems[0]?.availableStock || "N/A", // Fetch available stock from nested structure
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
