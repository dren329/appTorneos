const torneoModel = require("./torneo.model.js")
const participanteModel = require("./participante.model.js")

const Participante = {
	ver: async (req, res) => {
		const { idTorneo } = req.params
		const torneo = await torneoModel.findOne({ _id: idTorneo })
		const participantes = torneo.participantes
		res.status(200).send(torneo.participantes)
	},
	verUnico: async  (req, res) => {
		const { idTorneo, idParticipante } = req.params
		const torneo = await torneoModel.findOne({ _id: idTorneo })
		const participante = torneo.participantes.find( itePart => itePart._id == idParticipante )

		res.status(200).send(participante)
	},
	crear: async (req, res) => {
		const idTorneo = req.params.idTorneo
		const participante = new participanteModel(req.body)
		const torneo = await torneoModel.findOne({ _id: idTorneo })

		const repetido = torneo.participantes.find(iteParticipante => iteParticipante.nombre == participante.nombre) 
		if(repetido){return res.status(200).send('El participante ya se encuentra registrado (revisar Nombre)') }

		torneo.participantes.push(participante)
		await torneo.save()
		res.status(201).send(torneo)
	},
	actualizar: async ( req, res) => {
		const { idTorneo, idParticipante } = req.params
		const torneo = await torneoModel.findOne({ _id: idTorneo })
		const participante = torneo.participantes.find( itePart => itePart._id == idParticipante )

		participanteActualizado = Object.assign(participante, req.body)


		await torneoModel.replaceOne( { _id: idTorneo }, torneo )

		res.status(201).send(participanteActualizado)
	},
	eliminar: async (req, res) => {
		const { idTorneo, idParticipante } = req.params
		const torneo = await torneoModel.findOne({ _id: idTorneo })
		const participante = torneo.participantes.findIndex( itePart => itePart._id == idParticipante )

		if( (participante !== -1) || (participante === 0) ){  

			torneo.participantes.splice(participante,1)
			await torneoModel.replaceOne( { _id: idTorneo }, torneo )

			res.status(204).send(torneo)
		} else { return res.status(200).send('Participante no Encontrado') }
		
	}
}

module.exports = Participante 
