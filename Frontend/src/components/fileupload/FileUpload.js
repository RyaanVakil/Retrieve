import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

// MODIFIED: Receive the onUploadSuccess function as a prop
const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
        setError('Please select a file.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        setError('You must be logged in to upload files.');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        setUploading(true);

        const response = await axios.post('http://localhost:8000/api/v1/files/fileUpload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('File uploaded successfully:', response.data);
        setSelectedFile(null);
        setError(null);

        // ADDED: Call the function passed from the parent (Home.js)
        // This is the key step that updates the UI instantly.
        if (onUploadSuccess) {
            // Pass the new file data from the response back to the Home component
            onUploadSuccess(response.data.data);
        }

    } catch (error) {
        console.error('Error uploading file:', error);
        setError(error.response?.data?.message || 'Failed to upload file. Please try again.');
    } finally {
        setUploading(false);
    }
  };


  return (
    <div className="file-upload-container">
      <h3>Upload Your Files</h3>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-wrapper">
          <input 
            type="file" 
            onChange={handleFileChange}
            id="file-input"
          />
          <i className="fas fa-cloud-upload-alt upload-icon"></i>
          <p className="file-input-label">
            {selectedFile ? selectedFile.name : 'Drag and drop your file here or click to browse'}
          </p>
        </div>
        <button 
          type="submit" 
          className="btn" 
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FileUpload;