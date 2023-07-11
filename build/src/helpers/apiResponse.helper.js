"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const apiResponse = (code, message, data, pagination) => {
    if (data === null) {
        return {
            statusCode: code,
            statusMessage: message,
        };
    }
    else {
        return {
            statusCode: code,
            statusMessage: message,
            data: data,
            pagination: pagination,
        };
    }
};
exports.apiResponse = apiResponse;
