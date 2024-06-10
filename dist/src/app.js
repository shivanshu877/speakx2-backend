"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var tweetRoutes_1 = __importDefault(require("./routes/tweetRoutes"));
var followRoutes_1 = __importDefault(require("./routes/followRoutes"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var router = express_1.default.Router();
app.use((0, cors_1.default)()); //It can be used to enable CORS with various options.
app.use((0, morgan_1.default)("dev")); //It can be used to log requests, errors, and more to the console
app.use(express_1.default.json()); //It can be used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    return res.send("Hello World!");
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/tweets", tweetRoutes_1.default);
app.use("/api/follow", followRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map