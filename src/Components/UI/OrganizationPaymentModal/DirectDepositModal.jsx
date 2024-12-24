import { Button, Modal } from "antd";
import { useAccountInfoDetailsQuery } from "../../../Redux/api/payment";
import { usePaymentCompltedOrganizersMutation } from "../../../Redux/api/organizerApi";
import Swal from "sweetalert2";

export default function DirectDepositModal({ onClose, visible, data , refetch}) {
  console.log({data});

  const {data:acountInfo} = useAccountInfoDetailsQuery(data.userId._id);
  console.log('account back', acountInfo?.data);

  const [updatePaymentConform] = usePaymentCompltedOrganizersMutation();

  const handleUpdatePaymentConform =async(id)=>{

    try {
      const res =  await updatePaymentConform(id).unwrap();
      console.log("res", res);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Payment Confirmed!",
          text: "Payment Confirmed successfully.",
        });
        refetch();
        onClose();
      }
      
      
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while confirming payment.",
      });
      
    }

  }

  
  
  return (
    <Modal visible={visible} onCancel={onClose} footer={null} width={400} className="rounded-lg">
      <div className="ml-8 px-6">
        <h1 className="text-[#1B7443] text-md font-semibold">
          Direct Deposit/ACH Information
        </h1>
        <div>
          <p className="mb-2 mt-2 text-left">Name on the account</p>
          <input disabled defaultValue={acountInfo?.data?.name} className="bg-[#DEF2E7] w-2/3" type="text" />
        </div>
        <div>
          <p className="mb-2 mt-2">Bank Routing Number</p>
          <input disabled defaultValue={acountInfo?.data?.routingNumber} className="bg-[#DEF2E7] w-2/3" type="text" />
        </div>
        <div>
          <p className="mb-2 mt-2">Account Number</p>
          <input disabled defaultValue={acountInfo?.data?.accountNumber} className="bg-[#DEF2E7] w-2/3" type="text" />
        </div>
        <div>
          <p className="mb-2 mt-2">Zip (of address on account)</p>
          <input disabled defaultValue={acountInfo?.data?.zip} className="bg-[#DEF2E7] w-2/3" type="text" />
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
          onClick={() => handleUpdatePaymentConform(data._id)}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
}
