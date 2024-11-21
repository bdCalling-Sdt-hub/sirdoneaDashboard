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
      dataIndex: "profileImage",
      key: "profileImage",
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
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },

    {
      title: "Join date",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },

    // {
    //   title: "User Type",
    //   dataIndex: "role", // assuming your data has a "userType" field
    //   key: "userType",
    //   filters: [
    //     { text: "User", value: "user" },
    //     { text: "Driver", value: "driver" },
    //   ],
    //   onFilter: (value, record) => record.role === value,
    //   render: (role) => role.charAt(0).toUpperCase() + role.slice(1),
    // },
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
