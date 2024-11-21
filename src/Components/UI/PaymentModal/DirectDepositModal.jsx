import { Button, Modal } from "antd";

export default function DirectDepositModal({ onClose, visible, data }) {
  return (
    <Modal
      visible={visible}
      footer={null}
      width={400}
      className="rounded-lg"
      cancelButtonProps={{
        disabled: true,
      }}
    >
      <div className="ml-8 px-6">
        <h1 className="text-[#1B7443] text-md font-semibold">
          Direct Deposit/ACH Information
        </h1>
        <div>
          <p className="mb-2 mt-2 text-left">Name on the account</p>
          <input className="bg-[#DEF2E7] w-2/3" type="text" />
        </div>
        <div>
          <p className="mb-2 mt-2">Bank Routing Number</p>
          <input className="bg-[#DEF2E7] w-2/3" type="text" />
        </div>
        <div>
          <p className="mb-2 mt-2">Account Number</p>
          <input className="bg-[#DEF2E7] w-2/3" type="text" />
        </div>
        <div>
          <p className="mb-2 mt-2">Zip (of address on account)</p>
          <input className="bg-[#DEF2E7] w-2/3" type="text" />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          onClick={() => onClose()}
          className="bg-red-500 text-white px-6 py-2 rounded-md"
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
