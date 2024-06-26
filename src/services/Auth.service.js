import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const Auth_key = "authApi";

export const authApi = createApi({
    reducerPath: Auth_key,
    baseQuery: axiosBaseQuery(),
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: `auth/login`,
                method: "POST",
                data,
            }),
            providesTags: ['auth']
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: "auth/signup",
                method: "POST",
                data
            }),
            invalidatesTags: ['auth']
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: "auth/profile", // Adjust this URL based on your backend endpoint for fetching profiles
                method: "GET"
            }),
            providesTags: ['auth'],
            transformResponse: (response) => {
                return response.data
            },
        })

    })
})

export const { useLoginUserMutation, useGetUserProfileQuery, useRegisterUserMutation } = authApi;
