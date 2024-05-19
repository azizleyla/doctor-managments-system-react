import {
  Avatar,
  Box,
  Button,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SidebarContext } from "../../layout";

const Topbar = () => {
  const { isOpenSidebar, handleToggle } = useContext(SidebarContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: 0,
        transition: "all 0.3s",
        left: isOpenSidebar ? "300px" : 0, // Corrected the curly braces and added a missing comma
        zIndex: 999,
        maxHeight: "70px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          position: "relative",
          padding: "0 24px",
          background: "#fff",
          height: "71px",
        }}
      >
        <Button
          sx={{
            padding: 0,
            minWidth: "36px",
            width: "36px",
            height: "36px",
            border: "1px solid #396cf01a",
            display: "flex",
            boxShadow: "0 3px 5px 0 #396cf04d",
            backgroundColor: "#396cf01a",
            borderRadius: "30px",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleToggle(!isOpenSidebar)}
        >
          <MenuIcon />
        </Button>
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            border: "1px solid #1975D1",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            padding: 0,
            minWidth: 0,
          }}
        >
          <Avatar
            alt="avatar"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              boxShadow: "0 0 3px #3c485826",
            }}
            src="https://doctris-react-admin.vercel.app/static/media/01.d8b9651b2a3ba6336221.jpg"
          />
        </Button>
        <Menu
          disableScrollLock={true}
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          sx={{
            "& .MuiPaper-root": {
              minWidth: "200px",
              boxShadow: "0 0 3px #3c485826",
              padding: "5px 20px",

              "& .MuiMenuItem-root": {
                fontSize: "14px",
              },
            },
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <Box
            sx={{ marginBottom: "10px" }}
            display="flex"
            gap={1}
            alignItems="center"
          >
            <Avatar
              sx={{ boxShadow: "0 0 3px #3c485826" }}
              src="https://doctris-react-admin.vercel.app/static/media/01.d8b9651b2a3ba6336221.jpg"
            />
            <Stack>
              <Typography
                fontWeight="600"
                sx={{ fontSize: "13px" }}
                variant="p"
              >
                Carvin Carlo
              </Typography>
              <Typography
                variant="span"
                sx={{ fontSize: "11px", color: "#8492a6" }}
              >
                Eye Doctor
              </Typography>
            </Stack>
          </Box>
          <MenuItem  onClick={handleClose}>Profile Settings</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
