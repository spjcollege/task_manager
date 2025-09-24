const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: { type: [String], default: [] }
});

module.exports = mongoose.model('Team', TeamSchema);
