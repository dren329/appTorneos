const torneoModel = require("./torneo.model.js")

const Torneo = {
	ver: async (req, res) => {
		const { id } = req.params
		const torneos = await torneoModel.find({ refEvento: id })
		res.status(200).send(torneos)
	},
	verUnico: async  (req, res) => {
		const { id } = req.params
		const torneo = await torneoModel.findOne({ _id: id })
		res.status(200).send(torneo)
	},
	crear: async (req, res) => {
		const torneo = new torneoModel(req.body)
		const torneoGuardado = await torneo.save()
		res.status(201).send(torneoGuardado._id)
	},
	actualizar: async ( req, res) => {
		const { id } = req.params
		const torneo = await torneoModel.findOne({ _id: id })
		Object.assign(torneo, req.body)
		await torneo.save()
		res.status(204).send('actualizarTorneo')
	},
	eliminar: async (req, res) => {
		const { id } = req.params
		const torneo = await torneoModel.findOne({ _id: id })
		if(torneo){ await torneoModel.deleteOne({ _id: torneo._id }) }

		res.status(204).send('eliminarTorneo')
	}
}

module.exports = Torneo
