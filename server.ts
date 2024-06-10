import app from "./src/app";
import connectDB from "./src/config/db";

const PORT = process.env.PORT || 3000;
import dotenv from "dotenv";
dotenv.config();
connectDB();





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


