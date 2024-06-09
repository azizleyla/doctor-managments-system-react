import { Box, Button, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorSidebarList = () => {
  const navigate = useNavigate();

  return (
    <Box className="doctorListContainer">
      <Typography
        variant="h5"
        fontSize="1.2rem"
        sx={{ padding: "10px 0" }}
      >
        Doctors List
      </Typography>
      <Box sx={{ height: "100%", maxHeight: "500px" }}>
        <List sx={{ padding: "20px 0", borderTop: "1px solid #e9ecef" }}>
          {/* {data?.map((item, index) => (
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{ padding: 0, marginBottom: "25px", gap: "15px" }}
            >
              <Box
                component="img"
                sx={{
                  width: "110px",
                  boxShadow: "0 0 3px #3c485826 !important",
                  borderRadius: "10px",
                  height: "110px",
                }}
                src={item.img}
              />
              <Box>
                <a sx={{ color: "#212529", fontWeight: "600" }}>
                  {item.title}
                </a>
                <Typography
                  sx={{ color: "#8492a6" }}
                  my={0.5}
                  component="p"
                >
                  {item.position}
                </Typography>
                <Typography sx={{ color: "#8492a6" }} component="p">
                  {item.experience} Years Experienced
                </Typography>
              </Box>
            </ListItem>
          ))} */}
        </List>
        <Button
          onClick={() => {
            navigate("/doctors");
          }}
          variant="contained"
        >
          All Doctors
        </Button>
      </Box>
    </Box>
  );
};

export default DoctorSidebarList;
