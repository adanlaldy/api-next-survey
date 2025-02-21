// routes/surveys.js
const express = require('express');
const router = express.Router();
const Surveys = require('../models/Survey');

// Create a survey.
router.post('/', async (req, res) => {
    try {
        const survey = new Surveys(req.body);
        await survey.save();
        res.status(201).json(survey);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Get all surveys.
router.get('/', async (req, res) => {
    try {
        const surveys = await Surveys.find();
        res.json(surveys);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get survey by id.
router.get('/:id', async (req, res) => {
    try {
        const survey = await Surveys.findById(req.params.id);
        if (!survey) return res.status(404).json({message: 'Surveys not found.'});
        res.json(survey);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Update survey by id.
router.put('/:id', async (req, res) => {
    try {
        const survey = await Surveys.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!survey) return res.status(404).json({message: 'Surveys not found.'});
        res.json(survey);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Delete a survey by id.
router.delete('/:id', async (req, res) => {
    try {
        const survey = await Surveys.findByIdAndDelete(req.params.id);
        if (!survey) return res.status(404).json({message: 'Surveys not found.'});
        res.json({message: 'Surveys deleted.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
