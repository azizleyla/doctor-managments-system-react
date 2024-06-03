import { Box, Button, FormLabel, Grid, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "./style.scss";

const DoctorForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (values) => {
  };
  return (
    <Box className="doctorForm-box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid spacing={3} container>
          <Grid item md={6}>
            <FormLabel>First Name</FormLabel>
            <Controller
              style={{ width: "100%" }}
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField placeholder="First Name:" {...field} />
              )}
            />
          </Grid>

          <Grid item md={6}>
            <FormLabel>Last Name</FormLabel>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField placeholder="Last Name" {...field} />
              )}
            />
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
          </Grid>
          <Grid item md={6}>
            <FormLabel>Phone No.</FormLabel>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <TextField placeholder="Phone no.:" {...field} />
              )}
            />
          </Grid>
          <Grid item md={6}>
            <FormLabel>Departments</FormLabel>
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "chocolate", label: "Chocolate" },
                    { value: "strawberry", label: "Strawberry" },
                    { value: "vanilla", label: "Vanilla" },
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
        <Button
          type="submit"
          sx={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
        >
          Add Doctor
        </Button>
      </form>
    </Box>
  );
};

export default DoctorForm;
