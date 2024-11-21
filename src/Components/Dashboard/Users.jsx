import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Modal, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AllIcons } from "../../../public/images/AllImages";
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
    <>
      <div className="bg-white mb-6 flex gap-2 items-center rounded-lg border-2 border-[#1b7443]">
        <div className="p-3 rounded-full w-fit">
          <img src={AllIcons.user} className="size-16" alt="" />
        </div>
        <div>
          <h1 className="font-semibold">Total Users</h1>
          <p className="text-[#1b7443] font-semibold text-xl">780</p>
        </div>
      </div>
      <div className="bg-white  rounded-tr-lg">
        <div className="flex items-center justify-between  bg-[#1b7443] p-3 rounded-t-lg">
          <h1 className="text-2xl font-bold  text-white ">Users List</h1>
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
                bodySortBg: "rgb(204,148,148)",
                borderColor: "#E7E7E7",
                expandIconBg: "rgb(217,194,194)",
                filterDropdownBg: "rgb(56,191,65)",
                filterDropdownMenuBg: "rgb(206,111,111)",
                fixedHeaderSortActiveBg: "rgb(129,78,78)",
                headerBg: "#C8F0DA",
                headerColor: "rgb(27,120,67)",
                headerSplitColor: "rgb(200,240,218)",
                fontWeightStrong: 500,
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
            className="mt-4 cursor-pointer"
          >
            <Table.Column title="SL ID" dataIndex="id" key="id" />
            <Table.Column
              title="Full Name"
              dataIndex="userName"
              key="userName"
            />
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
                    <AiOutlineEye
                      className="ml-4"
                      onClick={() => showViewModal(record)}
                    />
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
                <h2 className="text-[#1b7743] text-3xl font-bold ">
                  User Details
                </h2>
                <p className="text-gray-500 mt-2 font-normal">
                  See all details about{" "}
                  <span className="">{currentRecord?.userName}</span>
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
              <div className="my-4 flex flex-col ">
                <div className="flex items-center justify-center gap-5">
                  <img src={currentRecord.avatar} />
                </div>
                <p className="font-semibold mt-4 text-2xl text-[#FEBC60] text-center">
                  User Information
                </p>
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
                <div className="flex justify-center">
                  <button
                    onClick={handleCancel}
                    className="bg-[#1b7743]  text-white text-lg py-2 px-5 rounded-lg mt-8 w-full"
                  >
                    Ok
                  </button>
                </div>
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
    </>
  );
}
