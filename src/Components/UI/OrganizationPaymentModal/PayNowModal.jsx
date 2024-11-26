import { Modal } from "antd";

export default function PayNowModal({ onClose, visible, data }) {
  return (
    <Modal
      visible={visible}
      footer={null}
      width={500}
      onCancel={onClose}
      className="custom-modal" // Adding a custom class
    >
      <div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Payment amount</h1>
          <h2 className="text-2xl font-bold">$200.00</h2>
        </div>
        <p className=" text-[14px] mt-4">
          This information should be emailed to the Organizer after submitted.
        </p>

        <div>
          <p className="text-md font-semibold text-[#18191B] mt-3 mb-2">
            Name on Card
          </p>
          <input
            className="bg-white border border-[#B2DAC4] rounded-xl w-full"
            type="text"
          />
        </div>
        <div>
          <p className="text-md font-semibold mb-2 mt-2">Card Number</p>
          <input
            className="bg-white border border-[#B2DAC4] rounded-xl w-full"
            type="text"
          />
        </div>
        <div className="mt-2 ">
          <div>
            <p className="text-md font-semibold mb-2">Payment Date</p>
            <input
              className="bg-white border border-[#B2DAC4] rounded-xl w-full"
              type="text"
            />
          </div>
        </div>

        <div>
          <p className="text-md font-semibold mb-2 mt-2">Confirmationn umber</p>
          <input
            className="bg-white border border-[#B2DAC4] rounded-xl w-full"
            type="text"
          />
        </div>

        <div className="grid grid-cols-2">
          <div>
            <p className="text-md font-semibold mb-2 mt-2">CVC</p>
            <input
              className="bg-white border border-[#B2DAC4] w-2/3 rounded-xl"
              type="text"
            />
          </div>
          <div>
            <p className="text-md font-semibold mb-2 mt-2">Country</p>
            <input
              className="bg-white border border-[#B2DAC4] w-full rounded-xl"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-8">
          <div className="mx-auto">
            <button className="bg-[#1B7443] p-2 text-center text-white w-80 rounded-md font-semibold">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
