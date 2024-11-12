/* eslint-disable react/prop-types */
import { Table } from "antd";

const UsersTable = ({ data, loading, pageSize = 0 }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
    },
    {
      title: "Full Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Phone",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },

    {
      title: "User Type",
      dataIndex: "role", // assuming your data has a "userType" field
      key: "userType",
      filters: [
        { text: "User", value: "user" },
        { text: "Driver", value: "driver" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => role.charAt(0).toUpperCase() + role.slice(1),
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

export default UsersTable;
