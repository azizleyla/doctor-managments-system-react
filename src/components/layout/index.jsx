import React, { createContext, useState } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const SidebarContext = createContext();

const Layout = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const handleToggle = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpenSidebar(open);
  };

  return (
    <SidebarContext.Provider
      value={{ isOpenSidebar, setIsOpenSidebar, handleToggle }}
    >
      <Box>
        <Sidebar />
        <main>
          <Topbar />
          <Outlet />
        </main>
      </Box>
    </SidebarContext.Provider>
  );
};

export default Layout;
