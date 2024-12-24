import axios from "axios";
import { useEffect, useState } from "react";
import { LuArrowLeftRight } from "react-icons/lu";
import EarningTable from "../Tables/EarningTable";
import ViewEarningModal from "../UI/ViewEarningModal";
import { useGetAllPaymentEarningsQuery, useGetAllPaymentTodayAndTotalEarningsQuery } from "../../Redux/api/payment";

export default function Earning() {

  //* It's Use to Show Modal
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  const [currentRecord, setCurrentRecord] = useState(null);

  const {data: earningData, isLoading} = useGetAllPaymentEarningsQuery();
  const {data: earningDataToday, isLoading: isLoadingToday} = useGetAllPaymentTodayAndTotalEarningsQuery();

  console.log('earningDataToday ', earningDataToday?.data);
  

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  return (
    <div className="min-h-[90vh]">
      <div
        className="bg-[#FFFFFF] rounded p-3"
        style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
      >
        <div className="flex justify-between p-6">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <h1 className="text-3xl font-semibold text-[#1B7443]">Earning</h1>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-3 bg-[#1b7443] text-primary-color px-4 py-2 rounded">
                <LuArrowLeftRight />
                <h1>Today’s Earning</h1>
                <h1 className="font-semibold text-lg">${earningDataToday?.data?.todayEarnings}</h1>
              </div>
              <div className="flex items-center gap-3 bg-[#1b7443] text-primary-color px-4 py-2 rounded">
                <LuArrowLeftRight />
                <h1>Total Earning</h1>
                <h1 className="font-semibold text-lg">${earningDataToday?.data?.totalEarnings}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 lg:px-6">
          <EarningTable
            data={earningData?.data}
            loading={isLoading}
            showViewModal={showViewModal}
            pageSize={8}
          />
        </div>

        <ViewEarningModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
}
