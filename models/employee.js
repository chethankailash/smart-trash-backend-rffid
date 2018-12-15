const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = new Schema({
    num: {
        type: Number,
        required: true
    }

});

const Emp = mongoose.model('emp', empSchema);

module.exports = 
{Emp};