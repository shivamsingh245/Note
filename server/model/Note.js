const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Note", noteSchema);