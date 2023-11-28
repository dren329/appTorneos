const mongoose = require('mongoose')

const Torneo = mongoose.model('Torneo', {
	nombreTorneo: { type: String, required: true},
	refEvento: { type:String,  required: true},
	estado: { type: String, default: 'organizacion' },
	tamGrupo: { type: Number, required: true},
	participantes: { type: Array, default: [] },
	grupos: { type: Array, default: [] },
	combates: { type: Array, default: [] },
	fecha: { type: Date, default: Date.now },
})

module.exports = Torneo
