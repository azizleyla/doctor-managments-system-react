import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ShortInfo = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography fontSize="17px" variant="h5" fontWeight={600}>
          Thomas Joyer
        </Typography>
      </Stack>

      <List sx={{ display: "flex", justifyContent: "space-between" }}>
        <ListItem>
          <List>
            <ListItem>
              <Typography fontWeight="600" component="h6">
                Age:
              </Typography>
              <Typography component="p" ml={1}>
                {" "}
                26 years old
              </Typography>
            </ListItem>
            <ListItem>
              <Typography fontWeight="600" component="h6">
                Gender:
              </Typography>
              <Typography component="p" ml={1}>
                {" "}
                Female
              </Typography>
            </ListItem>
            <ListItem>
              <Typography fontWeight="600" component="h6">
                Department:
              </Typography>
              <Typography component="p" ml={1}>
                {" "}
                Eye
              </Typography>
            </ListItem>
          </List>
        </ListItem>

        <ListItem>
          <List>
            <ListItem>
              <Typography fontWeight="600" component="h6">
                Phone:
              </Typography>
              <Typography component="p" ml={1}>
                {" "}
                +994 566 456 46
              </Typography>
            </ListItem>

            <ListItem>
              <Typography fontWeight="600" component="h6">
                Address:
              </Typography>
              <Typography component="p" ml={1}>
                {" "}
                Baku
              </Typography>
            </ListItem>
          </List>
        </ListItem>
      </List>
    </Box>
  );
};

export default ShortInfo;
