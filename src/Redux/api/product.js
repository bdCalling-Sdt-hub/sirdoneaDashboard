// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: "/product/all",
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        
      },
      providesTags: ["products"],
    }),
    
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/create-product",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "multipart/form-data",
        },
        invalidatesTags: ["products"],
      }),
    }),
    activeDeactiveStatusProduct: builder.mutation({
      query: (id) => {
        // console.log('formdata query', formData);
        
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: `/product/isActive/${id}`,
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          invalidatesTags: ["products"],
        };
      },
      
    }),
    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product-info/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-type": "multipart/form-data",
        },
        invalidatesTags: ["products"],
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => {
        // console.log('formdata query', formData);                      
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken", accessToken);
        return {
          url: `/product/${id}`,
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          invalidatesTags: ["products"],
        };
      },
    }),
  }),
});





export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useActiveDeactiveStatusProductMutation,
  useDeleteProductMutation
} = productApi;
