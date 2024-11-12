import { useState, useEffect, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, ConfigProvider, Table, Button, Modal, Tooltip } from "antd";
import axios from "axios";
export default function Users() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
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


  const showBlockModal = () => setIsBlockModalVisible(true);

  const handleDelete = () => {
    // Perform delete action
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsBlockModalVisible(false);
  };

  const handleBlock = () => {
    console.log("Blocked User:", currentRecord);
    setIsBlockModalVisible(false);
  };

  return (
    <div className="min-h-[90vh] bg-[#2B4257] rounded-lg">
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
              headerColor: "#013564",
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
          {/* <Table.Column title="ID" dataIndex="id" key="id" /> */}
          <Table.Column title="Full Name" dataIndex="userName" key="userName" />
          <Table.Column title="Email" dataIndex="email" key="email" />
          <Table.Column
            title="Phone Number"
            dataIndex="contactNumber"
            key="contactNumber"
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
                      border: "1px solid #013564",
                      color: "#013564",
                      width: "80px",
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
      <Modal
        title={
          <div className="pt-5 text-center">
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
          <div className="my-4">
            <div className="flex items-center gap-5">
              <img
                src={currentRecord.avatar}
                alt={currentRecord.userName}
                className="w-20 h-20 rounded-full"
              />
              <p className="text-2xl text-[#013564] font-bold">
                {currentRecord.userName}
              </p>
            </div>
            <p className="font-semibold mt-2">User Information</p>
            <div className="text-left mt-4 space-y-2">
              <p>
                Name:{" "}
                <span className="font-semibold">{currentRecord.userName}</span>
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
                  {currentRecord.dateOfBirth}
                </span>
              </p>
              <p>
                Joined:{" "}
                <span className="font-semibold">
                  {currentRecord.joiningDate}
                </span>
              </p>
              {/* <p>
                NID/Passport Number:{" "}
                <span className="font-semibold">
                  {currentRecord.nidNumber}
                </span>
              </p> */}
            </div>
            <button
              onClick={showBlockModal}
              className="bg-[#013564] text-white font-bold py-2 px-5 rounded-lg mt-8"
            >
              Block
            </button>
          </div>
        )}
      </Modal>

      {/* Block Confirmation Modal */}
      <Modal
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
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
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
      </Modal>
    </div>
  );
}
