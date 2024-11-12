import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Button, Modal } from "antd";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DriverRequest = () => {
  const [searchText, setSearchText] = useState("");
  const [requests, setRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentRequest, setCurrentRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/data/driverRequest.json");
        const data = Array.isArray(response.data) ? response.data : [];
        // Initialize with accepted status specific to each request
        setRequests(
          data.map((request) => ({
            ...request,
            accepted: false,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRequests();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return requests;
    return requests.filter(
      (item) =>
        item.driverName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.truckNumber.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [requests, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const handleAccept = (id) => {
    // Log for debugging purposes
    console.log("Accepting request with ID:", id);
    
    // Only update the accepted status of the specific request
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, accepted: true } : request
    );

    // Update state with the new array (React only re-renders on array changes)
    setRequests(updatedRequests);
  };

  const handleRevision = (request) => {
    setCurrentRequest(request);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleTitleClick = (request) => {
    navigate(`/driver-request/${request.id}`, { state: request });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            hoverBg: "#b1d7fa",
            hoverBorderColor: "rgb(39,136,255)",
            colorText: "rgb(255,255,255)",
            colorTextPlaceholder: "rgba(100,99,99,0.25)",
          },
        },
      }}
    >
      <div>
        <div className="bg-[#013564] text-white p-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold">Driver Requests</h1>
          <div className="flex items-center">
            <Input
              placeholder="Search Here"
              prefix={<SearchOutlined className="text-[#013564]" />}
              className="w-72 rounded-lg"
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-b-lg py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((request) => (
              <div
                key={request.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <span
                  onClick={() => handleTitleClick(request)}
                  className="text-xl font-bold text-[#013564] cursor-pointer"
                >
                  {request.driverName}
                </span>
                <p className="text-gray-600">Truck: {request.truckNumber}</p>
                <p className="text-gray-600">Phone: {request.phone}</p>
                <div className="mt-4">
                  <Button
                    className={`px-5 py-1 rounded-lg mr-2 border ${
                      request.accepted
                        ? "bg-green-600 font-bold text-white border-green-600"
                        : "bg-[#013564] text-white border-[#013564]"
                    }`}
                    onClick={() => handleAccept(request.id)}
                    disabled={request.accepted}
                  >
                    {request.accepted ? "Accepted" : "Accept"}
                  </Button>
                  <Button
                    className="bg-white text-[#013564] px-5 py-1 rounded-lg border border-[#013564]"
                    onClick={() => handleRevision(request)}
                  >
                    Revision
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          width={400}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={null}
        >
          <p className="text-center font-medium text-2xl mb-2">
            Reason for Revision
          </p>

          <Input.TextArea
            rows={4}
            placeholder="Enter your revision comments here..."
            className="border border-[#013564] text-black"
          />
          <div className="flex justify-center gap-2 mt-4">
            <Button
              onClick={handleModalCancel}
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "#d9d9d9",
                color: "#000",
                width: "100%",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleModalOk}
              style={{
                backgroundColor: "#013564",
                borderColor: "#013564",
                color: "#fff",
                width: "100%",
              }}
            >
              Revision
            </Button>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default DriverRequest;
