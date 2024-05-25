import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = ({ handleClose, title }) => {
  return (
    <MuiDialogTitle
      fontWeight={600}
      sx={{ m: 0, p: 2 }}
      id="customized-dialog-title"
    >
      {title}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
};

const Dialog = ({
  title,
  buttons,
  children,
  open,
  onClose,
  ...dialogProps
}) => {
  return (
    <MuiDialog
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      {...dialogProps}
    >
      {title && (
        <DialogTitle handleClose={onClose} title={title}></DialogTitle>
      )}
      <Divider />

      <DialogContent>{children}</DialogContent>
      {buttons && (
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Save changes
          </Button>
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
