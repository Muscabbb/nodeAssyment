const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  getPet,
  createPet,
  updatePet,
  getCreatePetForm,
  getPets,
  deletePet,
} = require("../controllers/petController");

const router = express.Router();

// Create pet routes
router
  .route("/create")
  .get(getCreatePetForm)
  .post(upload.single("image"), createPet);

router.route("/").get(getPets);

router
  .route("/:id")
  .get(getPet)
  .patch(updatePet) // For updating with new image
  .delete(deletePet);

module.exports = router;
