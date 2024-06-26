import { CloseOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

const FileUpload = ({ setFile, file }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleDelete = () => {
    setSelectedImg(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const isExistSelectedImg = selectedImg;
  return (
    <div style={{ position: "relative" }}>
      <input
        accept=".jpg, .jpeg, .png"
        type="file"
        id="file-input"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!isExistSelectedImg && (
        <Typography textAlign="center" component="h3">
          Drag and drop a file or select add Image
        </Typography>
      )}

      {isExistSelectedImg && (
        <Stack display="flex">
          <Box sx={{ position: "relative" }}>
            <img
              src={selectedImg}
              style={{
                maxHeight: "200px",
                maxWidth: "200px",
                margin: "auto",
                padding: "20px",
              }}
            />
          </Box>
        </Stack>
      )}
      {isExistSelectedImg && (
        <Button
          onClick={handleDelete}
          sx={{
            display: "block",
            padding: "10px",
            width: "200px",
            fontWeight: "bold",
          }}
          variant="contained"
          color="error"
        >
          Remove
          <Typography component="span"> {file.name}</Typography>
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
