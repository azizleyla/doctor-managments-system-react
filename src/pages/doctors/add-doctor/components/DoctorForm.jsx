import {
  Box,
  Button,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "./style.scss";
import {
  useAddDoctorMutation,
  useUpdateDoctorMutation,
} from "../../../../services/Doctor.service";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { singleDropzoneOptions } from "../../../../utils/constants";
import { FileUpload } from "../../../../UI_library";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email is invalid")
      .required("Email is required"),
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
  })
  .required();

const DoctorForm = ({ doctor }) => {
  const [addDoctor] = useAddDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();

  const isAddMode = !doctor;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: doctor
      ? {
          email: doctor?.email,
          bio: doctor.bio,
          gender: { value: doctor.gender, label: doctor.gender },
          position: {
            value: doctor.position,
            label: doctor.position,
          },
          firstname: doctor.firstname,
          lastname: doctor.lastname,
        }
      : "",
  });
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);

  // const handleUpload = (files) => {
  //   console.log(files);
  //   setSelectedFile(files[0]);
  // };

  const onSubmit = async (values) => {
    const { gender, position } = values;
    const formData = new FormData();
    formData.append("gender", gender?.value);
    formData.append("position", position?.value);
    if (selectedFiles) {
      formData.append("img_path", selectedFiles[0]);
    }
    Object.keys(values).forEach((key) => {
      if (key !== "gender" && key !== "position") {
        formData.append(key, values[key]);
        console.log(values, "vvv");
      }
    });

    if (isAddMode) {
      await addDoctor(formData);
    } else {
      const doctorId = doctor._id;
    const res = await updateDoctor({ doctorId, data: formData });
    }
    navigate("/doctors");
  };
  useEffect(() => {
    if (doctor) {
      const { email, bio, gender, position, firstname, lastname } = doctor;
      reset({
        email,
        bio,
        gender: { value: gender, label: gender },
        position: {
          value: position,
          label: position,
        },
        firstname,
        lastname,
      });
    }
  }, [doctor]);
  return (
    <Box className="doctorForm-box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid spacing={3} container>
          <Grid item md={6}>
            <FormLabel>First Name</FormLabel>
            <Controller
              rules={{ required: true }}
              style={{ width: "100%" }}
              control={control}
              name="firstname"
              render={({ field }) => (
                <TextField placeholder="First Name:" {...field} />
              )}
            />
            <Typography
              variant="span"
              sx={{ color: "red", fontSize: "10px" }}
            >
              {errors?.firstname?.message}
            </Typography>
          </Grid>

          <Grid item md={6}>
            <FormLabel>Last Name</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="lastname"
              render={({ field }) => (
                <TextField placeholder="Last Name" {...field} />
              )}
            />
            <Typography
              variant="span"
              sx={{ color: "red", fontSize: "10px" }}
            >
              {errors?.lastname?.message}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <FormLabel>Email</FormLabel>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField placeholder="Email" {...field} />
              )}
            />
            <Typography
              variant="span"
              sx={{ color: "red", fontSize: "10px" }}
            >
              {errors?.email?.message}
            </Typography>
          </Grid>
          {/* <Grid item md={6}>
            <FormLabel>Phone No.</FormLabel>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <TextField placeholder="Phone no.:" {...field} />
              )}
            />
          </Grid> */}
          <Grid item md={6}>
            <FormLabel>Departments</FormLabel>
            <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "eye", label: "Eye Doctor" },
                    { value: "orthopedic", label: "Orthopedic" },
                    { value: "psychotherapy", label: "Psychotherapy" },
                  ]}
                />
              )}
            />
          </Grid>
          <Grid item md={6}>
            <FormLabel>Gender</FormLabel>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
              )}
            />
          </Grid>
          <Grid item md={12}>
            <FormLabel>Bio</FormLabel>
            <Controller
              control={control}
              name="bio"
              render={({ field }) => (
                <textarea
                  className="customTextarea"
                  rows={5}
                  name="Size"
                  placeholder="Large"
                />
              )}
            />
          </Grid>
        </Grid>
        <Box>
          <FileUpload
            options={singleDropzoneOptions}
            setSelectedFiles={setSelectedFiles}
          />
        </Box>
        <Button
          type="submit"
          sx={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
        >
          {isAddMode ? "Add User" : "Edit User"}
        </Button>
      </form>
    </Box>
  );
};

export default DoctorForm;
