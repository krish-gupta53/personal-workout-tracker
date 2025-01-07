const express = require('express');
const multer = require('multer');
const { diskStorage } = multer;
const { extname } = require('path');
const mongoose = require('mongoose');
const files = require('../models/workoutModel')

const app = express();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Save files in the "uploads" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
  });
  
  const upload = multer({ storage: storage });
  
  // MongoDB Schema for files
  const fileSchema = new mongoose.Schema({
    name: String,
    path: String,
    uploadDate: { type: Date, default: Date.now },
  });
  
  const File = mongoose.model('File', fileSchema);
  
 
  // File upload route
  app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const file = new File({
        name: req.file.originalname,
        path: req.file.path,
      });
      await file.save(); // Save file metadata to the database
      res.send('File uploaded and saved to database!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error uploading file');
    }
  });
module.exports = upload  