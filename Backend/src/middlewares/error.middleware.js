const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Handle specific error types
    if (err.code === 'EADDRINUSE') {
        err.statusCode = 500;
        err.message = "Port is already in use. Please try a different port or ensure no other service is using this port.";
    }

    // Log error for debugging
    console.error('Error:', {
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack
    });

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

export default errorHandler;