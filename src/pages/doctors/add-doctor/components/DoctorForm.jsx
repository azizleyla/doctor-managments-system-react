import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  OutlinedInput,
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
import { LoadingOpacity } from "../../../../UI_library/Molecules/loader";
import InstagramIcon from "@mui/icons-material/Instagram";

import FacebookIcon from "@mui/icons-material/Facebook";
import { CheckBox } from "@mui/icons-material";
import WorkSchedule from "./WorkSchedule";
import { TextMaskCustom } from "./TextMaskCustom";
import { scheduleObj } from "./scheduleObj";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email is invalid")
      .required("Email is required"),
    firstname: yup.string().required("Firstname is required"),
    position: yup.object().shape({
      label: yup.string().required("Position is required"),
      value: yup.string().required("Position is required"),
    }),
    gender: yup.object().shape({
      label: yup.string().required("Gender is required"),
      value: yup.string().required("Gender is required"),
    }),
    phone: yup
      .string()
      .required("Phone is required")
      .min(15, "Telefonu düzgün daxil edin"),
    lastname: yup.string().required("Lastname is required"),
  })
  .required();

const DoctorForm = ({ loading, doctor }) => {
  const [addDoctor] = useAddDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();
  const isAddMode = !doctor;

  const {
    control,
    handleSubmit,
    reset,
    trigger: triggerDoctorForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: doctor
      ? {
          email: doctor?.email || "",
          bio: doctor.bio || "",
          gender: {
            value: doctor.gender || "",
            label: doctor.gender || "",
          },
          insta_link: "",
          fb_link: "",
          position: {
            value: doctor.position || "",
            label: doctor.position,
          },
          firstname: doctor.firstname || "",
          lastname: doctor.lastname || "",
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
    console.log(values);

    try {
      const { gender, position, insta_link, fb_link } = values;
      const formData = new FormData();
      formData.append("gender", gender?.value);
      formData.append("position", position?.value);
      let socialLink = {
        insta_link,
        fb_link,
      };
      formData.append("social_media", JSON.stringify(socialLink));
      if (selectedFiles) {
        formData.append("img_path", selectedFiles[0]);
      }
      Object.keys(values).forEach((key) => {
        if (
          key !== "gender" &&
          key !== "position" &&
          key !== "insta_link" &&
          key !== "fb_link"
        ) {
          formData.append(key, values[key]);
        }
      });

      if (isAddMode) {
        await addDoctor(formData);
      } else {
        const doctorId = doctor._id;
        await updateDoctor({ doctorId, data: formData });
      }
      navigate("/doctors");
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
    }
  };

  useEffect(() => {
    if (doctor) {
      const {
        email,
        bio,
        gender,
        social_media, // Assuming social_media is an object containing fb_link and insta_link
        position,
        firstname,
        lastname,
        phone,
      } = doctor;
      const { fb_link, insta_link } = social_media || {};
      reset({
        email,
        bio,
        fb_link,
        insta_link,
        phone,
        gender: { value: gender, label: gender },
        position: {
          value: position,
          label: position,
        },
        firstname,
        lastname,
      });
    }
    console.log(doctor);
  }, [doctor]);

  let maskProps = {
    mask: "(\\994)00-000-00-00",
    definitions: {
      "#": /[0]/,
    },
    placeholderChar: "_",
  };
  useEffect(() => {
    triggerDoctorForm();
    return () => {
      reset();
    };
  }, [triggerDoctorForm, reset]);

  const [workingDays, setWorkingDays] = useState([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]);

  const [workingHours, setWorkingHours] = useState([]);
  useEffect(() => {
    setWorkingHours(scheduleObj);
  }, []);
  return (
    <LoadingOpacity loading={loading}>
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
              <FormHelperText
                variant="span"
                sx={{ color: "red", fontSize: "10px" }}
              >
                {errors?.firstname?.message}
              </FormHelperText>
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
              <FormHelperText
                variant="span"
                sx={{ color: "red", fontSize: "10px" }}
              >
                {errors?.lastname?.message}
              </FormHelperText>
            </Grid>
            <Grid item md={6}>
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

            <Grid item md={6}>
              <FormLabel>Phone Number</FormLabel>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    fullWidth
                    inputComponent={TextMaskCustom}
                    type="text"
                    inputProps={{ maskProps }}
                  />
                )}
              />
              <FormHelperText
                variant="span"
                sx={{ color: "red", fontSize: "10px" }}
              >
                {errors?.phone?.message}
              </FormHelperText>
            </Grid>

            <Grid item md={6}>
              <FormLabel>Facebook</FormLabel>
              <Controller
                control={control}
                name="fb_link"
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FacebookIcon />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Username"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <FormLabel>Instagram</FormLabel>
              <Controller
                control={control}
                name="insta_link"
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InstagramIcon />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Username"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item md={6}>
              <FormLabel>Departments</FormLabel>
              <Controller
                control={control}
                name="position"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    {...field}
                    options={[
                      { value: "eye", label: "Eye Doctor" },
                      { value: "orthopedic", label: "Orthopedic" },
                      { value: "psychotherapy", label: "Psychotherapy" },
                    ]}
                  />
                )}
              />
              <FormHelperText
                variant="span"
                sx={{ color: "red", fontSize: "10px" }}
              >
                {errors?.position?.message ||
                  errors?.position?.label.message}
              </FormHelperText>
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
              <FormHelperText
                variant="span"
                sx={{ color: "red", fontSize: "10px" }}
              >
                {errors?.gender?.message || errors?.gender?.label.message}
              </FormHelperText>
            </Grid>
            <Grid item md={12}>
              <FormLabel>Bio</FormLabel>
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="customTextarea"
                    rows={5}
                    name="Size"
                    placeholder="Large"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box my={2}>
            <Typography component="span">Working hours</Typography>
            <WorkSchedule
              control={control}
              schedule={workingHours}
              workingDays={workingDays}
              reset={reset}
              setWorkingDays={setWorkingDays}
            />
          </Box>

          <Box>
            <FileUpload
              selectedFiles={selectedFiles}
              doctor={doctor}
              options={singleDropzoneOptions}
              handleChangeSelectedFile={setSelectedFiles}
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
    </LoadingOpacity>
  );
};

export default DoctorForm;
