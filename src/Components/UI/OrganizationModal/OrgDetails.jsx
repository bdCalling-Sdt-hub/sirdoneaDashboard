/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { IoIosArrowBack } from "react-icons/io";

const OrganizationDetails = ({ visible, onClose, data }) => {
  if (!data) return null;

  console.log(data);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={1200}
      className="bg-[#FAF8F5] rounded-lg"
    >
      <div className="">
        <div className="flex items-center mb-4">
          <Button
            onClick={onClose}
            className="bg-transparent text-black border-none"
          />
          <h2 className="flex items-center w-full text-2xl gap-2 font-semibold bg-[#1B7443] text-white rounded-lg py-3 mt-5">
            {<IoIosArrowBack className="text-white text-xl" />} Details
          </h2>
        </div>

        <h2 className="text-center text-[#1b7443] text-2xl font-thin mb-4">
          Organization Name: {data.organization}
        </h2>

        <div className="px-14">
          <div className="flex justify-between items-center mb-6">
            <img
              src={data.image}
              alt="Event"
              className="w-40 h-40 rounded-lg object-cover"
            />
            <div className="text-right">
              <p className="text-green-600 font-semibold">
                Starting Date: {data.startDate}
              </p>
              <p className="text-red-600 font-semibold">
                Ending Date: {data.endDate}
              </p>
            </div>
          </div>

          <p className="text-lg font-semibold mb-1">
            Organization Creator Name :<span> {data.name}</span>
          </p>
          <p className="text-lg font-semibold mb-1">
            Target: <span className="font-normal">{data.target}</span>
          </p>

          <h3 className="text-lg font-semibold mb-2">Organization’s Details</h3>
          <p className="text-gray-600 whitespace-pre-line">{data.details}</p>

          <div className="text-[#1E1E1E99]">
            <p>
              Event Overview: Host a “Tea Tasting Extravaganza” where attendees
              can sample a variety of teas from around the world. This event can
              be held in a cozy café, a community center, or even a beautiful
              garden.
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
                    Set up multiple stations, each featuring different types of
                    tea (e.g., green tea, black tea, herbal tea, oolong tea)
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
        <div className="flex justify-center mt-8">
          <Button
            type="primary"
            onClick={onClose}
            className="bg-[#1b7443] text-white px-8 py-2 rounded-md w-48"
          >
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrganizationDetails;
