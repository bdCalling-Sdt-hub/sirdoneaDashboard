/* eslint-disable react/prop-types */
import { ConfigProvider, Table } from "antd";

const InventoryTracking = ({ data, loading, pageSize = 0 }) => {
  const columns = [
    {
      title: "S. ID",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
    },
    {
      title: "Profile Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <img src={avatar} alt="Product Image" className="size-8 rounded-full" />
      ),
    },

    {
      title: "Full Name",
      dataIndex: "userName",
      key: "userName",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Product name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => {
        const color =
          quantity > 75 ? "#0873FD" : quantity > 16 ? "#FF9500" : "#FF0909";
        return (
          <span className="ml-4" style={{ color }}>
            {quantity}
          </span>
        );
      },
    },

    {
      title: "Join date",
      dataIndex: "joiningDate",
      key: "joiningDate",
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
