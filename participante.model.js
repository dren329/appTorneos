const mongoose = require("mongoose")

const Participante = mongoose.model('Participante', {
	nombre: String,
	escuela: String,
	puntos: Number,
	dobles: Number,
	ganados: Number,
	perdidos: Number,
})

module.exports = Participante
