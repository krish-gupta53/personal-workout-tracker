// In your workouts.js
const { Router } = require('express');
const path = require('path');

const express = require('express')
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
// In routes/workouts.js (CommonJS syntax)
const requireAuth = require('../middleware/requireAuth');

const upload = require('../middleware/reqMulter');
const router = Router()

// require auth for all workout routes
router.use(requireAuth)

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.post('/uploads', upload.single('workoutFile'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: req.file.path
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});
// GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// For example, export the router
module.exports = router;
