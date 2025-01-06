const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config({ path: ".env.local" });
const petRoute = require("./routes/petRoute");
const path = require("path");
const methodOverride = require("method-override");
const {
  displayAllPets,
  getEditForm,
  editPet,
} = require("./controllers/petController");
const upload = require("./middleware/uploadMiddleware");

const app = express();
connectDB();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cors());
app.use(methodOverride("_method"));

app.use(express.json());

app.get("/pets", displayAllPets);
app
  .route("/pets/edit/:id")
  .get(getEditForm)
  .patch(upload.single("url"), editPet);
app.use("/api/pets", petRoute);

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(5000, () => {
  console.log("server started!");
});
