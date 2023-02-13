"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseBuilder = void 0;
const message_const_1 = require("../constants/message.const");
function responseBuilder(payload, status = 200, message = message_const_1.ResponseMessage.success, metadata) {
    return Object.assign({ statusCode: status, message, data: payload }, metadata);
}
exports.responseBuilder = responseBuilder;
//# sourceMappingURL=response.builder.js.map