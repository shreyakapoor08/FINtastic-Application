// Author -
// Jaskaran Singh
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
const userAuth = require("./../middleware/auth")

const {
  addDocument,
  getDocument,
  deleteDocument,
  getProfiePhoto
} = require('./../controllers/documentUploadController');

router.post('/addDocument', userAuth, upload.single('file'), addDocument);
router.get('/getAllDocuments', userAuth, getDocument);
router.delete('/delete/:documentId', userAuth, deleteDocument);
router.get('/getProfilePhoto', userAuth, getProfiePhoto);

module.exports = router;
