const mongoose = require("mongoose")

const Combate = mongoose.model('Combate', {
	participante1: String,
	participante2: String,
	puntosP1: {type: Number, default: 0},
	puntosP2: {type: Number, default: 0},
	tiempo: {type: Number, default: 0},
	inicio: {type: Number, default: Date.now()},
	dobles: {type: Number, default: 0},
	historial: { type: Array, default: []},
})

module.exports = Combate
