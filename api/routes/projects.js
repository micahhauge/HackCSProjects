var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET project listing. */
router.get('/', function(req, res, next) {
  model.Project.findAll({})
        .then(todos => res.json({
            error: false,
            data: todos
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});


/* POST project. */
router.post('/', function(req, res, next) {
  const { name, description, creator_name, creator_id,  } = req.body;
  model.Project.create({
          name: name,
          description: description,
          creator_name: creator_name,
          creator_id: creator_id
      })
      .then(todo => res.status(201).json({
          error: false,
          data: todo,
          message: 'New todo has been created.'
      }))
      .catch(error => res.json({
          error: true,
          data: [],
          error: error
      }));
});


/* update project. */
router.put('/:id', function(req, res, next) {
  const project_id = req.params.id
  const { name, description, creator_name, creator_id,  } = req.body;

  model.Project.update({
    name: name,
    description: description,
    creator_name: creator_name,
    creator_id: creator_id
  }, {
    where: {
      id: project_id
    }
  })
  .then(project => res.status(201).json({
    error: false,
    message: 'project has been updated.'
  }))
  .catch(error => res.json({
    error: true,
    error: error
  }));
});

/* GET project listing. */
router.delete('/:id', function(req, res, next) {
  const project_id = req.params.id

  model.Project.destroy({ where: {
    id: project_id
  }})
  .then(status => res.status(201).json({
    error: false,
    message: 'todo has been deleted.'
  }))
  .catch(error => res.json({
    error: true,
    error: error
  }));

});

module.exports = router;
