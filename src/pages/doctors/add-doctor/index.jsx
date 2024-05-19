import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import DoctorForm from "./components/DoctorForm";
import DoctorSidebarList from "./components/DoctorSidebarList";

const AddDoctorPage = () => {
  return (
    <Box>
      <Typography component="h5" fontSize="1.2rem" fontWight="600">
        Add New Doctor
      </Typography>
      <Grid spacing={2} container mt={4}>
        <Grid item lg={8}>
          <DoctorForm />
        </Grid>
        <Grid item lg={4}>
          <DoctorSidebarList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddDoctorPage;
