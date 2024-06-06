import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import moment from "moment/moment";

const Profile = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "4px",
      }}
    >
      <Box
        sx={{
          background: "#f5f5f5",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          padding: "15px",
          borderBottom: "1px solid #ddd",
        }}
      ></Box>
      <Grid container sx={{ padding: "10px " }}>
        <Grid item lg={4} textAlign="center">
          <Box
            src="https://hospitalnew.bdtask.com/demo7/assets/images/staff.png"
            component="img"
          />
          <Typography
            mt={3}
            fontWeight="600"
            component="h3"
            textTransform="capitalize"
          >
            {user?.username} ({user?.role})
          </Typography>
        </Grid>
        <Grid item lg={8}>
          <List>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText>
                <Typography
                  sx={{ fontWeight: "600", fontSize: "13px" }}
                  variant="p"
                >
                  Username:{" "}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "13px",
                    textTransform: "capitalize",
                  }}
                  variant="p"
                >
                  {user?.username}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText>
                <Typography
                  sx={{ fontWeight: "600", fontSize: "13px" }}
                  variant="p"
                >
                  Email:{" "}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "13px",
                    textTransform: "capitalize",
                  }}
                  variant="p"
                >
                  {user?.email}
                </Typography>
              </ListItemText>{" "}
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText>
                <Typography
                  sx={{ fontWeight: "600", fontSize: "13px" }}
                  variant="p"
                >
                  Role:{" "}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "13px",
                    textTransform: "capitalize",
                  }}
                  variant="p"
                >
                  {user?.role}
                </Typography>
              </ListItemText>{" "}
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText>
                <Typography
                  sx={{ fontWeight: "600", fontSize: "13px" }}
                  variant="p"
                >
                  Create Date:{" "}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "13px",
                    textTransform: "capitalize",
                  }}
                  variant="p"
                >
                  {moment(user?.createdAt).format("LL")}
                </Typography>
              </ListItemText>{" "}
            </ListItem>

            <ListItem sx={{ padding: 0 }}>
              <ListItemText>
                <Typography
                  sx={{ fontWeight: "600", fontSize: "13px" }}
                  variant="p"
                >
                  Gender:{" "}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "13px",
                    textTransform: "capitalize",
                  }}
                  variant="p"
                >
                  Male
                </Typography>
              </ListItemText>{" "}
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
