const asyncHandler = require("express-async-handler");
var randomstring = require("randomstring");
const Paste = require("../models/pasteModel");
const User = require("../models/userModal");

const createPaste = asyncHandler(async (req, res) => {
  const { content, title, password, language } = req.body;

  if (!content || !title) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  const slug = randomstring.generate({
    length: 8,
    charset: "alphanumeric",
  });
  var newPaste = {
    title: title,
    content: content,
    password: password,
    slug: slug,
    language: language,
  };

  try {
    var paste = await Paste.create(newPaste);
    res.statusCode = 200;
    res.json(paste);
  } catch (error) {
    res.statusCode(400);
    throw new Error(error.message);
  }
});

const getPaste = asyncHandler(async (req, res) => {
  const password = req.params.passwordString;
  const slug = req.params.pasteString;
  const results = await Paste.findOne({ slug });

  if (results) {
    if (await results.matchPassword(password)) {
      res.json({
        title: results.title,
        slug: results.slug,
        content: results.content,
        language: results.language,
      });
    } else {
      res.status(401).json({ error: "Incorrect password" });
    }
  } else {
    res.status(404).json({ error: "Paste not found" });
  }
});

module.exports = { createPaste, getPaste };
