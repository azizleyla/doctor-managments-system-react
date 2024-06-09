import { Grid } from "@mui/material";
import React from "react";

const SkeletonLoading = ({ children, count }) => {
  const skeletons = Array(count)
    .fill(null)
    .map((_, index) => (
      <Grid key={index} item lg={3}>
        {children}
      </Grid>
    ));

  return (
    <Grid spacing={2} container>
      {skeletons}
    </Grid>
  );
};

export default SkeletonLoading;
