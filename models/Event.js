const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
  local: String, 
  description: String,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
