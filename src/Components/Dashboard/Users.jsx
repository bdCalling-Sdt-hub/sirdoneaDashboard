import { useState, useEffect, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, ConfigProvider, Table, Button, Modal, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
export default function Users() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
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
      item.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const onSearch = (value) => setSearchText(value);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  return (
    <div className="min-h-[90vh] bg-[#1b7443] rounded-lg">
      <div className="flex items-center justify-between p-3">
        <h1 className="text-2xl font-bold text-white ">Users List</h1>
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
        </ConfigProvider>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgb(255,255,255)",
              colorBgContainer: "rgb(255,255,255)",
              colorText: "rgb(0,0,0)",
              borderColor: "rgb(73,72,72)",
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
          rowKey="id"
          scroll={{ x: true }}
        >
          <Table.Column title="ID" dataIndex="id" key="id" />
          <Table.Column title="Full Name" dataIndex="userName" key="userName" />
          <Table.Column title="Email" dataIndex="email" key="email" />
          <Table.Column
            title="Total Spend"
            dataIndex="totalSpent"
            key="totalSpent"
            render={(totalSpent) => `$${totalSpent}`}
          />
          <Table.Column
            title="Join Date"
            dataIndex="joiningDate"
            key="joiningDate"
            render={(date) => moment(date).format("MM/DD/YYYY")}
          />
          <Table.Column
            title="Action"
            key="action"
            render={(_, record) => (
              <div>
                <Tooltip title="View Details">
                  <Button
                    onClick={() => showViewModal(record)}
                    style={{
                      background: "white",
                      border: "1px solid #1b7443",
                      color: "#1b7443",
                      width: "80px",
                      fontWeight: 600,
                    }}
                  >
                    Details
                  </Button>
                </Tooltip>
              </div>
            )}
          />
        </Table>
      </ConfigProvider>

      {/* View Modal */}
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
            <div className="pt-5 text-center bg-[#ffefd9]">
              <h2 className="text-[#010515] text-2 xl font-bold ">
                User Details
              </h2>
              <p className="text-gray-500 mt-2 font-normal">
                See all details about{" "}
                <span className="font-bold">{currentRecord?.userName}</span>
              </p>
            </div>
          }
          open={isViewModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          width={450}
        >
          {currentRecord && (
            <div className="my-4 flex flex-col items-center">
              <div className="flex items-center justify-center gap-5">
                <img
                  src={currentRecord.avatar}
                  alt={currentRecord.userName}
                  className="w-20 h-20 rounded-full"
                />
                <p className="text-2xl text-[  ] font-bold">
                  {currentRecord.userName}
                </p>
              </div>
              <p className="font-semibold mt-4 text-xl">User Information</p>
              <div className="text-left mt-4 space-y-2">
                <p>
                  Name:{" "}
                  <span className="font-semibold">
                    {currentRecord.userName}
                  </span>
                </p>
                <p>
                  Email:{" "}
                  <span className="font-semibold">{currentRecord.email}</span>
                </p>
                <p>
                  Phone Number:{" "}
                  <span className="font-semibold">
                    {currentRecord.contactNumber}
                  </span>
                </p>
                <p>
                  Date of Birth:{" "}
                  <span className="font-semibold">
                    {moment(currentRecord.dateOfBirth).format("MM/DD/YYYY")}
                  </span>
                </p>
                <p>
                  Joined:{" "}
                  <span className="font-semibold">
                    {moment(currentRecord.joiningDate).format("MM/DD/YYYY")}
                  </span>
                </p>
                <p>
                  Organization Name:{" "}
                  <span className="font-semibold">
                    {currentRecord.organizationName}
                  </span>
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="bg-[#1b7743] text-white text-lg py-2 px-5 rounded-lg mt-8 w-40"
              >
                Ok
              </button>
            </div>
          )}
        </Modal>
      </ConfigProvider>

      {/* Block Confirmation Modal */}
      {/* <Modal
        open={isBlockModalVisible}
        onOk={handleBlock}
        onCancel={handleCancel}
        okText="Block"
        cancelText="Cancel"
        centered
        footer={
          <div className="flex justify-center gap-4 pb-4">
            <Button onClick={handleCancel} style={{ background: "#ddd" }}>
              Cancel
            </Button>
            <Button
              type="primary"
              style={{ background: "#013564" }}
              onClick={handleBlock}
            >
              Block
            </Button>
          </div>
        }
      >
        <p className="text-lg font-semibold pt-10 pb-4">
          Are you sure you want to block this user?
        </p>
      </Modal> */}

      {/* Delete Confirmation Modal */}
      {/* <Modal
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        centered
        footer={
          <div className="flex justify-center gap-4 pb-4">
            <Button onClick={handleCancel} style={{ background: "#ddd" }}>
              Cancel
            </Button>
            <Button
              type="primary"
              style={{ background: "red" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-lg font-semibold pt-10 pb-4">
          Are you sure you want to delete this user?
        </p>
      </Modal> */}
    </div>
  );
}
