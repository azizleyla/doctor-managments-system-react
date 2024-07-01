import React from "react";
import DoctorForm from "../add-doctor/components/DoctorForm";
import { useGetDoctorByIdQuery } from "../../../services/Doctor.service";
import { useLocation, useParams } from "react-router-dom";

const EditDoctorPage = () => {
  const { id } = useParams();
  const { data: doctor } = useGetDoctorByIdQuery(id);

  console.log(doctor);
  return (
    <div>
      <DoctorForm data={doctor} />
    </div>
  );
};

export default EditDoctorPage;
