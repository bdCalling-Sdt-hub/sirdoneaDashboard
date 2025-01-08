import { baseApi } from "../baseApi";

const organizerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrganizers: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/organizer?status=accept",
          method: "GET",
          headers: {
            "content-type": "application/json",
            // "Content-type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["organizer"],
    }),
    getAllPendingOrganizers: builder.query({

      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/organizer?status=pending",
          method: "GET",
          headers: {
            // "Content-type": "multipart/form-data",
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["organizer"],
    }),
    getAllApprovedOrganizers: builder.query({

      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/organizer?status=accept",
          method: "GET",
          headers: {
            // "Content-type": "multipart/form-data",
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["organizer"],
    }),

    deletedOrganizers: builder.mutation({
      query: (id) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url:`/organizer/status-cencel/${id}`,
          method: "PATCH",
          headers: {
            // "Content-type": "multipart/form-data",
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["organizer"],
    }),
    approvedOrganizers: builder.mutation({
      query: (id) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url:`/organizer/status-accept/${id}`,
          method: "PATCH",
          headers: {
            // "Content-type": "multipart/form-data",
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["organizer"],
    }),
    paymentCompltedOrganizers: builder.mutation({
      query: (id) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url:`/organizer/payment-status/${id}`,
          method: "PATCH",
          headers: {
            // "Content-type": "multipart/form-data",
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["organizer"],
    }),
  }),
});

export const { useGetAllOrganizersQuery, useGetAllPendingOrganizersQuery, useGetAllApprovedOrganizersQuery, useDeletedOrganizersMutation,  useApprovedOrganizersMutation, usePaymentCompltedOrganizersMutation} = organizerApi;
