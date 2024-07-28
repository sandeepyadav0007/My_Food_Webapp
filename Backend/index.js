const express = require('express');
const mongoDB = require('./db');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('hello world');
});

// Connect to MongoDB (assuming this is working fine)
mongoDB();

// Set up CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  credentials: true, // Allow cookies and other credentials
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // Specify allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
}));

app.use(express.json());
app.use('/api', require('./Routes/Createuser'));
app.use('/api', require('./Routes/DisplayData'));


app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
