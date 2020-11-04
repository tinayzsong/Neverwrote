const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

/* *** TODO: Fill in the API endpoints for notebooks *** */

module.exports = router;

// Selects only the fields that are allowed to be set by users
function postFilter(obj) {
  return _.pick(obj, ['title']);
}
// Index
router.get('/', (req, res) => {

// Return a list of the five most recent posts
const queryOptions = {
  order: [['createdAt', 'DESC']],
  limit: 5
};
models.Notebook.findAll(queryOptions)
  .then(notebooks => res.json(notebooks))
  .catch(err => res.status(500).json({ error: err.message }));
});
// Create
router.post('/', (req, res) => {
// Create a new post record in the database
models.Notebook.create(postFilter(req.body))
  .then(notebook => res.json(notebook))
  .catch(err => res.status(422).json({ error: err.message }));
});
// Show
router.get('/:notebookId', (req, res) => {
// Return the specified post record from the database
models.Notebook.findById(req.params.notebookId)
  .then(notebook => res.json(notebook))
  .catch(err => res.status(500).json({ error: err.message }));
});
router.get('/:notebookId/notes', (req, res) => {
// Return the specified post record from the database
 models.Note.findAll({where: {notebookId: req.params.notebookId}})
  .then(notes => res.json(notes))
  .catch(err => res.status(500).json({ error: err.message }));
});

// Destroy
router.delete('/:notebookId', (req, res) => {
// Delete the specified post record from the database
  models.Notebook.destroy({ where: { id: req.params.notebookId } })
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});
// Update
// TODO: Implement the update action here
router.put('/:notebookId',(req, res) => {
  models.Notebook.findById(req.params.notebookId)
  .then(notebook => notebook.update(postFilter(req.body)))
  .then(notebook => res.json(notebook))

});