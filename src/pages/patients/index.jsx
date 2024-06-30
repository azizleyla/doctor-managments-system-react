import React, { useState } from "react";
import MuiDataTable from "../../UI_library/Molecules/table";
import { IconButton, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShortInfo from "./components/ShortInfo";
import { ErrorBoundary } from "../../utils/ErrorBoundary";
import PopupDialog from "../../UI_library/Molecules/PopupDialog";

const rows = [
  {
    id: 1,
    name: "Ali Aliyev",
    age: 14,
    gender: "male",
    phone: "(+452) 8945 4568",
    address: "Baku",
  },
  {
    id: 2,
    name: "Leyla Aziz",
    age: 25,
    gender: "female",
    phone: "(+452) 8945 4568",
    address: "Baku",
  },
  {
    id: 3,
    name: "Aytac Mamedova",
    age: 31,
    gender: "female",
    phone: "(+452) 8945 4568",
    address: "Baku",
  },
  {
    id: 4,
    name: "Aynur Davud",
    age: 24,
    gender: "female",
    phone: "(+452) 8945 4568",
    address: "Baku",
  },
  {
    id: 5,
    name: "Ilkin Azizov",
    age: 19,
    gender: "male",
    phone: "(+452) 8945 4568",
    address: "Baku",
  },
  {
    id: 6,
    name: "Cefer Ceferov",
    age: 15,
    gender: "male",
    phone: "(+452) 8945 4568",
    address: "Baku",
  },
  {
    id: 7,
    name: "Nicat Karimov",
    age: 45,
    gender: "male",
    phone: "(+452) 8945 4568",
    address: "Baku",
  },
  {
    id: 8,
    name: "Sabina Mamedova",
    age: 36,
    gender: "female",
    phone: "(+452) 8945 4568",
    address: "Baku",
  },
  {
    id: 9,
    name: "Roxie Tylor",
    age: 26,
    gender: "male",
    phone: "(+452) 8945 4568",
    address: "Baku",
  },
];

const PatientsList = () => {
  const [allInfoDialog, setAllInfoDialog] = useState({
    open: false,
    profile: "",
    component: <></>,
  });

  const handleClickOpen = () => {
    setAllInfoDialog({
      open: true,
      title: "Profile",
      component: <ShortInfo />,
    });
  };

  const handleClose = () => {
    setAllInfoDialog({
      open: false,
      title: "",
      component: <></>,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      width: 150,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 110,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Mobile No",
      sortable: false,
      width: 160,
    },
    {
      field: "address",
      headerName: "Address",
      sortable: true,
      width: 160,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: () => {
        return (
          <Stack
            sx={{ marginTop: "6px" }}
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <IconButton
              onClick={handleClickOpen}
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

  return (
    <ErrorBoundary>
      <MuiDataTable
        sx={{
          "&.MuiDataGrid-root": {
            background: "#fff",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "600",
          },
        }}
        rows={rows}
        columns={columns}
      />
      <PopupDialog
        fullWidth
        maxWidth="sm"
        title={allInfoDialog.title}
        open={allInfoDialog.open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        allInfoDialog={allInfoDialog.open}
      >
        {allInfoDialog.component}
      </PopupDialog>
    </ErrorBoundary>
  );
};

export default PatientsList;
