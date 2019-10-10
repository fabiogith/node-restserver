const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usario es obligatorio']
    }
});


categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
})

module.exports = mongoose.model('Categoria', categoriaSchema)