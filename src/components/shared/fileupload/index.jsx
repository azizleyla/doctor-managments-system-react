import React from "react";

const FileUpload = ({ setFile }) => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("File content:", e.target.result);
    };
    reader.readAsText(selectedFile); // readAsText, readAsDataURL, readAsArrayBuffer gibi farklı okuma yöntemleri kullanabilirsiniz
  };
  return (
    <div>
      <label htmlFor="file-input">Select a file:</label>

      <input
        accept=".jpg, .jpeg, .png"
        type="file"
        id="file-input"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
