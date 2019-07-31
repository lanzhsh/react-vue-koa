const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name:{
    type:String,
    required:true
  },
  price:{
    type:String
  },
  number:{
    type:Number
  },
}, { collection: 'course', versionKey: false});

module.exports = mongoose.model('course', CourseSchema);
