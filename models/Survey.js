// models/SurveySurvey.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, enum: ['open', 'mcq'], required: true},
    answers: [String]
});

const SurveySchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    questions: [QuestionSchema]
});

module.exports = mongoose.model('Survey', SurveySchema);
