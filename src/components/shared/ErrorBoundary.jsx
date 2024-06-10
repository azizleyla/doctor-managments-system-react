import { Component, ReactNode } from "react";
import { Typography, Button, Grid, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import * as Sentry from "@sentry/browser";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, errorInfo);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.hasError) {
      this.setState({ hasError: false });
    }
    return true;
  }

  render() {
    if (this.state.hasError) {
      return (
        <Grid
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <Paper
            elevation={10}
            style={{ padding: "20px", width: 500, margin: "0px auto" }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item alignItems="center">
                <img alt="Error" style={{ maxWidth: "250px" }} />
              </Grid>
              <Grid item alignItems="center">
                <Typography
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "var(--primary-color)",
                  }}
                  variant="h4"
                  gutterBottom
                  component="div"
                >
                  Komponentdə səhv baş verdi.
                </Typography>
                <Typography
                  style={{ textAlign: "center" }}
                  variant="body2"
                  gutterBottom
                  component="div"
                  mb={3}
                >
                  Ana səhifəyə qayıdıb səhifəni yeniləyin və ya aşağıdakı
                  düyməyə klik edin.
                </Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Button variant="outlined" component={NavLink} to="/">
                    Əsas səhifəyə qayıt
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
