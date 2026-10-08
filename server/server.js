const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security Helmet middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS setup
app.use(cors({
  origin: '*', // Allows requests from Vite client during dev & deployed frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
const fs = require('fs');

// API Welcome Route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Goel Paints and Hardware Store API',
    status: 'Operational',
    business: 'Goel Paints and Hardware Store (Sector 70, Mohali)',
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/shades', require('./routes/shadeRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));

// Serve Client React App (Production or whenever dist exists)
const clientDistPath = path.join(__dirname, '../client/dist');
if (process.env.NODE_ENV === 'production' || fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.resolve(clientDistPath, 'index.html'));
  });
}

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Goel Paints Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
