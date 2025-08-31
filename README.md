## Screenshots

![image](https://drive.google.com/uc?export=view&id=1Mto1bhej2Ene7hAXe5saU3F7GF7wlVOz)

![image](https://drive.google.com/uc?export=view&id=1-1KtXFfA9ZwU7-NIlZ6Dl0OTMzpiTuLy)

![image](https://drive.google.com/uc?export=view&id=17MZ_OoYlbh1fORm9p5ii5SZs655qoLwk)

![image](https://drive.google.com/uc?export=view&id=1bsoA0exAoydupYmt7awFqAIbne_ev_S4)



# Retrieve

Retrieve is a web application designed to securely store and manage important documents. It provides a simple and secure alternative to logging into personal email accounts on public computers. Users can upload, access, and manage their documents with ease. The files are automatically deleted from the cloud after a specified time period, ensuring your data is only temporarily accessible.


## Features

- Secure Login: Access the platform with a unique username and password
- File Upload: Upload important documents safely without using personal email accounts
- Automatic Deletion: Files are automatically removed from the cloud after a defined time period to ensure data privacy.


## Installation

To set up the Retrieve project locally, follow these steps:

1. Clone the Repository
```bash
  git clone https://github.com/Art3mis20726/Retrieve.git
```
2. Navigate to the Project Directory
- Backend: Navigate to the backend directory and install dependencies.
```bash
  cd  Backend
  npm install -D nodemon
  npm install bcrypt cloudinary cookie-parser cors dotenv express jsonwebtoken moment-timezone mongoose mongosh multer node-cron prettier
```
- Frontend: Navigate to the frontend directory and install dependencies.
```bash
  cd  Frontend
  npm install
```
3. Run the Application
- Backend: Start the backend server.
```bash
  cd ../Backend
  npm run dev
```
- Frontend: Start the frontend server.
```bash
  cd ../Frontend
  npm start
```
    
## Usage

1. Create an Account: Sign up with a unique username and password.
2. Upload Files: Upload your documents using the upload feature.
3. Download Files: Access and download your files from any personal computer.
4. Automatic Deletion: Note that files will be deleted after the specified time period.