import { Button, Modal } from "antd";
import { useAccountInfoDetailsQuery } from "../../../Redux/api/payment";
import { usePaymentCompltedOrganizersMutation } from "../../../Redux/api/organizerApi";
import Swal from "sweetalert2";

export default function CheckPayoutModal({ onClose, visible, data, refetch }) {

  console.log({data});
  

  const {data:acountInfo} = useAccountInfoDetailsQuery(data.userId._id);

  console.log('acountInfo', acountInfo?.data)

  
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
      <div className=" px-6">
        <h1 className="text-[#1B7443] text-md font-semibold text-center">
          Check Payout Information
        </h1>

        <div>
          <p className="text-[#18191B] mt-3 mb-2">
            Pay to (name/organization the check should be issued to)
          </p>
          <input disabled defaultValue={acountInfo?.data?.name} className="bg-[#DEF2E7] w-full" type="text" />
        </div>
        <div className="mt-2 ">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="mb-2">Street Address</p>
              <input disabled defaultValue={acountInfo?.data?.streetAddress} className="bg-[#DEF2E7] w-full" type="text" />
            </div>
            <div>
              <p className="mb-2">Unit/Apt</p>
              <input disabled defaultValue={acountInfo?.data?.unit} className="bg-[#DEF2E7] w-full" type="text" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div>
            <p className="mb-1">City</p>
            <input disabled defaultValue={acountInfo?.data?.city} className="bg-[#DEF2E7] w-full" type="text" />
          </div>
          <div>
            <p className="mb-1">State</p>
            <input disabled defaultValue={acountInfo?.data?.state} className="bg-[#DEF2E7] w-full" type="text" />
          </div>
          <div>
            <p className="mb-1">Zip</p>
            <input disabled defaultValue={acountInfo?.data?.zip} className="bg-[#DEF2E7] w-full" type="text" />
          </div>
        </div>
        <div>
          <p className="mb-2 mt-2">
            Memo Section (if blank we will put Teas for a Cause Fundraiser)
          </p>
          <input disabled defaultValue={acountInfo?.data?.memoSection} className="bg-[#DEF2E7] w-full" type="text" />
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
