const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// Selects only the fields that are allowed to be set by users
function postFilter(obj) {
return _.pick(obj, ['title','content']);}

/* *** TODO: Fill in the API endpoints for notebooks *** */
//Index
router.get('/',(req,res)=>{
  models.Notebook.count()
  .then(data =>res.json({NoteBookCount:data}))
  .catch(err=>res.status(500).json({error:err.message}))

})






module.exports = router;