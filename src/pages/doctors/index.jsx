import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import "./style.scss";
import {
  useDeleteDoctorMutation,
  useGetDoctorsQuery,
} from "../../services/Doctor.service";
import MuiDataTable from "../../components/shared/table";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";

const Doctors = () => {
  const navigate = useNavigate();
  const { data: doctors, isLoading, isError } = useGetDoctorsQuery();

  const [deleteDoctor] = useDeleteDoctorMutation();
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <>
            <Box
              sx={{
                width: "30px",
                verticalAlign: "middle",
                height: "30px",
                borderRadius: "50%",
                marginRight: "5px",
                border: "1px solid gray",
              }}
              component="img"
              src={`http://localhost:8080/${params.row.img_path}`}
            />
            {params.row.firstname} {params.row.lastname}
          </>
        );
      },
    },
    {
      field: "position",
      headerName: "Department",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 110,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Mobile",
      sortable: false,
      width: 160,
    },
    {
      field: "createdAt",
      headerName: "Joining Date",
      sortable: true,
      width: 160,
      renderCell: (record) => {
        return <>{moment(record.row.createdAt).format("MM.DD.YYYY")}</>;
      },
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (record) => {
        return (
          <Stack
            sx={{ marginTop: "6px" }}
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <IconButton
              sx={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                background: "#396cf01a",
                border: "1px solid #396cf01a",
                boxShadow: "0 3px 5px 0 #396cf04d",
              }}
              variant="outlined"
              color="warning"
              size="small"
            >
              <VisibilityIcon
                sx={{ fontSize: "16px", color: "#396cf0" }}
              />
            </IconButton>
            <IconButton
              sx={{
                width: "36px",
                height: "36px",
                border: "1px solid #53c7971a",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                background: "#53c7971a",
                boxShadow: "0 3px 5px 0 #53c7971a",
              }}
              variant="outlined"
              color="warning"
              size="small"
            >
              <EditIcon sx={{ fontSize: "16px", color: "#53c797" }} />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(record.row.id)}
              sx={{
                background: "#f0735a1a",
                border: "1px solid #f0735a1a",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 3px 5px 0 #f0735a1a",
              }}
              variant="outlined"
              color="error"
              size="small"
            >
              <DeleteOutlineIcon
                sx={{ fontSize: "16px", color: "#f0735a" }}
              />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id) => {
    await deleteDoctor(id)
      .unwrap()
      .then((payload) => console.log(payload))
      .catch((error) => console.log(error));
  };
  return (
    <Box>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography component="h5" fontSize="1.2rem" fontWight="600">
          Doctors
        </Typography>
        <Button
          onClick={() => navigate("/doctors/add-doctor")}
          color="primary"
          variant="contained"
        >
          Add New Doctor
        </Button>
      </Stack>
      <MuiDataTable
        sx={{ marginTop: "20px" }}
        rows={doctors}
        columns={columns}
      />
    </Box>
  );
};

export default Doctors;
