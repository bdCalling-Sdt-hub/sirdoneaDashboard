import { baseApi } from "../baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/users/all-users",
          method: "GET",
          // body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["users"],
    }),
    getMyprofile: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/users/my-profile",
          method: "GET",
          // body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["users"],
    }),
    updateMyprofile: builder.mutation({
      query: (formData) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log({ accessToken });

        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/users/update-my-profile",
          method: "PATCH",
          body: formData,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["users"],
    }),
  }),
});

export const { useAllUsersQuery, useGetMyprofileQuery, useUpdateMyprofileMutation } = usersApi;
