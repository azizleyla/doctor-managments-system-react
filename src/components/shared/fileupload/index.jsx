import { CloseOutlined } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import React, { useRef, useState } from "react";

const FileUpload = ({ setFile }) => {
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
  return (
    <div>
      <label htmlFor="file-input">Select a file:</label>
      <input
        accept=".jpg, .jpeg, .png"
        type="file"
        id="file-input"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {selectedImg && (
        <Stack display="flex">
          <Box sx={{ position: "relative" }}>
            <img
              src={selectedImg}
              style={{
                width: "60px",
                border: "1px solid gray",
                borderRadius: "5px",
                height: "60px",
              }}
            />
            <Button
              sx={{ position: "absolute", top: "-6px", left: "41px" }}
              onClick={handleDelete}
            >
              <CloseOutlined />
            </Button>
          </Box>
        </Stack>
      )}
    </div>
  );
};

export default FileUpload;
