import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Fade from "@mui/material/Fade";

const ActionsMenu = ({ handleEdit, handleDelete, record }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={() => handleDelete(record.row._id)}>
          <DeleteOutlineIcon
            sx={{ fontSize: "20px", marginRight: "4px" }}
          />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;
