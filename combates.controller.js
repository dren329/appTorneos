const { ObjectId } = require('mongodb')
const torneoModel = require("./torneo.model.js")
const combateModel = require("./combate.model.js")

const Combate = {
	ver: async ( req, res ) => {
		const { id } = req.params
		const auxTorneo = await torneoModel.findOne({ _id: id })
		res.status(200).send(auxTorneo.combates)
	},
	verUnico: async ( req, res ) => {
		const { idTorneo, idCombate } = req.params
		const auxTorneo = await torneoModel.findOne({ _id: idTorneo })
		let combate = {}
		auxTorneo.combates.forEach( eleGrupo => {

			eleGrupo.forEach( iteCombate =>  {
				 if(iteCombate._id.toString() == idCombate){ combate = iteCombate }
			})
		})
		res.status(200).send(combate)
	},

	guardar: async (req, res) => {
		const idTorneo = req.params.idTorneo
		const reqGrupos = req.body

		const arrGruposCombates = reqGrupos.map( iteGrupo => {
			return iteGrupo.map( iteCombate => {

				const combate = new combateModel(iteCombate)
				combate.participante1 = iteCombate.participante1
				combate.participante2 = iteCombate.participante2
				return combate
			})
		})
		const torneo = await torneoModel.findOneAndUpdate({ _id: idTorneo }, {combates: arrGruposCombates})
		res.status(201).send(torneo)
	},

	actualizar: async ( req, res ) => {
		const { idTorneo, idCombate } = req.params
		const auxTorneo = await torneoModel.findOne({ _id: idTorneo })
		const combate = (auxTorneo.combates.flat()).find( iteCombate => 
			{
				return (iteCombate._id).toString() == idCombate 
			})
		console.log(combate)

		const combateActualizado = Object.assign( combate, req.body )
		await torneoModel.replaceOne({ _id: idTorneo }, auxTorneo )

		res.status(201).send(combateActualizado)
	},
}

module.exports = Combate
