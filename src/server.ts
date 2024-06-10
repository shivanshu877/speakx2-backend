import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 3000;
import dotenv from "dotenv";
dotenv.config();
connectDB();





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


