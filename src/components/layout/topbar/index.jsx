import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SidebarContext } from "../../layout";

const Topbar = () => {
  const { isOpenSidebar, handleToggle } = useContext(SidebarContext);

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
      </Box>
    </Box>
  );
};

export default Topbar;
