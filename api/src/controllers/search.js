const _ = require("lodash");
const models = require("../models");
const router = express.Router();
const express = require("express");

router.get('/notes/:phrase', (req,res) => {
  models.Note.findAll({
    where:{
      $or:[
        {title:{ $like:'%'+req.params.phrase+'%'}},
        {content: {$like:'%'+req.params.phrase+'%'}}
      ]
    }
  })
  .then(notes => res.json(notes))
  .catch(e => res.status(500).json({error:e.message}))
});

module.exports = router;