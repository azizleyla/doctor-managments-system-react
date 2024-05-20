import React from "react";
import { doctorsData } from "../../utils/constants";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton as MuiSkeleton,
  Typography,
} from "@mui/material";

const SkeletonLoading = () => {
  const isLoading = true;
  return (
    <Grid mt={2} container spacing={3}>
      {doctorsData.map((doctor) => (
        <Grid item lg={3}>
          <Card
            sx={{
              borderRadius: "6px",
              boxShadow: "0 0 3px #3c485826",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <MuiSkeleton
                variant="rectangular"
                width="100%"
                height={200}
              />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                transition: "all 0.3s",
                cursor: "pointer",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <MuiSkeleton variant="text" width={120} height={30} />
              <MuiSkeleton variant="text" width={80} height={20} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoading;
