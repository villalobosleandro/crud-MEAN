const mongoose = require('mongoose');
const { Schema } = mongoose;

var userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    cedula: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
    }

}, {
    versionKey: false,
    timestamps: true,
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model("User", userSchema);