const mongoose = require('mongoose')

async function main(){

await mongoose.connect('mongodb+srv://krigerUsuario:ctrgenKrigerskoleDataBase.0@krigertorneos.er7nteq.mongodb.net/?retryWrites=true&w=majority')

const Torneo = mongoose.model('Torneo', {
	nombreTorneo: String,
	estado: String,
	tamGrupo: Number,
	participantes: Array,
	grupos: Array,
	Combates: Array,
	fecha: Date,
})

/*
const Participante = mongoose.model('Participante', {
	nombre: String,
	escuela: String,
	puntos: Number,
	dobles: Number,
	ganados: Number,
	perdidos: Number,
})
*/

const crearTorneo = async () => {
	const torneo = new Torneo({
		 nombreTorneo: 'genTorneo3',
		 estado: 'organizacion',
		 tamGrupo: 5,
		 participantes: [],
		 grupos: [],
		 combates: [],
	})

	const torneoGuardado = await torneo.save()
	console.log(torneoGuardado)
}
// await crearTorneo()

const verTorneos = async () => {
	const torneos = await Torneo. find()
	console.log(torneos)
}

// await verTorneos()

const verTorneoNombre = async () => {
	const torneo = await Torneo.findOne({ nombreTorneo: 'genTorneo3'})
	console.log(torneo)
}

// await verTorneoNombre()

const actualizarTorneo = async () => {
	const torneo = await Torneo.findOne({ nombreTorneo: 'genTorneo2' })
	torneo.participantes = [
	]

	await torneo.save().then(console.log)
}

// await actualizarTorneo()

const eliminarTorneo = async () => {
	const torneo = await Torneo.findOne({ nombreTorneo: 'genTorneo3' })
	console.log(torneo)
	if(torneo){
		await torneo.deleteOne({ nombreTorneo: 'genTorneo3' })
	}
}
// await eliminarTorneo()

} //fin de main()

main().catch(err => console.log(err))
