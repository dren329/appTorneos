/*
const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req, res) => {
	res.status(200).send('respuesta');	
});

app.listen(port, () => {
	console.log('appArriba')
})
*/
const express = require('express')
const mongoose =require('mongoose')

const evento = require('./evento.controller.js')
const torneo = require('./torneos.controller.js')
const participante = require('./participantes.controller.js')
const combate = require('./combates.controller.js')

const app = express()
const port = 3000

app.use(express.json())

const main = async () => {




	 await mongoose.connect('mongodb+srv://krigerUsuario:ctrgenKrigerskoleDataBase.0@krigertorneos.er7nteq.mongodb.net/?retryWrites=true&w=majority')


	app.use(express.static('./vistas'))

	//------------------ Eventos


	app.get('/verEventos', evento.ver)
	app.get('/verEvento/:id', evento.verUnico)
	app.post('/crearEvento', evento.crear)
	app.put('/editarEvento/:id', evento.actualizar)
	app.delete('/eliminarEvento/:id', evento.eliminar)

	//----------------- Torneos

	app.get('/verTorneos/:id', torneo.ver)

	app.get('/verTorneo/:id', torneo.verUnico)

	app.post('/crearTorneo', torneo.crear)

	app.put('/editarTorneo/:id', torneo.actualizar)

	app.patch('/editarPatchTorneo/:id', torneo.actualizar)

	app.put('/editarGruposTorneo/:id', torneo.editarGrupos)

	app.put('/editarCombatesTorneo/:id', torneo.editarCombates)

	app.delete('/eliminarTorneo/:id', torneo.eliminar)

	// ----------- Participantes 
	app.get('/verParticipantes/:idTorneo', participante.ver)

	app.get('/verParticipante/:idTorneo/:idParticipante', participante.verUnico)

	app.post('/crearParticipanteEvento/:idEvento', participante.crearEvento)
	app.post('/crearParticipanteTorneo/:idTorneo', participante.crearTorneo)

	app.put('/editarParticipante/:idTorneo/:idParticipante', participante.actualizar)

	app.patch('/editarPatchParticipante/:idTorneo/:idParticipante', participante.actualizar)

	app.delete('/eliminarParticipante/:idTorneo/:idParticipante', participante.eliminar)

	// ----------- Combates

	app.get('/verCombates/:idTorneo', combate.ver)
	app.get('/verCombate/:idTorneo/:idCombate', combate.verUnico)
	app.put('/editarCombate/:idTorneo/:idCombate', combate.actualizar)
	app.put('/guardarCombates/:idTorneo', combate.guardar)

	// send html archivo

	app.get('/', (req, res) => {
		console.log(__dirname)
		res.sendFile(`${__dirname}/vistas/index.html`)
	})

	// Pagina no encontrada

	app.get('*', (req, res) => {
		res.status(404).send('Esta pagina no existe')
	})

	app.listen(port, () => {
		console.log('krigerServidor Activo')
	})

}

main().catch(err => {console.log(err)})
