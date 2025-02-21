// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connexion error with MongoDB", err));


const surveysRoutes = require('./routes/surveys');
app.use('/api/surveys', surveysRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server launched on port ${PORT}`));
