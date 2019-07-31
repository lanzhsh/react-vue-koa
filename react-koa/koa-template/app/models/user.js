const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    require: true
  },
  account: {
    type: String
  },
}, { collection: 'user', versionKey: false});

module.exports = mongoose.model('user', UserSchema);
