"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./src/app"));
var db_1 = __importDefault(require("./src/config/db"));
var PORT = process.env.PORT || 3000;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, db_1.default)();
app_1.default.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
//# sourceMappingURL=server.js.map