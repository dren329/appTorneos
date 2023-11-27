const eventoModel = require("./evento.model.js")

const Evento = {
	ver: async (req, res) => {
		const eventos = await eventoModel.find()
		res.status(200).send(eventos)
	},
	verUnico: async  (req, res) => {
		const { id } = req.params
		const evento = await eventoModel.findOne({ _id: id })
		res.status(200).send(evento)
	},
	crear: async (req, res) => {
		const evento = new eventoModel(req.body)
		const eventoGuardado = await evento.save()
		res.status(201).send(eventoGuardado._id)
	},
	actualizar: async ( req, res) => {
		const { id } = req.params
		const evento = await eventoModel.findOne({ _id: id })
		Object.assign(evento, req.body)
		await evento.save()
		res.status(204).send('actualizarTorneo')
	},
	eliminar: async (req, res) => {
		const { id } = req.params
		const evento = await eventoModel.findOne({ _id: id })
		if(evento){ await eventoModel.deleteOne({ _id: evento._id }) }

		res.status(204).send('eliminarTorneo')
	}
}

module.exports = Evento 
