// seed/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Survey = require('../models/Survey');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log("MongoDB connected for the seed");

        // Exemple de données
        const testSurvey = new Survey({
            name: "Sondage Préférences Alimentaires",
            creator: new mongoose.Types.ObjectId(),
            questions: [
                { title: "Quel est votre plat préféré ?", type: "open" },
                { title: "Quels types de cuisine préférez-vous ?", type: "mcq", answers: ["Italienne", "Chinoise", "Mexicaine", "Indienne"] }
            ]
        });

        await Survey.deleteMany({});
        await testSurvey.save();
        console.log("Data entered");
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
