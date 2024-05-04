// Author -
// Jaskaran Singh

import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  IconButton,
  Select,
  MenuItem,
  Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./addDocument.css";

const AddDocumentForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [userId, setUserId] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentCategory, setDocumentCategory] = useState("Expense");
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [documentNameError, setDocumentNameError] = useState("");
  const [documentTypeError, setDocumentTypeError] = useState("");
  const [documentDescriptionError, setDocumentDescriptionError] = useState("");
  const [fileError, setFileError] = useState("");

  const handleViewDocuments = () => {
    navigate("/viewDocuments");
  };

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };

  const handleSnackbarClose = () => {
    setErrorSnackbar(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setDocumentName(selectedFile.name);
    setFileError("");
  };

  const validateForm = () => {
    let isValid = true;
    if (!file) {
      setFileError("Please select a file");
      isValid = false;
    } else {
      setFileError("");
    }
    if (!documentName) {
      setDocumentNameError("Document name is required");
      isValid = false;
    } else {
      setDocumentNameError("");
    }
    if (!documentType) {
      setDocumentTypeError("Document type is required");
      isValid = false;
    } else {
      setDocumentTypeError("");
    }
    if (!documentDescription) {
      setDocumentDescriptionError("Document description is required");
      isValid = false;
    } else {
      setDocumentDescriptionError("");
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      setErrorSnackbar(true);
      setErrorMessage("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);
    formData.append("documentDescription", documentDescription);
    formData.append("documentCategory", documentCategory);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/documents/addDocument`,
        formData,
        { headers }
      );
      if (!response.data.success) {
        throw new Error("Failed to add document");
      }
      setErrorMessage("Document added successfully");
      navigate("/viewDocuments");
    } catch (error) {
      setErrorSnackbar(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="add-document-form">
        <Typography variant="h4" className="form-title">
          Add Document
        </Typography>
        <form onSubmit={handleSubmit}>
          <label htmlFor="upload-document">
            <input
              style={{ display: "none" }}
              id="upload-document"
              name="upload-document"
              type="file"
              onChange={handleFileChange}
            />
            <Fab
              color="primary"
              size="medium"
              component="span"
              aria-label="add"
              variant="extended"
              sx={{
                bgcolor: "#4c4b42",
                color: "white",
                "&:hover": {
                  bgcolor: "#3a3932",
                },
              }}
            >
              <AddIcon /> {documentName ? documentName : "Upload Document"}
            </Fab>
          </label>
          {fileError && (
            <Typography variant="body2" color="error">
              {fileError}
            </Typography>
          )}

          <TextField
            label="Document Type"
            fullWidth
            className="input-field"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            error={!!documentTypeError}
            helperText={documentTypeError}
          />

          <TextField
            label="Document Description"
            fullWidth
            className="input-field"
            value={documentDescription}
            onChange={(e) => setDocumentDescription(e.target.value)}
            error={!!documentDescriptionError}
            helperText={documentDescriptionError}
          />
          <Select
            fullWidth
            value={documentCategory}
            onChange={(e) => setDocumentCategory(e.target.value)}
            className="input-field"
            displayEmpty
          >
            <MenuItem value="Expense">Expense</MenuItem>
            <MenuItem value="Bill">Bill</MenuItem>
            <MenuItem value="Investment">Investment</MenuItem>
            <MenuItem value="Loan">Loan</MenuItem>
            <MenuItem value="Credit Card Payments">
              Credit Card Payments
            </MenuItem>
            <MenuItem value="Taxes">Taxes</MenuItem>
            <MenuItem value="Insurance">Insurance</MenuItem>
            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="submit-button"
            type="submit"
            sx={{
              marginTop: "10px",
              bgcolor: "#4c4b42",
              "&:hover": { bgcolor: "#3a3932" },
            }}
          >
            Submit
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="submit-button"
            onClick={handleViewDocuments}
            sx={{
              marginTop: "3px",
              bgcolor: "#9c9a8c",
              "&:hover": { bgcolor: "#cccab8" },
            }}
          >
            View Documents
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={errorSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={errorMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Paper>
    </Container>
  );
};

export default AddDocumentForm;
