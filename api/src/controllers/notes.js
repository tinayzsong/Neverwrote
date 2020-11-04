const _ = require("lodash");
const models = require("../models");
const express = require("express");
const router = express.Router();
const postFilter = (obj) => {
  return _.pick(obj, ['title','content','notebookId']);
}

router.get("/", (req, res) => {
  models.Note.findAll({ oder: [["createdAt", "DESC"]] })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});
router.post("/", (req, res) => {
  models.Note.create(postFilter(req.body))
    .then(note => res.json(note))
    .catch(err => res.status(400).json({ error: err.message }));
});
router.get("/:noteId", (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => res.json(note))
    .catch(err => err.status(500).json({ error: err.message }));
});
router.delete("/:noteId", (req, res) => {
  models.Note.destroy({where: {id:req.params.noteId}})
    .then(() => res.json({}))
    .catch(err => err.status(500).json({ error: err.message }));
});
router.put("/:noteId", (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => note.update(postFilter(req.body)))
    .then(note => res.json(note))
    .catch(err => err.status(500).json({ error: err.message }));
});

module.exports = router;