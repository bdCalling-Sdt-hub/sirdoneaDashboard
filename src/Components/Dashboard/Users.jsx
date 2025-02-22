import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Modal, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { GrDownload } from "react-icons/gr";
import { AllIcons } from "../../../public/images/AllImages";
import { useAllUsersQuery } from "../../Redux/api/usersApi";

const url = "http://139.59.0.25:8050/";
export default function Users() {
  const [searchText, setSearchText] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const {data:allUsers, isLoading} = useAllUsersQuery();
  console.log('users',allUsers?.data);
  


  const filteredData = useMemo(() => {
    if (!searchText) return allUsers?.data;
    return data.filter((item) =>
      item.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [allUsers?.data, searchText]);

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
            <div className="flex items-center justify-center gap-2">
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
              {/* <button className="rounded-full bg-white w-10 h-10 md:w-10 flex items-center justify-center">
                <GrDownload className="text-5xl text-[#1B7443] p-2 font-extrabold" />
              </button> */}
            </div>
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
            loading={isLoading}
            pagination={{ pageSize: 6 }}
            rowKey="id"
            scroll={{ x: true }}
            className="mt-4 cursor-pointer"
          >
            <Table.Column 
  title="SL ID" 
  key="id" 
  render={(_, __, rowIndex) => `${rowIndex + 1}`} 
/>
            <Table.Column
              title="Image"
              dataIndex="image"
              key="image"
              render={(text, record) => (
                <img
                  src={`${url}/${record.image}`}
                  alt="Image"
                  style={{ width: 40, height: 40 }}
                />
              )}
            />

            <Table.Column
              title="Full Name"
              dataIndex="fullName"
              key="fullName"
            />
            <Table.Column title="Email" dataIndex="email" key="email" />
            <Table.Column
              title="Contact No." 
              dataIndex="phone"
              key="totalSpent"
            />
            <Table.Column
              title="Active/Inactive" 
              dataIndex="isActive"
              key="isActive"
              render={(isActive) => (isActive ? "Active" : "Inactive")}
            />
            <Table.Column
              title="Join Date"
              dataIndex="createdAt"
              key="createdAt"
              render={(createdAt) => moment(createdAt).format("MM/DD/YYYY")}
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
                  <img src={`${url}/${currentRecord.image}`} />
                </div>
                <p className="font-semibold mt-4 text-2xl text-[#FEBC60] text-center">
                  User Information
                </p>
                <div className="text-left mt-4 space-y-2">
                  <p>
                    Name:{" "}
                    <span className="font-semibold">
                      {currentRecord.fullName}
                    </span>
                  </p>
                  <p>
                    Email:{" "}
                    <span className="font-semibold">{currentRecord.email}</span>
                  </p>
                  <p>
                    Phone Number:{" "}
                    <span className="font-semibold">
                      {currentRecord.phone}
                    </span>
                  </p>
                  <p>
                    Joined:{" "}
                    <span className="font-semibold">
                      {moment(currentRecord.createdAt).format("MM/DD/YYYY")}
                    </span>
                  </p>
                  <p>
                    User Active:{" "}
                    <span className="font-semibold">
                      {currentRecord.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                  <p>
                    User Deleted:{" "}
                    <span className="font-semibold">
                      {currentRecord.isDeleted ? "Deleted" : "Not Deleted"}
                    </span>
                  </p>
                  {/* <p>
                    Organization Name:{" "}
                    <span className="font-semibold">
                      {currentRecord.organizationName}
                    </span>
                  </p> */}
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
      </div>
    </>
  );
}
