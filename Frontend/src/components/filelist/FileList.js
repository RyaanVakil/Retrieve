import React from 'react';
import './FileList.css'; 

const FileList = ({ files }) => {
  if (!files || files.length === 0) {
    return <p>No files found.</p>;
  }

  return (
    <div className="file-list-container">
      <ul>
        {files.map(file => (
          <li key={file._id} className="file-item">
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.originalName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;