// models/Reponse.js
const mongoose = require('mongoose');

const AnswerQuestionSchema = new mongoose.Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    answer: mongoose.Schema.Types.Mixed
});

const AnswerSchema = new mongoose.Schema({
    survey_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [AnswerQuestionSchema]
});

module.exports = mongoose.model('Answer', AnswerSchema);
