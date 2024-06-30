import { CloseOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";

const FileUpload = ({ setSelectedFiles, options }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { uploadLimit, title, allowed, description, maxFileSize } =
    options;
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [selectedImg, setSelectedImg] = useState(null);

  const convertToKb = (sizeInBytes) => sizeInBytes / 1024;

  const addFiles = (droppedFiles) => {
    let filesLength = files.length;
    console.log(files);

    for (let fileIndex = 0; fileIndex < droppedFiles.length; fileIndex++) {
      const isAllowedFileType = allowed.includes(
        droppedFiles[fileIndex].type.split("/")[1],
      );

      if (!isAllowedFileType) {
        console.log(files);

        setErrors((prevErrors) => [
          ...prevErrors,
          "Unallowed file format",
        ]);
        break;
      }
      if (convertToKb(droppedFiles[fileIndex].size > maxFileSize)) {
        setErrors((prevErrors) => [...prevErrors, "Max file size"]);
      }
      if (filesLength < uploadLimit && isAllowedFileType) {
        console.log(files);

        setFiles((prevFiles) => [...prevFiles, droppedFiles[fileIndex]]);
        filesLength++;
      } else {
        setErrors((prevErrors) => [
          ...prevErrors,
          "Yalniz 1 sekil yuklemek mumkundur",
        ]);
        break;
      }
    }
  };
  const handleDrop = (e) => {
    alert("drop run");
    e.preventDefault();
    setErrors([]);

    const droppedFiles = e.dataTransfer.files;

    droppedFiles && addFiles(droppedFiles);
  };

  const handleFileChange = (event) => {
    event.target.files && addFiles(event.target.files);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = () => {
    if (files) {
      setLoading(true);
      setSelectedFiles(files).then(() => {
        setLoading(false);
      });

      // getFilesBack(files).finally(() => {
      //   setLoading(false);
      // });
    }
  };

  return (
    <>
      <input
        onChange={handleFileChange}
        id="file-upload"
        type="file"
        ref={fileInputRef}
        // style={{ display: "none" }}
      />

      <label htmlFor="file-upload">
        <div
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => {
            // setDropzoneActive(true);
            e.preventDefault();
          }}
          onDragLeave={(e) => {
            // setDropzoneActive(false);
            e.preventDefault();
          }}
        >
          <span className="fas fa-arrow-up-from-bracket fa-2x" />
          <Typography variant="h5" mt={2} fontWeight={500}>
            {title}{" "}
          </Typography>
          {description && (
            <Typography variant="h6" mt={2}>
              {description}{" "}
            </Typography>
          )}
        </div>
      </label>

      <List>
        {files.map((file, fileIndex) => {
          const progress = 25;
          return (
            <ListItem disablePadding key={fileIndex}>
              <ListItemButton
                component="button"
                onClick={() =>
                  window.open(
                    URL.createObjectURL(file),
                    "Image",
                    "location=yes,height=570,width=520,scrollbars=yes,status=yes",
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={URL.createObjectURL(file)}
                    variant="square"
                  />
                </ListItemAvatar>
                <ListItemText primary={file.name} />
                <LinearProgress
                  variant="buffer"
                  value={progress}
                  valueBuffer={progress}
                />
              </ListItemButton>
              <Button
                title="Siyahıdan çıxar"
                onClick={(e) => {
                  e.preventDefault();
                  setFiles((prevData) =>
                    prevData.filter(
                      (item, clickedIndex) => clickedIndex !== fileIndex,
                    ),
                  );
                  fileInputRef.current.value = null;
                }}
              >
                Sil
              </Button>
            </ListItem>
          );
        })}
      </List>
      {
        <Button
          variant="contained"
          component="label"
          size="large"
          icon={<span className="fas fa-arrow-up-from-bracket" />}
          sx={{ marginTop: "1rem" }}
          onClick={handleUpload}
          disabled={files.length !== uploadLimit || loading}
        >
          {loading ? "Gözləyin..." : "Yüklə"}
        </Button>
      }
    </>
  );
};

export default FileUpload;
