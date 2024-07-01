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
import { useAddDoctorMutation } from "../../../../services/Doctor.service";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { singleDropzoneOptions } from "../../../../utils/constants";
import { FileUpload } from "../../../../UI_library";

const schema = yup
  .object({
    firstname: yup.string().required("firstname is required"),
    lastname: yup.string().required("lastname is required"),
  })
  .required();

const DoctorForm = ({ data }) => {
  const [addDoctor] = useAddDoctorMutation();
  console.log(data);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: data?.email || "",
      bio: data?.bio || "",
      gender: { value: data?.gender || "", label: data?.gender || "" },
      position: {
        value: data?.position || "",
        label: data?.position || "",
      },
      firstname: data?.firstname || "",
      lastname: data?.lastname || "",
    },
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
    // console.log(selectedFile);
    if (selectedFiles) {
      formData.append("img_path", selectedFiles[0]);
    }

    Object.keys(values).forEach((key) => {
      if (key !== "gender" && key !== "position") {
        formData.append(key, values[key]);
      }
    });

    try {
      const res = await addDoctor(formData);
      navigate("/doctors");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        bio: data.bio,
        gender: { value: data.gender, label: data.gender },
        position: {
          value: data.position,
          label: data.position,
        },
        firstname: data.firstname,
        lastname: data.lastname,
      });
    }
  }, [data, reset]);
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
          Save
        </Button>
      </form>
    </Box>
  );
};

export default DoctorForm;
