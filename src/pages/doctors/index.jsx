import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import "./style.scss";
import {
  useDeleteDoctorMutation,
  useGetDoctorsQuery,
} from "../../services/Doctor.service";
import MuiDataTable from "../../UI_library/Molecules/table";
import moment from "moment";
import { ErrorBoundary } from "../../utils/ErrorBoundary";
import Fade from "@mui/material/Fade";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const Doctors = () => {
  const navigate = useNavigate();
  const { data: doctors, isLoading, isError } = useGetDoctorsQuery();
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [deleteDoctor] = useDeleteDoctorMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoctorId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(doctors);
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
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (record) => {
        return (
          <>
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => handleClick(e, record.row.id)}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={selectedDoctorId === record.row.id && open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>
                <EditIcon sx={{ fontSize: "20px", marginRight: "4px" }} />
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleDelete(record.row._id)}>
                <DeleteOutlineIcon
                  sx={{ fontSize: "20px", marginRight: "4px" }}
                />
                Delete
              </MenuItem>
              {/* <MenuItem onClick={handleClose}></MenuItem> */}
            </Menu>
          </>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    await deleteDoctor(id)
      .unwrap()
      .then((payload) => handleClose())
      .catch((error) => console.log(error));
  };
  if (isLoading) return <p>Loading..</p>;
  return (
    <ErrorBoundary>
      <Box>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography component="h5" fontSize="1.2rem" fontWeight="600">
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
    </ErrorBoundary>
  );
};

export default Doctors;
