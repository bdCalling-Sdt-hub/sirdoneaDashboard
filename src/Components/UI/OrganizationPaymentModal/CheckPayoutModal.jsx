import { Button, Modal } from "antd";

export default function CheckPayoutModal({ onClose, visible, data }) {
  return (
    <Modal visible={visible} footer={null} width={400} className="rounded-lg">
      <div className=" px-6">
        <h1 className="text-[#1B7443] text-md font-semibold text-center">
          Check Payout Information
        </h1>

        <div>
          <p className="text-[#18191B] mt-3 mb-2">
            Pay to (name/organization the check should be issued to)
          </p>
          <input className="bg-[#DEF2E7] w-full" type="text" />
        </div>
        <div>
          <p className="mb-2 mt-2">Where should the check be mailed?</p>
          <input className="bg-[#DEF2E7] w-full" type="text" />
        </div>
        <div className="mt-2 ">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="mb-2">Street Address</p>
              <input className="bg-[#DEF2E7] w-full" type="text" />
            </div>
            <div>
              <p className="mb-2">Unit/Apt</p>
              <input className="bg-[#DEF2E7] w-full" type="text" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div>
            <p className="mb-1">City</p>
            <input className="bg-[#DEF2E7] w-full" type="text" />
          </div>
          <div>
            <p className="mb-1">State</p>
            <input className="bg-[#DEF2E7] w-full" type="text" />
          </div>
          <div>
            <p className="mb-1">Zip</p>
            <input className="bg-[#DEF2E7] w-full" type="text" />
          </div>
        </div>
        <div>
          <p className="mb-2 mt-2">
            Memo Section (if blank we will put Teas for a Cause Fundraiser)
          </p>
          <input className="bg-[#DEF2E7] w-full" type="text" />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          onClick={() => onClose()}
          className="bg-[#FBA19C] text-[#FF0E00] px-6 py-2 rounded-md"
        >
          Cancel
        </Button>
        <Button
          onClick={() => console.log("Approve clicked")}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
}
