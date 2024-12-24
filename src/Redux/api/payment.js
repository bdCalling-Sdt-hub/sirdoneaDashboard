import { baseApi } from "../baseApi";


const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaymentEarnings: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/payment",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["payment"],
    }),
    getAllPaymentTodayAndTotalEarnings: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/payment/all-earning-amount",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["payment"],
    }),
    accountInfoDetails: builder.query({
      query: (userId) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: `/account-info?userId=${userId}`,
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["payment"],
    }),
   
   
  }),
});

export const {
  useGetAllPaymentEarningsQuery,
  useGetAllPaymentTodayAndTotalEarningsQuery,
  useAccountInfoDetailsQuery
} = paymentApi;
