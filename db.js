import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpenMongo = () => console.log("CONNECTED TO MONGGO");
const handleErrorMongo = (error) =>
  console.log(`Error is came in your home ${error}`);

db.once("open", handleOpenMongo);
db.on("error", handleErrorMongo);
