import { Card, ConfigProvider, Select } from "antd";

import { AllIcons } from "../../../public/images/AllImages";
import { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "../Tables/UsersTable";
import Area_Chart from "../Chart/AreaChart";
import EarningsPieChart from "../Chart/EarningsPieChart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="w-full min-h-[90vh] px-1 sm:px-2 lg:px-2">
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
                    $1500
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
                    100
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
                    Total Driver
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-semibold text-[#1B7443]">
                    25
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
                  30
                </p>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-white border-2 border-[#1D242D] py-2 px-1 lg:p-3  items-center justify-center flex-1">
              <div className="text-center">
                <p className="text-xs lg:text-base xl:text-2xl text-[#1D242D] mb-1">
                  Running Campaign
                </p>
                <p className="text-sm lg:text-base xl:text-3xl font-semibold text-[#1B7443]">
                  20
                </p>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-white border-2 border-[#1D242D] py-2 px-1 lg:p-3  items-center justify-center flex-1">
              <div className="text-center">
                <p className="text-xs lg:text-base xl:text-2xl text-[#1D242D] mb-1">
                  Completed Campaign
                </p>
                <p className="text-sm lg:text-base xl:text-3xl font-semibold text-[#1B7443]">
                  15
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
                        fontSize: 16,
                        colorBorder: "#222222",
                      },
                    },
                  }}
                >
                  <Select
                    defaultValue="2024"
                    style={{ width: 80 }}
                    options={[
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
              <Area_Chart />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mt-5"></div>

        <div className="flex flex-col lg:flex-row gap-3">
          <div
            className="rounded flex-1"
          >
            <div className="flex justify-between items-center mx-3 ">
              <p className="text-2xl font-semibold text-base-color">
                Recent users
              </p>
              {/* <div>
                <Link to="/users">
                  <p className="text-lg text-base-color underline">view all</p>
                </Link>
              </div> */}
            </div>
            <UsersTable data={data} loading={loading} />
          </div>
          <div>
            <p className="text-xl font-bold text-black mb-1">Earning Chart</p>
            <div className="flex flex-col items-center justify-center">
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      headerBg: "#1B7443",
                      colorTextHeading: "rgb(253,253,253)",
                    },
                  },
                }}
              >
                <Card
                  title="Comparing With Previous Month"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "2px solid #1B7443",
                    borderRadius: "12px",
                  }}
                >
                  <EarningsPieChart />
                  <div className="flex lg:flex-col xl:flex-row items-center justify-between mx-6 gap-7">
                    <div>
                      <p className="text-lg">Earning</p>
                      <p className="text-2xl font-bold">$ 3500.55</p>
                    </div>
                    <div>
                      <p className="text-base text-[#28C66F]">62%</p>
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
