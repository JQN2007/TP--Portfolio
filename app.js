const express = require("express");

const app = express();


app.use(express.static('public'));
PORT = 3000;
app.listen(PORT, () => console.log(`servidor corriendo en http://localhost:${PORT}`));







