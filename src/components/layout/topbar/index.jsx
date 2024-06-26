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
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const Topbar = () => {
  const { isOpenSidebar, handleToggle } = useContext(SidebarContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { logout, user } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    handleClose();
    logout();
  };

  function stringAvatar(name) {
    console.log(name);
    return {
      sx: {
        bgcolor: "#1F6CFA",
      },
      // children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
    };
  }

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
          {user?.username && <Avatar {...stringAvatar(user?.username)} />}
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
            {user?.photo ? (
              <Avatar sx={{ boxShadow: "0 0 3px #3c485826" }} />
            ) : (
              <Avatar {...stringAvatar(user?.username)} />
            )}

            <Stack>
              <Typography
                textTransform="capitalize"
                fontWeight="600"
                sx={{ fontSize: "13px" }}
                variant="p"
              >
                {user?.username}
              </Typography>
              <Typography
                variant="span"
                sx={{
                  fontSize: "11px",
                  textTransform: "capitalize",
                  color: "#8492a6",
                }}
              >
                {user?.role}
              </Typography>
            </Stack>
          </Box>
          <MenuItem onClick={handleClose}>
            <Link to="/profile"> My Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
