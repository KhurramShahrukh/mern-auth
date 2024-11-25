// library imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// local imports
const workoutRoutes = require('./routes/WorkoutRoutes');
const userRoutes = require('./routes/UserRoutes');
const authenticate = require('./middlewares/AuthenticationMiddleware');

const app = express();
dotenv.config();
const port = process.env.PORT;
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'https://mern-auth-frontend-project.vercel.app'] // Whitelist the domains you want to allow
};

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log(`connected to db and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('error connecting to db', error);
  });


// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Request method: ', req.method);
  console.log('Request path: ', req.path);
  next();
});

// routes
app.use('/api/user', userRoutes)
app.use('/api/workouts', [authenticate, workoutRoutes]);
