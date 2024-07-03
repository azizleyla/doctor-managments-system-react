import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Fade from "@mui/material/Fade";
import { PopupDialog } from "../../UI_library";

const ActionsMenu = ({ handleEdit, handleDelete, record }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogInfo, setDialogInfo] = useState({
    open: false,
    title: "",
    component: null,
  });
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = (id) => {
    setDialogInfo({
      open: true,
      title: "Delete Doctor",
      component: (
        <Box>
          <Typography component="h5">
            Are you sure to delete item?
          </Typography>
          <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
            <Button onClick={onClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete(id);
                onClose();
              }}
              color="primary"
              variant="contained"
            >
              Yes
            </Button>
          </Box>
        </Box>
      ),
    });
    handleClose();
  };
  const onClose = () => {
    setDialogInfo({
      open: false,
      title: "",
      component: null,
    });
  };

  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => handleClick(e)}
      >
        <MoreVertIcon />
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleEdit(record.row._id)}>
          <EditIcon sx={{ fontSize: "20px", marginRight: "4px" }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleOpenModal(record.row._id)}>
          <DeleteOutlineIcon
            sx={{ fontSize: "20px", marginRight: "4px" }}
          />
          Delete
        </MenuItem>
      </Menu>
      <PopupDialog
        fullWidth
        maxWidth="sm"
        onClose={onClose}
        open={dialogInfo.open}
        title={dialogInfo.title}
      >
        {dialogInfo.component}
      </PopupDialog>
    </>
  );
};

export default ActionsMenu;
