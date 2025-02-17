/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { IoIosArrowBack } from "react-icons/io";

const url = "http://139.59.0.25:8050/";

const OrganizationDetails = ({ visible, onClose, data }) => {
  if (!data) return null;

  console.log('organizer details here',data);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={650}
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

        <div className="px-14">
          <div className="flex justify-between items-center mb-6">
            <img
              src={`${url}${data.userId.image}`}
              alt="Event"
              className="w-40 h-40 rounded-full object-cover"
            />
            {/* moment(createdAt).format("MM/DD/YYYY") */}
            <div className="text-right">
              <p className="text-green-600 font-semibold">
                Starting Date: {`${data.fundraiserInformation.startMonth || ""}/ ${data.fundraiserInformation.startDay || ""}/ ${data.fundraiserInformation.year || ""}/ ${data.fundraiserInformation.startTime || ""}`}
              </p>
              <p className="text-red-600 font-semibold">
                Ending Date: {`${data.fundraiserInformation.startMonth || ""}/ ${data.fundraiserInformation.startDay || ""}/ ${data.fundraiserInformation.year || ""}/ ${data.fundraiserInformation.endTime || ""}`}
              </p>
            </div>
          </div>
          
          <h2 className="text-[#1b7443] text-lg font-thin ">
          Organization Name: {data.organizationDetails.organizationName}
        </h2>
          <p className="text-lg mb-1">
             Industry Type :<span>  {data?.organizationDetails?.industryType || ""}</span>
          </p>
          <p className="text-lg mb-1">
             Tax-ID :<span>  {data?.organizationDetails?.organizationTaxId || ""}</span>
          </p>
          <p className="text-lg mb-1">
             ProfitType :<span>  {data?.organizationDetails?.profitType || ""}</span>
          </p>
          <p className="text-lg mb-1">
             Addess :<span>  {data?.organizationDetails?.address?.streetAddress}, {data?.organizationDetails?.address?.city}, {data?.organizationDetails?.address?.country}</span>
          </p>


          <p className="text-lg  mb-1">
             Creator Name :<span>  {data?.organizerInfo?.firstName || ""} {data?.organizerInfo?.lastName || ""}</span>
          </p>
          <p className="text-lg  mb-1">
             Creator Email :<span>  {data?.organizerInfo?.email || ""}</span>
          </p>
          <p className="text-lg  mb-1">
             Creator Phone :<span>  {data?.organizerInfo?.phone || ""} </span>
          </p>
          <p className="text-lg  mb-1">
            Target: <span className="font-normal">{data.fundraiserInformation.goal}</span>
          </p>
          <p className="text-lg  mb-1">
            Signature Name: <span className="font-normal">{data.signatureName}</span>
          </p>
          <p className="text-green-600 text-lg">
                Starting Date: {`${data.fundraiserInformation.startMonth || ""}/ ${data.fundraiserInformation.startDay || ""}/ ${data.fundraiserInformation.year || ""}/ ${data.fundraiserInformation.startTime || ""}`}
              </p>
              <p className="text-red-600 text-lg ">
                Ending Date: {`${data.fundraiserInformation.startMonth || ""}/ ${data.fundraiserInformation.startDay || ""}/ ${data.fundraiserInformation.year || ""}/ ${data.fundraiserInformation.endTime || ""}`}
              </p>

          <h3 className="text-lg  mb-2 mt-3">Fundraiser Details</h3>
          <p className="text-gray-600 whitespace-pre-line">{data?.fundraiserInformation?.fundraiserDescription}</p>

          <div className="text-[#1E1E1E99] mt-3">
            <p>
              Event Overview: Host a “Tea Tasting Extravaganza” where attendees
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
