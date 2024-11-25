// library imports
const express = require('express');
const router = express.Router();

// local imports
const workoutModel = require('../models/WorkoutModel');

const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/WorkoutController');

// get all workouts
router.get('/', getWorkouts);

// get a single workout
router.get('/:id', getWorkoutById);

// post a new workout
router.post('/', createWorkout);

// delete a workout
router.delete('/:id', deleteWorkout);

// update a workout
router.patch('/:id', updateWorkout);

module.exports = router;
