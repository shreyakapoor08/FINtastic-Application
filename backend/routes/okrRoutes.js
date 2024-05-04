// Author -
// Ramandeep Kaur
const express = require('express');
const router = express.Router();
const { getAllObjectives, createObjective, getObjectiveById, updateObjective, deleteObjective, addKeyResult, updateKeyResult ,deleteKeyResult } = require('../controllers/objectiveController');
const userAuth = require('../middleware/auth');

// GET all objectives
router.get('/objectives', getAllObjectives);

// POST create objective
router.post('/objectives', createObjective);

// GET single objective by ID
router.get('/objectives/:id', getObjectiveById);

// PUT update objective by ID
router.put('/objectives/:id', updateObjective);

// DELETE delete objective by ID
router.delete('/objectives/:id', deleteObjective);

// POST add key result to an objective
router.post('/objectives/:id/key-results', addKeyResult);

// PUT update key result by ID
router.put('/key-results/:id', updateKeyResult);

router.delete('/key-results/:id', deleteKeyResult);

module.exports = router;
