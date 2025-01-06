const Pet = require("../model/petModel");
const catchAsync = require("../utils/catchAsync");

// Create new pet
exports.createPet = catchAsync(async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Please upload an image");
    }

    // Create file URL// pets.url =
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    // Create new pet
    const newPet = await Pet.create({
      ...req.body,
      url: fileUrl,
    });

    res.redirect("/pets");
  } catch (error) {
    res.render("create-pet", {
      error: error.message,
      formData: req.body,
    });
  }
});

// Update the EJS template to handle errors
exports.getCreatePetForm = (req, res) => {
  res.render("create-pet", {
    error: null,
    formData: {}, // Empty form data for new submissions
  });
};

exports.displayAllPets = catchAsync(async (req, res) => {
  const pets = await Pet.find().select("-__v");
  // Render the EJS template instead of sending JSON
  res.render("pets-list", {
    pets: pets,
  });
});

// Get all pets
exports.getPets = catchAsync(async (req, res) => {
  const pets = await Pet.find().select("-__v");

  res.status(200).json({
    status: "success",
    results: pets.length,
    data: pets,
  });
});

// Get single pet
exports.getPet = catchAsync(async (req, res) => {
  const pet = await Pet.findById(req.params.id).select("-__v");

  if (!pet) {
    return res.status(404).json({
      status: "fail",
      message: "No pet found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: pet,
  });
});

exports.getEditForm = catchAsync(async (req, res) => {
  const pet = await Pet.findById(req.params.id).select("-__v");

  if (!pet) {
    return res.status(404).json({
      status: "fail",
      message: "No pet found with that ID",
    });
  }

  res.render("update-pet", {
    pet: pet,
    error: null,
  });
});

// Update pet
exports.editPet = catchAsync(async (req, res, next) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);

    if (!pet) {
      throw new Error("Pet not found.");
    }

    let fileUrl = pet.url;

    if (req.file) {
      fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    // Update pet details
    const data = await Pet.findByIdAndUpdate(petId, {
      ...req.body,
      url: fileUrl,
    });
    if (data) {
      res.redirect("/pets");
      next();
    }
  } catch (error) {
    res.render("update-pet", {
      error: error.message,
      formData: req.body,
    });
  }
});

exports.updatePet = catchAsync(async (req, res) => {
  const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }); // Update pet
  res.status(200).json({
    status: "success",
    data: {
      pet,
    },
  });
});

// Delete pet
exports.deletePet = catchAsync(async (req, res) => {
  console.log("del");

  const pet = await Pet.findByIdAndDelete(req.params.id);

  if (!pet) {
    return res.status(404).json({
      status: "fail",
      message: "No pet found with that ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
