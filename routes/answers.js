// routes/answers.js
const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Survey = require('../models/Survey');

// Add answer to a survey.
router.post('/', async (req, res) => {
    try {
        const { survey_id, user_id, answers } = req.body;

        // Check if survey exist.
        const survey = await Survey.findById(survey_id);
        if (!survey) {
            return res.status(404).json({ message: 'Survey not found.' });
        }

        // Create a new doc for answer.
        const answerDoc = new Answer({
            survey_id,
            user_id,
            answers
        });

        await answerDoc.save();
        res.status(201).json(answerDoc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all answers from a survey.
router.get('/:survey_id', async (req, res) => {
    try {
        const { survey_id } = req.params;
        const answers = await Answer.find({ survey_id });
        res.json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
