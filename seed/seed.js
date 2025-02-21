// seed/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Survey = require('../models/Survey');
const Answer = require('../models/Answer');
const User = require('../models/User');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log("MongoDB connected for the seed");

        // Vider les collections avant d'insérer de nouvelles données.
        await Survey.deleteMany({});
        await Answer.deleteMany({});

        // Créer un sondage de test.
        const testSurvey = new Survey({
            name: "Sondage Préférences Alimentaires",
            creator: new mongoose.Types.ObjectId(),
            questions: [
                { title: "Quel est votre plat préféré ?", type: "open" },
                { title: "Quels types de cuisine préférez-vous ?", type: "mcq", answers: ["Italienne", "Chinoise", "Mexicaine", "Indienne"] }
            ]
        });

        await testSurvey.save();

        // Créer un document de réponse associé au sondage.
        const testAnswer = new Answer({
            survey_id: testSurvey._id,
            user_id: new mongoose.Types.ObjectId(),
            answers: [
                { question_id: testSurvey.questions[0]._id, answer: "Pizza" },
                { question_id: testSurvey.questions[1]._id, answer: ["Italienne", "Indienne"] }
            ]
        });

        await testAnswer.save();


        const testUser = new User({
            name: "John Doe",
            password: await bcrypt.hash("password", 10)
        });

        await testUser.save();

        console.log("Data entered");
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
