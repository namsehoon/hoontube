import app from "./app";

const PORT = 5000;

const handleListening = () => {
  console.log(`Listening my home http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
