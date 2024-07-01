import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { shortMenuLinks } from "../components/layout/sidebar/constants";
import { useLocation } from "react-router-dom";

const HelmetProvider = ({ children }) => {
  const { pathname } = useLocation();

  const currentMenu = useMemo(() => {
    return shortMenuLinks.find((x) => pathname == x.path);
  }, [pathname]);

  return (
    <>
      <Helmet>
        <title>{currentMenu?.title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default HelmetProvider;
