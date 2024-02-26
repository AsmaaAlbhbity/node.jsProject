require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");/////
const path = require("path");///////
const mongoose = require("mongoose");
const server = express();

const { specs, swaggerUi } = require("./swagger");


//-------------------------------------------------------------------------
// Connect to MongoDB
//--------------------------------------------------------------------------
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB Connected");
        const port = process.env.PORT || 8080;
        server.listen(port, () => {
            console.log("Hi Asoma", port);
        });
    })
    .catch(error => {
        console.log("DB Problem", error);
    });
//-------------------------------------------------------------------------


server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
//-----------------------------------------------

server.use(bodyParser.json());/////
server.use(bodyParser.urlencoded({ extended: false }));/////


server.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', "GET, POST, DELETE, UPDATE");
    response.header('Access-Control-Allow-Headers', "Content-Type, Authorization");
    next();
});
//-----------------------------------------------
//img
//------------------------------------------------
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, path.join(__dirname, "images"));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toLocaleDateString().replace(/\//g, "-") + "-" + file.originalname);
    }
});/////

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};///////

server.use("/images", express.static(path.join(__dirname, "images")));/////
server.use(multer({storage,fileFilter}).single("image"));/////
//-------------------------------------------------------------------------




//-------------------------------------------------------------------------
//  routes
//-------------------------------------------------------------------------
const teacherRoute = require("./Route/teacherRoute");
const childRoute = require("./Route/childRoute");
const authRoute = require("./Route/authRoute");
const changepassRoute = require("./Route/changepassRoute");
const classRoute=require("./Route/classRoute");

server.use(authRoute);
server.use(teacherRoute);
server.use(childRoute);
server.use(changepassRoute);
server.use(classRoute);
//-------------------------------------------------------------------------

//-----------------------------------
//error+not found
//------------------------------------
server.use((request, response, next) => {
    response.status(404).json({ message: "Not Found" });
});


server.use((error, request, response, next) => {
    console.log("Error:", error);
    response.status(500).json({ message:error+" " });
});
