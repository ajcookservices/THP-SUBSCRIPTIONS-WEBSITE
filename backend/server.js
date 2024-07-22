const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const ejsLocals = require('ejs-locals');
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
require('./config/passport');
const Subscription = require('./models/Subscription'); // Make sure this path is correct

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up ejs-locals
app.engine('ejs', ejsLocals);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));
// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../frontend/public')));


// Routes
app.use('/auth', authRoutes);
app.use('/subscriptions', subscriptionRoutes);

app.get('/', (req, res) => {
  res.render('index', { user: req.user, title: 'Home Page' });
});

app.get('/manage', async (req, res) => {
  try {
    // Fetch subscriptions for the logged-in user
    const subscriptions = await Subscription.find({ userId: req.user._id });
    res.render('manageSubscription', { user: req.user, subscriptions, title: 'Manage Subscriptions' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { user: req.user, title: 'Dashboard' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
