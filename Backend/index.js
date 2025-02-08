const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
const cors = require('cors');

const portfolioRoutes = require('./routes/ProtfolioRoute');
const connectDB = require('./config/dbConfig');


//configure env
dotenv.config()

//database Confiq
connectDB();





const app = express();


app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello, Vercel!");
});

// Enable CORS
app.use(cors({
    origin: '*', // Allow all origins (replace with your frontend URL in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use('/api/v1', portfolioRoutes);


app.use(express.static(path.join(__dirname, '../client', 'dist')));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on Port ${port}`);
});
