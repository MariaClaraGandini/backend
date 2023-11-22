const mongoose = require('mongoose');
const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  // permissions: {
  //   type: [String], // Array de permissões
  //   default: [],    // Permissões padrão vazias
  // },
});

module.exports = User;
