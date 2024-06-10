"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var followController_1 = require("../controllers/followController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var userController_1 = require("../controllers/userController");
var router = express_1.default.Router();
router.post("/:userId", authMiddleware_1.authMiddleware, followController_1.followUser);
router.post("/unfollow/:userId", authMiddleware_1.authMiddleware, followController_1.unfollowUser);
router.get("/getfollowers", authMiddleware_1.authMiddleware, followController_1.getFollowers);
router.get("/getfollowing", authMiddleware_1.authMiddleware, followController_1.getFollowing);
router.get("/getAllUsers", authMiddleware_1.authMiddleware, userController_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=followRoutes.js.map