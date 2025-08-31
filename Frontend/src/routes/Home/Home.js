import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import FileUpload from '../../components/fileupload/FileUpload';
import FileList from '../../components/filelist/FileList'; 
import axios from 'axios';
import './Home.css'; 

const Home = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // This function will run when the component first loads
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/v1/files/getAllFiles', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFiles(response.data.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []); // The empty array [] means this runs only once on mount


const handleUploadSuccess = (newFile) => {
    // We use a function here to get the most recent state of the files array
    setFiles(prevFiles => [newFile, ...prevFiles]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="home-container">
        {files.length === 0 ? (
          <div className="new-user-view">
            <h2>Welcome! Upload your first file to get started.</h2>
            {/* MODIFIED: Pass the function as a prop */}
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <div className="existing-user-view">
            <div className="upload-panel">
              <h3>Upload More Files</h3>
              {/* MODIFIED: Pass the function as a prop here too */}
              <FileUpload onUploadSuccess={handleUploadSuccess} />
            </div>
            <div className="list-panel">
              <h3>Your Uploaded Files</h3>
              <FileList files={files} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;