import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, StoreCategory, User, UploadCategory } from "./types";
import { BASE_URL } from "../../api/config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/`,
  }),
  tagTypes: ["StoreCategory", "Category"],
  endpoints: (builder) => ({
    getStoreCategories: builder.query<StoreCategory[], void>({
      query: () => "admin/store-category/get-all/",
      providesTags: ["StoreCategory"],
    }),
    signUp: builder.mutation<User, Object>({
      query: (user) => ({
        url: "user/store/signup",
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation<User, Object>({
      query: (loginDetails) => ({
        url: "user/store/signin",
        method: "POST",
        body: loginDetails,
      }),
    }),
    getItems: builder.query<Object, number>({
      query: (store_id) => ({
        url: `user/store/item/get-all-items/${store_id}`,
      }),
    }),
    addItem: builder.mutation<Object, Object>({
      query: (item) => ({
        url: "user/store/item/add-item",
        method: "POST",
        body: item,
      }),
    }),
    getCategories: builder.query<Category[], number>({
      query: (store_id) => ({
        url: `user/store/item/category/get-all-categories/${store_id}`,
      }),
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation<Category, UploadCategory>({
      query: (category) => ({
        url: "user/store/item/category/add-category",
        method: "POST",
        body: category.data,
        headers: {
          "x-access-token": category.token,
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory:builder.mutation<Category,UploadCategory>({
      query: (category) => ({
        url: "user/store/item/category/update-category/",
        method: "PUT",
        body: category.data,
        headers: {
          "x-access-token": category.token,
          "Content-Type": "multipart/form-data",
        },
      }),
    })
  }),
});

export const {
  useGetStoreCategoriesQuery,
  useSignInMutation,
  useSignUpMutation,
  useAddCategoryMutation,
  useAddItemMutation,
  useGetItemsQuery,
  useGetCategoriesQuery,
} = apiSlice;
