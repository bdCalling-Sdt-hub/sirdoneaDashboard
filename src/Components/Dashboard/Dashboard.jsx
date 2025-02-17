import { Card, ConfigProvider, Select } from "antd";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { AllIcons } from "../../../public/images/AllImages";
import Area_Chart from "../Chart/AreaChart";
import EarningsPieChart from "../Chart/EarningsPieChart";
import InventoryTracking from "../Tables/InventoryTracking";
import { useGetAllDashboardOverviewPointQuery, useGetAllTopSellPRoductAndlowSellProductQuery } from "../../Redux/api/dashboardApi";
import { useGetAllProductsQuery } from "../../Redux/api/product";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {data:overviewData, isLoading} = useGetAllDashboardOverviewPointQuery();
  console.log("overviewData",overviewData?.data);
  const [year, setYear] = useState(new Date().getFullYear());
  // console.log('year',year);
  const {data:products, isLoading:productLoading} = useGetAllProductsQuery();

  const {data:topAndLowestProducts, isLoading:topAndLowestProductLoading} = useGetAllTopSellPRoductAndlowSellProductQuery();

  console.log('{topAndLowestProducts?.data}',topAndLowestProducts?.data );
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
        const recentData = response.data?.slice(0, 5);

        setData(recentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-[90vh] px-1 sm:px-2 lg:px-2 ">
      <div>
        <div className="flex flex-col gap-5">
          {/* Card Items */}
          <div className="flex flex-col sm:flex-row gap-1 lg:gap-5">
            <div className="flex gap-5 flex-wrap rounded-lg bg-white border-2 border-[#1D242D] py-2 px-1 lg:p-3  items-center justify-center flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3 rounded-full w-fit">
                  <img src={AllIcons.coins} className="size-16" alt="" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-base xl:text-2xl text-[#1D242D] mb-1">
                    Total Earning
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-semibold text-[#1B7443]">
                    {/* ${ overviewData?.data?.totalEarnings} */}
                    ${Math.round(overviewData?.data?.totalEarnings)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-white border-2 border-[#1D242D] py-2 px-1 lg:p-3  items-center justify-center flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3 rounded-full w-fit">
                  <img src={AllIcons.user} className="size-16" alt="" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-[#1D242D] mb-1">
                    Total User
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-semibold text-[#1B7443]">
                    {overviewData?.data?.allUserCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-white border-2 border-[#1D242D] py-2 px-1 lg:p-3 items-center justify-center flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3 rounded-full w-fit">
                  <img src={AllIcons.org} className="size-16" alt="" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-[#1D242D] mb-1">
                    Total Organization
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-semibold text-[#1B7443]">
                  {overviewData?.data?.allOrganizationCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-1 lg:gap-5">
            <div className="flex gap-5 flex-wrap rounded-lg bg-white border-2 border-[#1D242D] py-2 px-1 lg:p-3  items-center justify-center flex-1">
              <div className="text-center">
                <p className="text-xs lg:text-base xl:text-2xl text-[#1D242D] mb-1">
                  Pending Campaign
                </p>
                <p className="text-sm lg:text-base xl:text-3xl font-semibold text-[#1B7443]">
                {overviewData?.data?.allOrganizationPending}
                </p>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-white border-2 border-[#1D242D] py-2 px-1 lg:p-3  items-center justify-center flex-1">
              <div className="text-center">
                <p className="text-xs lg:text-base xl:text-2xl text-[#1D242D] mb-1">
                  Running Campaign
                </p>
                <p className="text-sm lg:text-base xl:text-3xl font-semibold text-[#1B7443]">
                  {overviewData?.data?.allOrganizationRunning}
                </p>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-white border-2 border-[#1D242D] py-2 px-1 lg:p-3  items-center justify-center flex-1">
              <div className="text-center">
                <p className="text-xs lg:text-base xl:text-2xl text-[#1D242D] mb-1">
                  Completed Campaign
                </p>
                <p className="text-sm lg:text-base xl:text-3xl font-semibold text-[#1B7443]">
                {overviewData?.data?.allOrganizationCompleted}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          <div
            className="w-full p-3 bg-[#FFFFFF] rounded-lg flex flex-col"
            style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
          >
            <div className="flex justify-between text-base-color mt-4">
              <div>
                <p className="text-lg sm:text-xl font-bold mb-4">Income</p>
              </div>
              <div>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        fontSize: 18,
                        colorBorder: "#000",
                        optionSelectedBg: "rgb(254,188,96)",
                        optionActiveBg: "rgb(255,217,165)",
                      },
                    },
                  }}
                >
                  <Select
                  className="border border-[#000] rounded"
                    onChange={(value) => setYear(value)}
                    style={{ width: 100,}}
                    value={year}
                    options={[
                      { value: "2026", label: "2026" },
                      { value: "2025", label: "2025" },
                      { value: "2024", label: "2024" },
                      { value: "2023", label: "2023" },
                      { value: "2022", label: "2022" },
                      { value: "2021", label: "2021" },
                    ]}
                  />
                </ConfigProvider>
              </div>
            </div>
            <hr />
            <div>
              <Area_Chart year={year} />
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col lg:flex-row gap-4 mt-5"></div> */}

        <div className="lg:flex flex-col 2xl:flex-row gap-5">
          <div>
            <p className="text-2xl font-semibold text-base-color my-4">
              Inventory Tracking
            </p>
            <InventoryTracking data={products?.data} loading={productLoading} />
          </div>
          <div>
            <p className="text-xl font-bold text-black mt-4 mb-5">
              Product Sales
            </p>
            <div className="flex flex-col items-center justify-center">
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      headerBg: "#1B7443",
                      colorTextHeading: "rgb(253,253,253)",
                      paddingLG: 8,
                    },
                  },
                }}
              >
                <Card
                  title="Comparing With Previous Month"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                  }}
                >
                  <div className="flex justify-end px-2">
                    <button className="bg-[#D7FCE8] border border-teal-700 px-2 rounded-md text-lg">
                      Last one month
                    </button>
                  </div>
                  <div className="flex flex-col md:flex-row md:flex justify-center items-center mt-8 md:mt-0 mb-6">
                    <div>
                      <p className="text-[#656565]">Top selling</p>
                      <h4 className="font-semibold">{topAndLowestProducts?.data?.topProduct?.productName}</h4>
                      <h1 className="text-[#1B7443] text-2xl font-semibold">
                        ${topAndLowestProducts?.data?.topProduct?.productTotalAmount}
                      </h1>
                    </div>
                    <div>
                      <EarningsPieChart />
                    </div>
                    <div>
                      <p className="text-[#656565]">Low selling</p>
                      <h4 className="font-semibold">{topAndLowestProducts?.data?.lowProduct?.productName}</h4>
                      <h1 className="text-[#60CF92] text-2xl font-semibold">
                        ${topAndLowestProducts?.data?.lowProduct?.productTotalAmount}
                      </h1>
                    </div>
                  </div>
                  <div className="flex lg:flex-col xl:flex-row items-center justify-between mx-6 gap-7">
                    <div>
                      <p className="text-md md:text-base">Earning</p>
                      <p className="text-md md:text-xl font-bold">${topAndLowestProducts?.data?.totalEarning}</p>
                    </div>
                    <div>
                      <div className="flex justify-start items-center gap-1">
                        <p>
                          <FaArrowUp />
                        </p>
                        <p>62%</p>
                      </div>
                      <p className="text-sm text-[#656565]">
                        More than Last Month
                      </p>
                    </div>
                  </div>
                </Card>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
