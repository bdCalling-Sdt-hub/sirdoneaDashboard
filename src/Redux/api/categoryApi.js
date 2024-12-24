// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/category/admin",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: (formData) => {
        console.log('formdata query', formData);
        
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/category/create-category",
          method: "POST",
          body: formData,
          headers: {
            // "content-type": "application/json",
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          invalidatesTags: ["category"],
        };
      },
      
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        // console.log('formdata query', formData);
        
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: `/category/${id}`,
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          invalidatesTags: ["category"],
        };
      },
      
    }),
    activeZDeactiveStatusCategory: builder.mutation({
      query: (id) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: `/category/isActive/${id}`,
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          invalidatesTags: ["category"],
        };
      },
    }),

    updateCategory: builder.mutation({
      query: ({id, formData}) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("formdata query", formData);
        return {
          url: `/category/${id}`,
          method: "PATCH",
          body: formData, 
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});


export const { useGetAllCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useActiveZDeactiveStatusCategoryMutation, useUpdateCategoryMutation } =
  categoryApi;
