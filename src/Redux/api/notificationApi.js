// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/notification/admin-all",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
   
  }),
});


export const { useGetAllNotificationQuery} =
notificationApi;
