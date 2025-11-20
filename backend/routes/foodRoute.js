import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer"; //middleware used in Express to handle file uploads (images, PDFs, etc.).

const foodRouter = express.Router();

// Image Storage Engine using multer
// Configure how Multer stores uploaded images on the server
const storage = multer.diskStorage({
  destination: "uploads", // Folder where files will be saved

  filename: (req, file, cb) => {
    // Define how each file will be named when stored

    // Create a unique filename using the current timestamp
    // Pass the unique file name to Multer
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage }); // tells it how to store incoming files & upload becomes a middleware you use in your Express routes.

//post methode to send data on the server , data will be proced and we will get response
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/update", upload.single("image"), updateFood);

export default foodRouter;
