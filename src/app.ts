import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import followRoutes from "./routes/followRoutes";
import morgan from "morgan";
import cors from "cors";
const app = express();
const router = express.Router();

app.use(cors()); //It can be used to enable CORS with various options.
app.use(morgan("dev")); //It can be used to log requests, errors, and more to the console
app.use(express.json()); //It can be used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  return res.send("Hello World!");
});
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/api/follow", followRoutes);
export default app;
