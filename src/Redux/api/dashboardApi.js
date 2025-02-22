import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboardOverviewPoint: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/payment/all-overview",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      // providesTags: ["task"],
    }),

    getAllEarningAmountByYear: builder.query({
      query: (year) => {
        console.log("query year", year);
        
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: `/payment/all-earning-amount-by-year?year=${year}`,
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      // providesTags: ["task"],
    }),

    getAllTopSellPRoductAndlowSellProduct: builder.query({
      query: () => {
       
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: `/purchase-product/top-lowest-seller`,
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      // providesTags: ["task"],
    }),

  }),
});

export const {
  useGetAllDashboardOverviewPointQuery,
  useGetAllEarningAmountByYearQuery,
  useGetAllTopSellPRoductAndlowSellProductQuery
} = dashboardApi;
