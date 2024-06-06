import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const Auth_key = "doctorsApi";

export const doctorsApi = createApi({
    reducerPath: Auth_key,
    baseQuery: axiosBaseQuery(),
    tagTypes: ['doctors'],
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => ({
                url: `/doctors`,
                method: "GET",
            }),

            providesTags: ['doctors']
        }),
        addDoctor: builder.mutation({
            query: (data) => ({
                url: "doctors/add-doctor",
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
                url: `doctors/deletes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['doctors']
        })
    })
})

export const { useGetDoctorsQuery, useDeleteDoctorMutation, useAddDoctorMutation } = doctorsApi;
