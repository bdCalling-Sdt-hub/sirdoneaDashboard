/* eslint-disable react/prop-types */
// RequestDetailsModal.js

import { Button, ConfigProvider, Modal } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { useApprovedOrganizersMutation, useDeletedOrganizersMutation } from "../../../Redux/api/organizerApi";
import Swal from "sweetalert2";

const url = "http://139.59.0.25:8050/";

const RequestDetailsModal = ({ visible, onClose, data , refetch}) => {

  const [deleteOrganizer] = useDeletedOrganizersMutation();
  const [acceptOrganizer] = useApprovedOrganizersMutation();

  const handleDeleted = async (id) => {
    try {
      const response = await deleteOrganizer(id).unwrap();
      console.log("organizer cencle response", response);
      
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Organizer Cenceled successfully.",
        });
        refetch();
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete organizer. Please try again.",
      });
    }
  };


  const handleApprove = async (id) => {
    try {
      const response = await acceptOrganizer(id).unwrap();
      console.log("organizer approved response", response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Organizer Approved successfully.",
        });
        refetch();
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete approved organizer. Please try again.",
      });
    }
  };


  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "rgb(255,239,217)",
            headerBg: "rgb(255,239,217)",
          },
          Button: {
            colorPrimary: "#1B7443",
            colorPrimaryHover: "#3B6441",
            colorPrimaryTextHover: "rgb(0,0,0)",
            // defaultBg: "#C8F0DA",
            // defaultHoverColor: "rgb(0,0,0)",
            // defaultHoverBorderColor: "rgb(0,0,0)",
          },
        },
      }}
    >
      {" "}
      <Modal
        visible={visible}
        onCancel={onClose}
        footer={null}
        centered
        width={1200}
        className="rounded-lg"
        // bodyStyle={{
        //   backgroundColor: "#FAF8F5",
        //   padding: "20px",
        //   borderRadius: "10px",
        // }}
      >
        <div className="flex items-center mb-4">
          <Button
            onClick={onClose}
            className="bg-transparent text-black border-none"
          />
          <h2 className="flex items-center w-full text-2xl gap-2 font-semibold bg-[#1B7443] text-white rounded-lg py-3">
            {<IoIosArrowBack className="text-white text-xl ml-2" />} Request
            Details
          </h2>
        </div>

        <div className="px-14">
          <h3 className="text-xl font-thin text-[#1b7443] text-center">
            Organization Name: {data.organizationDetails.organizationName || "Organization Name"}
          </h3>

          <div className="p-6">
            <div className="gap-4">
              <img
                src={`${url}${data.userId.image }` || "../images/default.jpg"}
                alt="Organization"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <p className="text-lg font-semibold">
                Organization Creator Name :<span>  {data?.organizerInfo?.firstName || ""} {data?.organizerInfo?.lastName || ""}</span>
                </p>
                <p>{data.creatorName}</p>
                <p className="text-lg font-semibold mt-2">
                  Target: {data.fundraiserInformation.goal}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold">Organization’s Details:</h4>
              <p className="mt-2 text-gray-700">{data.details}</p>
            </div>
            <div className="text-[#1E1E1E99]">
              <p>
                Event Overview: Host a “Tea Tasting Extravaganza” where
                attendees can sample a variety of teas from around the world.
                This event can be held in a cozy café, a community center, or
                even a beautiful garden.
              </p>
              <div className="mt-8">
                Event Highlights:
                <p>1. Tea Tasting Stations:</p>
                <ul className="ml-12 list-disc">
                  <li>
                    Set up multiple stations, each featuring different types of
                    tea (e.g., green tea, black tea, herbal tea, oolong tea)
                  </li>
                  <li>
                    Provide information cards at each station detailing the
                    origin, flavor profile, and health benefits of each tea.
                  </li>
                </ul>
                <div className="mt-5 ">
                  <p>2. Tea Pairing Workshops:</p>
                  <ul className="list-disc ml-12">
                    <li>
                      Set up multiple stations, each featuring different types
                      of tea (e.g., green tea, black tea, herbal tea, oolong
                      tea)
                    </li>
                    <li>
                      Provide information cards at each station detailing the
                      origin, flavor profile, and health benefits of each tea.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            onClick={() => handleDeleted(data._id)}
            className="bg-red-500 text-white px-6 py-2 rounded-md"
          >
            Delete
          </Button>
          <Button
            onClick={() => handleApprove(data._id)}
            className="bg-[#1B7443] text-white px-6 py-2 rounded-md"
          >
            Approve
          </Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default RequestDetailsModal;
