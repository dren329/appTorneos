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

	verEventos: async () => {
		const resEventos = await fetch('/verEventos')
		const jsonEventos = await resEventos.json()
		return jsonEventos
	}

}

export default fetchMain
