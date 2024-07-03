import React, { useMemo } from "react";
import DoctorForm from "../add-doctor/components/DoctorForm";
import { useGetDoctorByIdQuery } from "../../../services/Doctor.service";
import { useLocation, useParams } from "react-router-dom";

const EditDoctorPage = () => {
  const { id } = useParams();
  const skip = !id; // Skip the query if `id` is not provided

  const { data, isLoading, error } = useGetDoctorByIdQuery(id, {
    skip,
  });

  return (
    <div>
      <DoctorForm loading={isLoading} doctor={data} />
    </div>
  );
};

export default EditDoctorPage;
