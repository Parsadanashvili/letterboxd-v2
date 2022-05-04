const express = require('express');
const app = express();
const bp = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

// let corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static('uploads'));

// Connecting DB
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.listen(process.env.PORT || 3003, () => {
    console.log('Server started on port 3003');
});
