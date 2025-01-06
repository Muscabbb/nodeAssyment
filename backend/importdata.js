const fs = require("fs");
const mongoose = require("mongoose");
const Pet = require("./model/petModel");
const connectDB = require("./config/db");

const dotenv = require("dotenv").config({ path: ".env.local" });

connectDB();

const pets = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"));

const importData = async () => {
  console.log(pets[0]);

  try {
    await Pet.create(pets);
    console.log("data succesfully loaded");
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] == "--import") importData();
