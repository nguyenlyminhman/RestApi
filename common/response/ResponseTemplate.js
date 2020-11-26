const StatusCode = require('./ResponseStatusCode');
const RESP_MSG = require('./ResponseMessage');

let _template = (success, message, data) => {
    return {success, message, data }
}

let ResponseOK = async (res, data) => {
    // return res.status(StatusCode.OK).json({sucess:true, message: RESP_MSG.SUCCESS, data:data});
    return res.status(StatusCode.OK).json(_template(true, RESP_MSG.SUCCESS, data));
}

let ResponseFail = async (res, data) => {
    return res.status(StatusCode.BadRequest).json(_template(false, RESP_MSG.BAD_REQUEST, data));
}

let ResponseError = async (res, data) => {
    return res.status(StatusCode.InternalServerError).json(_template(false, RESP_MSG.SERVER_ERROR, data));
}

module.exports = {
    OK: ResponseOK,
    FAIL: ResponseFail,
    ERROR: ResponseError
};


