import { Backdrop, Box, Typography } from "@mui/material";
import "./style.scss";

function LinearLoader({ loading = false, children }) {
  return (
    <>
      {loading ? (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: 777777,
            backgroundColor: "rgba(47, 43, 61,.5)",
          }}
          open="true"
        >
          <Box
            sx={{
              backgroundColor: "#7B1FA2",
              p: "16px 24px 24px",
              borderRadius: "6px",
              width: "300px",
            }}
          >
            <Typography
              component="p"
              variant="body1"
              fontSize="17px"
              mb={2}
              color="#fff"
            >
              Gözləyin
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "9px",
                display: "inline-block",
                position: "relative",
                background: "rgb(129,118,242)",
                borderRadius: "9999px",
                overflow: "hidden",
                "&::after": {
                  content: "''",
                  width: "192px",
                  borderRadius: "9999px",
                  height: "9px",
                  background: "#fff",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  boxSizing: "border-box",
                  animation: "animLinearLoader 2.2s linear infinite",
                },
              }}
            />
          </Box>
        </Backdrop>
      ) : (
        children
      )}
    </>
  );
}

export default LinearLoader;
