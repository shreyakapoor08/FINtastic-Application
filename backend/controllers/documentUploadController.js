
// Author -
// Jaskaran Singh
const s3Connection = require('../utils/s3Connection');
const Document = require('../models/documentModel');
const mongoose = require('mongoose');

const addDocument = async (req, res) => {
    const userId = req.user.userId;
    const documentType = req.body.documentType;
    const documentDescription = req.body.documentDescription;
    const documentCategory = req.body.documentCategory;
    const file = req.file;
    
  try {
    const s3UploadResult = await s3Connection.s3.upload({
      Bucket: 'web-5709-documents',
      Key: file.originalname,
      Body: file.buffer
    }).promise();

    const document = new Document({
      documentName: file.originalname,
      s3Path: s3UploadResult.Location,
      documentType:documentType,
      documentUploadDate: new Date(),
      documentDescription: documentDescription,
      documentCategory: documentCategory,
      isDeleted: false,
      userId: userId
    });

    await document.save();

    res.status(200).json({ success: true, message: 'Document uploaded successfully' , url: s3UploadResult.Location});
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ success: false, message: 'Failed to upload document' });
  }
};

const getDocument = async (req, res) => {
    const userId = req.user.userId;
    console.log(userId);
    try {
      const ObjectId = require('mongoose').Types.ObjectId;
      const documents = await Document.find({ userId: new ObjectId(userId) });
      res.status(200).json({ success: true, documents });
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch documents' });
    }
};

const getProfiePhoto = async (req, res) => {
  const userId = req.user.userId;
  
  try {
    const ObjectId = require('mongoose').Types.ObjectId;
    const document = await Document.find({ userId: new ObjectId(userId), documentType: "profile", documentCategory: "profile"});
    res.status(200).json({ success: true, document });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch documents' });
  }
};

const deleteDocument = async (req, res) => {
  const { documentId } = req.params;

  try {
    const deletedDocument = await Document.findOneAndDelete({ _id: documentId });
    if (!deletedDocument) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    res.status(200).json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ success: false, message: 'Failed to delete document' });
  }
};

module.exports = {
  addDocument,
  getDocument,
  deleteDocument,
  getProfiePhoto
};
