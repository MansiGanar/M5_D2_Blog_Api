import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const authorsFilePath = path.join(__dirname, "authors.json");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, surname, email, dateOfBirth } = req.body;
    const author = {
      id: uniqid(),
      name,
      surname,
      email,
      dateOfBirth,
      avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    fileAsJSONArray.push(author);
    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);

    const author = fileAsJSONArray.find(
      (author) => author.id,
      id === req.params.id
    );
    if (!author) {
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found` });
    }
    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
export default router;
