// Author -
// Ramandeep Kaur
const Objective = require('../models/okrModel');
const KeyResult = require('../models/keyResultModel');
const createOkr = async (req, res) => {
  try {
    const { title, progress, keyResults } = req.body;
    const objective = new Objective({ title, progress, keyResults });
    await objective.save();
    res.status(201).json({ message: 'Objective created successfully', objective });
  } catch (err) {
    console.error('Error creating objective', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createObjective = async (req, res) => {
  const { title, timeframe } = req.body;

  try {
    const objective = new Objective({ title, timeframe });

    await objective.save();

    res.status(201).json({ message: 'Objective created successfully', objective });
  } catch (error) {
    console.error('Error creating objective:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllObjectives = async (req, res) => {
  try {
    const objectives = await Objective.find();
    const objectivesWithKeyResults = await Promise.all(objectives.map(async (objective) => {
      const keyResults = await KeyResult.find({ objective: objective._id });
      return { ...objective.toObject(), keyResults }; 
    }));

    res.status(200).json(objectivesWithKeyResults);
  } catch (err) {
    console.error('Error fetching objectives', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getObjectiveById = async (req, res) => {
  const { id } = req.params;

  try {
    const objective = await Objective.findById(id);
    if (!objective) {
      return res.status(404).json({ error: 'Objective not found' });
    }

    const keyResults = await KeyResult.find({ objective: objective._id });

    const response = {
      objective,
      keyResults
    };

    res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching objective by ID', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateObjective = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, progress, keyResults } = req.body;
    const updatedObjective = await Objective.findByIdAndUpdate(id, { title, progress, keyResults }, { new: true });
    if (!updatedObjective) {
      return res.status(404).json({ error: 'Objective not found' });
    }
    res.status(200).json({ message: 'Objective updated successfully', objective: updatedObjective });
  } catch (err) {
    console.error('Error updating objective', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteObjective = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedObjective = await Objective.findByIdAndDelete(id);
    if (!deletedObjective) {
      return res.status(404).json({ error: 'Objective not found' });
    }
    res.status(200).json({ message: 'Objective deleted successfully', objective: deletedObjective });
  } catch (err) {
    console.error('Error deleting objective', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const addKeyResult = async (req, res) => {
  const { title, progress } = req.body;
  const objectiveId = req.params.id;

  try {

    const keyResult = new KeyResult({
      title,
      progress,
      objective: objectiveId
    });


    await keyResult.save();

 
    return res.status(201).json({ message: 'Key result added successfully', keyResult });
  } catch (error) {
    console.error('Error adding key result:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateKeyResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, progress } = req.body;
    const updatedKeyResult = await KeyResult.findByIdAndUpdate(id, { title, progress }, { new: true });
    if (!updatedKeyResult) {
      return res.status(404).json({ error: 'Key result not found' });
    }
    res.status(200).json({ message: 'Key result updated successfully', keyResult: updatedKeyResult });
  } catch (err) {
    console.error('Error updating key result', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteKeyResult = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedKeyResult = await KeyResult.findByIdAndDelete(id);
    if (!deletedKeyResult) {
      return res.status(404).json({ error: 'Key result not found' });
    }
    res.status(200).json({ message: 'Key result deleted successfully', keyResult: deletedKeyResult });
  } catch (err) {
    console.error('Error deleting key result', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { 
  createObjective, 
  getAllObjectives, 
  getObjectiveById, 
  updateObjective, 
  deleteObjective, 
  addKeyResult, 
  updateKeyResult, 
  deleteKeyResult
};