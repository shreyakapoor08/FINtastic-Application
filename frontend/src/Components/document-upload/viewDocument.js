// Author -
// Jaskaran Singh

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Alert,
} from "@mui/material";
import "./viewDocument.css";
import axios from "axios";

const ViewDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [documentCategories, setDocumentCategories] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/documents/getAllDocuments`,
          { headers }
        );
        const data = response.data;
        setDocuments(data.documents);
        setFilteredDocuments(data.documents);

        const categories = Array.from(
          new Set(data.documents.map((doc) => doc.documentCategory))
        );
        const types = Array.from(
          new Set(data.documents.map((doc) => doc.documentType))
        );
        setDocumentCategories(categories);
        setDocumentTypes(types);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    const filtered = documents.filter((doc) => {
      if (
        selectedCategories.length === 0 ||
        selectedCategories.includes(doc.documentCategory)
      ) {
        if (
          selectedTypes.length === 0 ||
          selectedTypes.includes(doc.documentType)
        ) {
          return true;
        }
      }
      return false;
    });
    setFilteredDocuments(filtered);
  }, [selectedCategories, selectedTypes, documents]);

  const handleCategoryToggle = (category) => {
    const currentIndex = selectedCategories.indexOf(category);
    const newSelectedCategories = [...selectedCategories];

    if (currentIndex === -1) {
      newSelectedCategories.push(category);
    } else {
      newSelectedCategories.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelectedCategories);
  };

  const handleTypeToggle = (type) => {
    const currentIndex = selectedTypes.indexOf(type);
    const newSelectedTypes = [...selectedTypes];

    if (currentIndex === -1) {
      newSelectedTypes.push(type);
    } else {
      newSelectedTypes.splice(currentIndex, 1);
    }

    setSelectedTypes(newSelectedTypes);
  };

  const handleDelete = async (documentId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/documents/delete/${documentId}`,
        { headers }
      );
      if (response.data.success) {
        setDocuments(documents.filter((doc) => doc._id !== documentId));
        setFilteredDocuments(filteredDocuments.filter((doc) => doc._id !== documentId));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <Container maxWidth="lg" className="view-document-form">
      {filteredDocuments.length === 0 ? (
        <Alert severity="info" sx={{ marginBottom: '20px' }}>No documents found.</Alert>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Filter by Category
              </Typography>
              <List>
                {documentCategories.map((category) => (
                  <ListItem
                    key={category}
                    dense
                    button
                    onClick={() => handleCategoryToggle(category)}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                        />
                      }
                      label={category}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Filter by Type
              </Typography>
              <List>
                {documentTypes.map((type) => (
                  <ListItem
                    key={type}
                    dense
                    button
                    onClick={() => handleTypeToggle(type)}
                  >
                    <FormControlLabel
                      control={<Checkbox checked={selectedTypes.includes(type)} />}
                      label={type}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={3}>
              {filteredDocuments.map((document) => (
                <Grid item xs={12} key={document._id}>
                  <Paper elevation={3} style={{ padding: "20px" }}>
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <img
                          src={document.s3Path}
                          alt={document.documentName}
                          style={{ maxWidth: "100%" }}
                        />
                      </Grid>
                      <Grid className="grid-data" item xs={12} sm={6}>
                        <Typography variant="h6">
                          {document.documentName}
                        </Typography>
                        <Typography variant="body2">
                          {document.documentDescription}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          href={document.s3Path}
                          sx={{
                            bgcolor: "#4c4b42",
                            "&:hover": { bgcolor: "#3a3932" },
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(document._id)}
                          sx={{
                            marginLeft: "10px",
                            marginTop: "3px",
                            bgcolor: "#9c9a8c",
                            "&:hover": { bgcolor: "#cccab8" },
                          }}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ViewDocuments;