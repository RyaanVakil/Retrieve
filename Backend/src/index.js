import app from "./app.js";
import ConnectDB from "./db/index.js"
import dotenv from "dotenv"
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config({ path: "./env" })// for accessing the .env variables

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

let server;

ConnectDB()//calling the function for connection
    .then(() => {
        server = app.listen(process.env.PORT, () => {
            console.log(`Server is running on port:${process.env.PORT}`);
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${process.env.PORT} is already in use. Please try a different port.`);
            } else {
                console.error('Server error:', err);
            }
            process.exit(1);
        });
    }).catch((err) => {
        console.error("MongoDB Connection Failed:", err);
        process.exit(1);
    });

// Apply error handling middleware
app.use(errorHandler);