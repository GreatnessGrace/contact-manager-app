const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;
console.log(process.env.PORT);

connectDb();
app.use(express.json()); // for accepting data from body
app.use('/api/contacts', require("./routes/contactRoutes"))
app.use('/api/users', require("./routes/userRoutes"))

app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server running on Port ${port}`);
})