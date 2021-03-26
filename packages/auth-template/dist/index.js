"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var auth_1 = __importDefault(require("@routes/auth"));
var app = express_1.default();
mongoose_1.default
    .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(function () { return console.log("Connected to MongoDB......."); })
    .catch(function (err) { return console.log(err); });
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    next();
});
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use("/auth", auth_1.default);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Server Listening on port " + port);
});
