const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  state: String,
  city: String,
  musicaltraining: String,
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
