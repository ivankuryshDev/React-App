let crypto = require("crypto");

module.exports.generate = function () {
    return crypto.randomBytes(20).toString("hex");
};