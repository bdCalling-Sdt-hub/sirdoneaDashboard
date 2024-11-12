import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DriverTable from "../../Tables/DriverTable";
import DriverDetailsModal from "../../UI/DriverDetailsModal";

const AllDrivers = () => {
  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* Use to set user
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Set Selected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");

        // Filter data to show only drivers
        const driverData = response?.data.filter(
          (item) => item.role === "driver"
        );

        setData(driverData);
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

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  const handleBlock = (data) => {
    console.log("Blocked User:", { id: data?.id, userName: data?.userName });
    setIsViewModalVisible(false);
  };

  return (
    <div className="min-h-[90vh]">
      <div
        className="bg-[#FFFFFF] rounded"
        style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
      >
        <div className="flex justify-between p-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-base-color">Driver list</h1>
          </div>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search User..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold border-[#2B4257] py-2"
              prefix={
                <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
              }
            />
          </div>
        </div>
        <div className="px-2 lg:px-6">
          <DriverTable
            data={filteredData}
            loading={loading}
            showViewModal={showViewModal}
            pageSize={12}
          />
        </div>

        <DriverDetailsModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        />
      </div>
    </div>
  );
};

export default AllDrivers;
