const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

/* *** TODO: Fill in the API endpoints for notes *** */

module.exports = router;

// Selects only the fields that are allowed to be set by users
function postFilter(obj) {
  return _.pick(obj, ['title','content','notebookId']);
}
// Index
router.get('/', (req, res) => {

// Return a list of the five most recent posts
const queryOptions = {
  order: [['createdAt', 'DESC']],
  limit: 5
};
models.Note.findAll(queryOptions)
  .then(notes => res.json(notes))
  .catch(err => res.status(500).json({ error: err.message }));
});
// Create
router.post('/', (req, res) => {
// Create a new post record in the database
models.Note.create(postFilter(req.body))
  .then(note => res.json(note))
  .catch(err => res.status(422).json({ error: err.message }));
});
// Show
router.get('/:noteId', (req, res) => {
// Return the specified post record from the database
models.Note.findById(req.params.noteId)
  .then(note => res.json(note))
  .catch(err => res.status(500).json({ error: err.message }));
});

// Destroy
router.delete('/:noteId', (req, res) => {
// Delete the specified post record from the database
  models.Note.destroy({ where: { id: req.params.noteId } })
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});
// Update
// TODO: Implement the update action here
router.put('/:noteId',(req, res) => {
  models.Note.findById(req.params.noteId)
  .then(note => note.update(postFilter(req.body)))
  .then(note => res.json(note))

});