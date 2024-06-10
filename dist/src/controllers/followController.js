"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowing = exports.getFollowers = exports.unfollowUser = exports.followUser = void 0;
var User_1 = require("../models/User");
var followUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, followUser_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User_1.User.findById(req.user.userId)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, User_1.User.findById(userId)];
            case 3:
                followUser_1 = _a.sent();
                if (!followUser_1) {
                    return [2 /*return*/, res.status(404).send({ message: "User not found" })];
                }
                if (!user || !followUser_1) {
                    throw new Error("Invalid user or followUser");
                }
                // @ts-ignore
                if (user.following.includes(followUser_1._id)) {
                    return [2 /*return*/, res.status(400).send({ message: "Already following" })];
                }
                // @ts-ignore
                user.following.push(followUser_1._id);
                // @ts-ignore
                // Push the user ID
                followUser_1.followers.push(user._id); // Push the user ID
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                return [4 /*yield*/, followUser_1.save()];
            case 5:
                _a.sent();
                res.send({ message: "User followed" });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).send({ message: "Internal Server Error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.followUser = followUser;
var unfollowUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user_1, unfollowUser_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User_1.User.findById(req.user.userId)];
            case 2:
                user_1 = _a.sent();
                return [4 /*yield*/, User_1.User.findById(userId)];
            case 3:
                unfollowUser_1 = _a.sent();
                if (!unfollowUser_1) {
                    return [2 /*return*/, res.status(404).send({ message: "User not found" })];
                }
                if (!user_1 || !unfollowUser_1) {
                    throw new Error("Invalid user or unfollowUser");
                }
                // @ts-ignore
                user_1.following = user_1.following.filter(
                // @ts-ignore
                function (following) { return !following.equals(unfollowUser_1._id.toString()); } // Compare IDs
                );
                // @ts-ignore
                unfollowUser_1.followers = unfollowUser_1.followers.filter(
                // @ts-ignore
                function (follower) { return !follower.equals(user_1._id.toString()); } // Compare IDs
                );
                return [4 /*yield*/, user_1.save()];
            case 4:
                _a.sent();
                return [4 /*yield*/, unfollowUser_1.save()];
            case 5:
                _a.sent();
                res.send({ message: "User unfollowed" });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).send({ message: "Internal Server Error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.unfollowUser = unfollowUser;
var getFollowers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, followersUsernames, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.User.findById(userId).populate("followers", "username")];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({ message: "User not found" })];
                }
                followersUsernames = user.followers
                    .map(function (follower) {
                    if (typeof follower === "object" && follower.username) {
                        return follower.username;
                    }
                    return null;
                })
                    .filter(function (username) { return username !== null; });
                // Send followers usernames in the response
                res.send(followersUsernames);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).send({ message: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getFollowers = getFollowers;
var getFollowing = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, followingUsernames, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.User.findById(userId).populate("following", "username")];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({ message: "User not found" })];
                }
                followingUsernames = user.following
                    .map(function (following) {
                    if (typeof following === "object" && following.username) {
                        return following.username;
                    }
                    return null;
                })
                    .filter(function (username) { return username !== null; });
                // Send following usernames in the response
                res.send(followingUsernames);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).send({ message: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getFollowing = getFollowing;
//# sourceMappingURL=followController.js.map