import { Breadcrumbs } from "@mui/material";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const pathnameArray = useMemo(() => {
    return pathname?.split("/").filter(Boolean);
  }, [pathname]);

  return (
    <Breadcrumbs
      sx={{ marginBottom: "20px" }}
      separator="›"
      aria-label="breadcrumb"
    >
      <Link href="/">Dashboard</Link>
      {pathnameArray.map((path, index) => (
        <Link
          style={{ textTransform: "capitalize", color: "#396cf0" }}
          key={index}
          href={`/${path}`}
        >
          {path}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
