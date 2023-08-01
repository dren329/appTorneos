const express = require('express')
const mongoose =require('mongoose')

const torneo = require('./torneos.controller.js')
const participante = require('./participantes.controller.js')

const app = express()
const port = 3000

app.use(express.json())

const main = async () => {
	await mongoose.connect('mongodb+srv://krigerUsuario:ctrgenKrigerskoleDataBase.0@krigertorneos.er7nteq.mongodb.net/?retryWrites=true&w=majority')



	app.get('/verTorneos', torneo.ver)

	app.get('/verTorneo/:id', torneo.verUnico)

	app.post('/crearTorneo', torneo.crear)

	app.put('/editarTorneo/:id', torneo.actualizar)

	app.patch('/editarPatchTorneo/:id', torneo.actualizar)

	app.delete('/eliminarTorneo/:id', torneo.eliminar)

	// ----------- Participantes 
	app.get('/verParticipantes/:idTorneo', participante.ver)

	app.get('/verParticipante/:idTorneo/:idParticipante', participante.verUnico)

	app.post('/crearParticipante/:idTorneo', participante.crear)

	app.put('/editarParticipante/:idTorneo/:idParticipante', participante.actualizar)

	app.patch('/editarPatchParticipante/:idTorneo/:idParticipante', participante.actualizar)

	app.delete('/eliminarParticipante/:idTorneo/:idParticipante', participante.eliminar)

	app.listen(port, () => {
		console.log('krigerServidor Activo')
	})

}

main().catch(err => {console.log})
