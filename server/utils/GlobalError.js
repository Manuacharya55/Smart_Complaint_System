const GlobalErrorHandler = (err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const success = err.success || false;
    const message = err.message || "Internal Server Error";
    const data = err.data || [];

    res.status(statuscode).json({
        statuscode,
        success,
        message,
        data
    })
}

export default GlobalErrorHandler;