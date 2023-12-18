const mongoose = require('mongoose');

const Evento = mongoose.model('Evento', {
	eventoNombre: { type: String, required: true },
	eventoCreacion: { type: Date, default: Date.now },
	eventoFecha: { type: Date, required: true },
	eventoSede: String,
	eventoExtras: { type: Array, default: [] },
	eventoTorneos: { type: Array, default: [] },
	eventoParticipantes:{ type: Array, default: [] }
})

module.exports = Evento
