const fetchMain = {

	// ------------- fetchTorneos

	crearTorneo: async (objTorneo) => {
		const resTorneo = await fetch('/crearTorneo', {
			method: 'POST',
			body: JSON.stringify(objTorneo),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const jsonTorneo = await resTorneo.json()
		return jsonTorneo
	},

	verTorneos: async (idEvento) => {
		const resTorneos = await fetch(`/verTorneos/${idEvento}`)
		const jsonTorneos = await resTorneos.json()
		return jsonTorneos
	},

	verTorneo: async (idTorneo) =>{
		const resTorneo = await fetch(`/verTorneo/${idTorneo}`)
		const jsonTorneos = await resTorneo.json()
		return jsonTorneos
	},

	editarGruposTorneo: async (idTorneo, grupos) => {
		const resGrupos = await fetch(`/editarGruposTorneo/${idTorneo}`,{
			method: 'PUT',
			body: JSON.stringify(grupos),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		return  resGrupos
	},

	editarCombatesTorneo: async (idTorneo, combates) => {
		const resCombates = await fetch(`/guardarCombates/${idTorneo}`,{
			method: 'PUT',
			body: JSON.stringify(combates),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		return resCombates
	},

	verCombate: async ( idTorneo, idCombate ) => {
		const resCombate = await fetch(`/verCombate/${idTorneo}/${idCombate}`)
		const jsonCombate = await resCombate.json()

		return jsonCombate 
	},

	finalizarCombate: async ( idTorneo, idCombate, dataCombate ) => {
		console.log('fetch', idTorneo, idCombate, dataCombate)
		const resCombate = await fetch(`/editarCombate/${idTorneo}/${idCombate}`, {
			method: 'PUT',
			body: JSON.stringify(dataCombate),
			headers:{
				'Content-Type': 'application/json'
			}
		})
		return resCombate
	},

// --------------------- fetchEventos

	crearEvento: async (objEvento) => {
		const resEvento = await fetch('/crearEvento', {
			method: 'POST',
			body: JSON.stringify(objEvento),
			headers:{
				'Content-Type': 'application/json'
			}
		})

		const jsonEvento = await resEvento.json()
		return jsonEvento
	},

	verEventos: async () => {
		const resEventos = await fetch('/verEventos')
		const jsonEventos = await resEventos.json()
		return jsonEventos
	},

	addParticipanteEvento: async (idEvento, dataParticipante) =>{
		const res = await fetch(`/crearParticipanteEvento/${idEvento}`, {
			method: 'POST',
			body: JSON.stringify(dataParticipante),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const jsonParticipante = await res.json()
		return jsonParticipante
	},

	addParticipanteTorneo: async (idTorneo, dataParticipante) =>{
		const res = await fetch(`/crearParticipanteTorneo/${idTorneo}`, {
			method: 'POST',
			body: JSON.stringify(dataParticipante),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const jsonParticipante = await res.json()
		return jsonParticipante
	},

	//

}

export default fetchMain
