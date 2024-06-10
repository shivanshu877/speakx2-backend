"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var tweetController_1 = require("../controllers/tweetController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, tweetController_1.createTweet);
router.put("/:tweetId", authMiddleware_1.authMiddleware, tweetController_1.editTweet);
router.delete("/:tweetId", authMiddleware_1.authMiddleware, tweetController_1.deleteTweet);
router.get("/timeline", authMiddleware_1.authMiddleware, tweetController_1.viewTimeline);
router.get("/usertweet", authMiddleware_1.authMiddleware, tweetController_1.viewTweetByUserId);
exports.default = router;
//# sourceMappingURL=tweetRoutes.js.map