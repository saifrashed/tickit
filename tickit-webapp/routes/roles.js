const router = require('express').Router();

let Roles = require('../models/roles.model');

// Get roles
router.route('/').get((req, res) => {
    Roles.find()
         .then(users => res.json(users))
         .catch(err => res.status(400).json('Error: ' + err));
});

// Add role
router.route('/add').post((req, res) => {
    const description = req.body.description;

    const newRole = new Roles({description});

    newRole.save()
           .then(() => {
               res.json('Role added!')
           })
           .catch(err => {
               res.status(400).json('Error: ' + err);
           })
});


module.exports = router;
