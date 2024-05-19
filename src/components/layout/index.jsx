import React, { createContext, useState } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../shared/breadcrumb";
import clsx from "clsx";

export const SidebarContext = createContext();

const Layout = () => {
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
      <Box sx={{ height: "100vh" }}>
        <Sidebar />
        <main className={clsx({ mainLeft: isOpenSidebar })}>
          <Topbar />
          <Box sx={{ padding: "94px 14px  24px" }}>
            <Breadcrumb />
            <Outlet />
          </Box>
        </main>
      </Box>
    </SidebarContext.Provider>
  );
};

export default Layout;
