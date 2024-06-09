import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import { ADD_DOCTOR, DELETE_DOCTOR, GET_DOCTORS } from "../utils/serviceRoutes/doctor.service.routes";

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

            providesTags: ['doctors']
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
