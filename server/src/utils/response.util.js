const sendResponse = (res, statusCode, message, data = null, success = true) => {
    return res.status(statusCode).json({
        success: success,
        message: message,
        data: data
    });
};

const sendSuccess = (res, message, data = null, statusCode = 200) => {
    return sendResponse(res, statusCode, message, data, true);
}

const sendError = (res, message, statusCode = 500, data = null) => {
    return sendResponse(res, statusCode, message, data, false);
}


module.exports = {
    sendResponse,
    sendSuccess,
    sendError
}