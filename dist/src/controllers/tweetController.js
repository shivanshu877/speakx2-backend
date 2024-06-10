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
exports.viewTweetByUserId = exports.viewTimeline = exports.deleteTweet = exports.editTweet = exports.createTweet = void 0;
var Tweet_1 = require("../models/Tweet");
var User_1 = require("../models/User");
var createTweet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, content, mediaLink, tweet;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, content = _a.content, mediaLink = _a.mediaLink;
                tweet = new Tweet_1.Tweet({ content: content, user: req.user.userId, mediaLink: mediaLink });
                return [4 /*yield*/, tweet.save()];
            case 1:
                _b.sent();
                res.status(201).send(tweet);
                return [2 /*return*/];
        }
    });
}); };
exports.createTweet = createTweet;
var editTweet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tweetId, _a, content, mediaLink, tweet;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tweetId = req.params.tweetId;
                _a = req.body, content = _a.content, mediaLink = _a.mediaLink;
                return [4 /*yield*/, Tweet_1.Tweet.findById(tweetId)];
            case 1:
                tweet = _b.sent();
                if (!tweet) {
                    return [2 /*return*/, res.status(404).send({ message: "Tweet not found" })];
                }
                if (tweet.user.toString() !== req.user.userId) {
                    return [2 /*return*/, res.status(403).send({ message: "Unauthorized" })];
                }
                tweet.content = content;
                tweet.mediaLink = mediaLink;
                return [4 /*yield*/, tweet.save()];
            case 2:
                _b.sent();
                res.send(tweet);
                return [2 /*return*/];
        }
    });
}); };
exports.editTweet = editTweet;
var deleteTweet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tweetId, tweet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tweetId = req.params.tweetId;
                return [4 /*yield*/, Tweet_1.Tweet.findById(tweetId)];
            case 1:
                tweet = _a.sent();
                if (!tweet) {
                    return [2 /*return*/, res.status(404).send({ message: "Tweet not found" })];
                }
                if (tweet.user.toString() !== req.user.userId) {
                    return [2 /*return*/, res.status(403).send({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, Tweet_1.Tweet.findByIdAndDelete(tweetId)];
            case 2:
                _a.sent();
                res.send({ message: "Tweet deleted" });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteTweet = deleteTweet;
var viewTimeline = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, followingIds, tweets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.User.findById(req.user.userId).populate("following")];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send({ message: "User not found" })];
                }
                followingIds = user.following.map(function (follow) { return follow._id; });
                return [4 /*yield*/, Tweet_1.Tweet.find({ user: { $in: followingIds } })
                        .sort({ createdAt: -1 })
                        .populate("user")];
            case 2:
                tweets = _a.sent();
                res.send(tweets);
                return [2 /*return*/];
        }
    });
}); };
exports.viewTimeline = viewTimeline;
var viewTweetByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, tweets, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.userId;
                return [4 /*yield*/, Tweet_1.Tweet.find({ user: userId })];
            case 1:
                tweets = _a.sent();
                res.json(tweets);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching tweets by user ID:", error_1);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.viewTweetByUserId = viewTweetByUserId;
//# sourceMappingURL=tweetController.js.map