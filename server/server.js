const express = require('express');
const app = express();
const bp = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Connecting DB
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

app.listen(process.env.PORT || 3003, () => {
    console.log('Server started on port 3003');
});
