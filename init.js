import app from "./app";
import "./db";
import dotenv from "dotenv";
dotenv.config();

// || <-이건 못찾으면 일로가라라는 뜻
const PORT = process.env.PORT || 5000;

const handleListening = () => {
  console.log(`Listening my home http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
