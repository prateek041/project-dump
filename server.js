const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/stores')
const connectDB = require('./db/db')
// const getCoordinates = require('./utils/coordinateFetch');

// load environment variables
dotenv.config({ path: './config/config.env' });

const app = express();

// getCoordinates();

// Body parser
app.use(express.json())

// Enable cors
app.use(cors());

// static folder
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 5000;

// routes

app.use('/api/v1/stores', routes)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()