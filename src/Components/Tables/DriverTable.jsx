/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";

const DriverTable = ({
  data,
  loading,
  showViewModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
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
          </Space>
        </>
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

export default DriverTable;
