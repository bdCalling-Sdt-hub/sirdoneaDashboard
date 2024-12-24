// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersData: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/purchase-product/all",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    orderUpdateStatus: builder.mutation({
      query: ({orderId, updatedData}) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: `/purchase-product/${orderId}`,
          method: "PATCH",
          body: updatedData,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
   
  }),
});


export const { useGetAllOrdersDataQuery, useOrderUpdateStatusMutation} =
orderApi;
