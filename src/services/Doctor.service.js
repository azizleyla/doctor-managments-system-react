import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import { ADD_DOCTOR, DELETE_DOCTOR, GET_DOCTORS } from "../utils/serviceRoutes/doctors";

export const Auth_key = "doctorsApi";

export const doctorsApi = createApi({
    reducerPath: Auth_key,
    baseQuery: axiosBaseQuery(),
    tagTypes: ['doctors'],
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => ({
                url: GET_DOCTORS,
                method: "GET",
            }),
            transformResponse: (response) => {
                // Transform the response data as needed
                return response.data; // Example: if the data is nested under a "data" key
            },
            providesTags: ['doctors'],

        }),
        addDoctor: builder.mutation({
            query: (data) => ({
                url: ADD_DOCTOR,
                method: 'POST',
                data,
                headers: {
                    'Content-Type': 'multipart/form-data;'
                },
            }),
            invalidatesTags: ['doctors']
        }),
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `${DELETE_DOCTOR}${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['doctors']
        })
    })
})

export const { useGetDoctorsQuery, useDeleteDoctorMutation, useAddDoctorMutation } = doctorsApi;
