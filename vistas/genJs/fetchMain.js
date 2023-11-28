const fetchMain = {

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
		const resCombates = await fetch(`/editarCombatesTorneo/${idTorneo}`,{
			method: 'PUT',
			body: JSON.stringify(combates),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	console.log(combates, resCombates)
		return resCombates
	},

	verEventos: async () => {
		const resEventos = await fetch('/verEventos')
		const jsonEventos = await resEventos.json()
		return jsonEventos
	},

	addParticipante: async (idTorneo, dataParticipante) =>{
		const res = await fetch(`/crearParticipante/${idTorneo}`, {
			method: 'POST',
			body: JSON.stringify(dataParticipante),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		return res
	},

}

export default fetchMain
