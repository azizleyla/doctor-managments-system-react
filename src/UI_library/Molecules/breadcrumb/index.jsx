import React, { useMemo } from "react";
import { Breadcrumbs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const { pathname } = useLocation();

  // Split the pathname and filter out empty strings and root path
  const pathnameArray = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname],
  );

  return (
    <Breadcrumbs
      sx={{ marginBottom: "20px" }}
      separator="›"
      aria-label="breadcrumb"
    >
      <Link to="/">Dashboard</Link>

      {/* Dynamically generate breadcrumb links based on current route */}
      {pathnameArray.map((path, index) => {
        const pathTo = `/${pathnameArray.slice(0, index + 1).join("/")}`;
        const label = path.replace(/-/g, " "); // Convert hyphens to spaces
        return (
          <Link
            key={index}
            to={pathTo}
            style={{ textTransform: "capitalize", color: "#396cf0" }}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
