const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = new Schema({
    ID: {
        type: String,
        required: true
    }

});

const Emp = mongoose.model('emp', empSchema);

module.exports = 
{Emp};