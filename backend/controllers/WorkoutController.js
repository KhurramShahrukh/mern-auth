// library imports
const mongoose = require('mongoose');

// local imports
const WorkoutModel = require('../models/WorkoutModel');

// get all workouts
const getWorkouts = async (req, res) => {
  try {
    const { _id } = req.user
    const workouts = await WorkoutModel.find({ user_id: _id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.log('error in get all workouts', error);
    res.status(400).json({ error: error.message });
  }
};

// get a single workout
const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'No workout matches the id.' });
    } else {
      const workout = await WorkoutModel.findById(id);
      if (!workout) {
        res.status(404).json({ error: 'No workout matches the id.' });
      } else {
        res.status(200).json(workout);
      }
    }
  } catch (error) {
    console.log('error in get a single workout', error);
    res.status(400).json({ error: error.message });
  }
};

// post a new workout
const createWorkout = async (req, res) => {
  try {
    const { _id } = req.user
    const { title = '', load = '', reps = '' } = req.body;
    const emptyFields = []
    if (!title) {
      emptyFields.push('title')
    }
    if (!load) {
      emptyFields.push('load')
    }
    if (!reps) {
      emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
      res.status(400).json({ error: 'Please fill in all the above fields.', emptyFields });
    } else {
      const workout = await WorkoutModel.create({ title, load, reps, user_id: _id });
      res.status(200).json(workout);
    }
  } catch (error) {
    console.log('error in post a new workout', error);
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'No workout matches the id.' });
    } else {
      const workout = await WorkoutModel.findOneAndDelete({ _id: id });
      if (!workout) {
        res.status(404).json({ error: 'No workout matches the id.' });
      } else {
        res.status(200).json(workout);
      }
    }
  } catch (error) {
    console.log('error in delete a workout', error);
    res.status(400).json({ error: error.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'No workout matches the id.' });
    } else {
      const workout = await WorkoutModel.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      if (!workout) {
        res.status(404).json({ error: 'No workout matches the id.' });
      } else {
        res.status(200).json(workout);
      }
    }
  } catch (error) {
    console.log('error in update a workout', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
