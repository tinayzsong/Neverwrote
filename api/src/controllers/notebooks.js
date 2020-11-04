const _ = require("lodash");
const models = require("../models");
const router = express.Router();
const express = require("express");

const postFilter = obj => {
  return _.pick(obj, ['title']);
}
router.get("/", (req, res) => {
  models.Notebook.findAll({ 
    order: [["createdAt", "DESC"]] 
  })
  .then(nb => res.json(nb))
  .catch(e => res.status(500).json({ error: e.message }));
});
router.get("/:notebookId/notes", (req,res) => {
	models.Note.findAll({where:{notebookId: req.params.notebookId}})
    .then(notes => res.json(notes))
  	.catch(e => res.status(500).json({error: e.message}));
});
router.post("/", (req, res) => {
  models.Notebook.create(postFilter(req.body))
    .then(nb => res.json(nb))
    .catch(e => res.status(400).json({ error: e.message }));
});
router.get("/:notebookId", (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(nb => res.json(nb))
    .catch(e => res.status(500).json({ error: e.message }));
});
router.delete("/:notebookId", (req, res) => {
  models.Notebook.destroy({ 
    where: { id: req.params.notebookId } 
  })
  .then(() => res.json({}))
  .catch(e => res.status(500).json({ error: e.message }));
});
router.put("/:notebookId", (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => notebook.update(postFilter(req.body)))
    .then(nb => res.json(nb))
    .catch(e => res.status(500).json({ error: e.message }));
});
module.exports = router;