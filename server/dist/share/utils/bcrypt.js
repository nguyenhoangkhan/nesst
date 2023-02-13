"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCorrectPassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const bcrypt_const_1 = require("../constants/bcrypt.const");
const hashPassword = async (rawPassword, saltRounds = bcrypt_const_1.DEFAULT_SALT_ROUNDS) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(rawPassword, salt);
};
exports.hashPassword = hashPassword;
const isCorrectPassword = (rawPassword, hash) => {
    return bcrypt.compareSync(rawPassword, hash);
};
exports.isCorrectPassword = isCorrectPassword;
//# sourceMappingURL=bcrypt.js.map