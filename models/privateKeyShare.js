const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivateKeyShareSchema = new Schema({
share: { type: String, required: true },
part: { type: Number, required: true },
network: { type: String, required: true } 
});

module.exports = mongoose.model('PrivateKeyShare', PrivateKeyShareSchema);

