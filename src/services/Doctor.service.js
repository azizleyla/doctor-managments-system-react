import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const Auth_key = "doctorsApi";

export const doctorsApi = createApi({
    reducerPath: Auth_key,
    baseQuery: axiosBaseQuery(),
    tagTypes: ['doctors'],
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: (data) => ({
                url: `/doctors`,
                method: "GET",
                data,
            }),

            providesTags: ['doctors']
        }),


    })
})

export const { useGetDoctorsQuery } = doctorsApi;
