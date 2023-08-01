const mongoose = require('mongoose')

const Torneo = mongoose.model('Torneo', {
	nombreTorneo: { type: String, required: true},
	estado: { type: String, required: true},
	tamGrupo: { type: Number, required: true},
	participantes: Array,
	grupos: Array,
	Combates: Array,
	fecha: Date,
})

module.exports = Torneo
