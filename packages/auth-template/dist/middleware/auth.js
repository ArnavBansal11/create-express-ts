"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    var token = req.cookies.token;
    console.log(token);
    if (token == undefined) {
        console.log("here");
        return res.json({ success: false, message: "Token not provided" });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.send({ success: false, message: "Invalid Token" });
    }
}
exports.default = auth;
