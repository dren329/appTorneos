import fetchMain from "./fetchMain.js"
import logicaMain from "./logicaMain.js"

const fnAuxVistaCombate = async (idTorneo, idCombate) => {
	const auxCombate = await  fetchMain.verCombate(idTorneo, idCombate)
	const auxObjCombate = {
		participante1: auxCombate.participante1,
		participante2: auxCombate.participante2,
		inicio: null,
	}
	const auxVista = `
	<section id="secCombate">
		<div id="divContadorTiempo">
			<p>Tiempo:</p>
			<p id="pTemporizador">3:00</p>
			<button type="button" id="btnIniciarCombate">Iniciar</button>
			<button type="button" style="display: none;" id="btnTemporizador"> . </button>
		</div>
		<button type="button" class="btnPuntos" value=0 auxHistorial="Doble" >Doble</button>
		<div id="divParticipantes">
			<div id="divParticipante1">
				<p id="nombreP1" class="vsCombateNombrePart">${auxCombate.participante1}</p>
				<div class="divPuntos">
					<p>Puntos:</p>
					<p id="pPuntosP1" value=0 >${auxCombate.puntosP1}</p>
				</div>
				<button type="button" class="btnPuntos" value=3 auxparticipante="P1"  auxHistorial="Azul +3 Puntos" >+3 Puntos</button>
				<button type="button" class="btnPuntos" value=2 auxparticipante="P1"  auxHistorial="Azul +2 Puntos" >+2 Puntos</button>
				<button type="button" class="btnPuntos" value=1 auxparticipante="P1"  auxHistorial="Azul +1 Puntos" >+1 punto</button>
				<button type="button" class="btnPuntos" value=-1 auxparticipante="P1"  auxHistorial="Azul -1 Puntos" >Penalización</button>
			</div>
			<div id="divHistorialCombate">
				<p>Historial:</p>
				<div id="divListaHistorial">
					<p class="pAccionCombate"> Comienzo </p>
				</div>
			</div>
			<div id="divParticipante2">
				<p class="vsCombateNombrePart">${auxCombate.participante2}</p>
				<div class="divPuntos">
					<p>Puntos:</p>
					<p id="pPuntosP2" value=0 >${auxCombate.puntosP2}</p>
				</div>
				<button type="button" class="btnPuntos" value=3 auxparticipante="P2" auxHistorial="Rojo +3 Puntos" >+3 Puntos</button>
				<button type="button" class="btnPuntos" value=2 auxparticipante="P2"  auxHistorial="Rojo +2 Puntos" >+2 Puntos</button>
				<button type="button" class="btnPuntos" value=1 auxparticipante="P2"  auxHistorial="Rojo +1 Puntos" >+1 punto</button>
				<button type="button" class="btnPuntos" value=-1 auxparticipante="P2"  auxHistorial="Rojo -1 Puntos" >Penalización</button>
			</div>
		</div>

		<button type="button" id="btnFinalizarCombate" disabled>Finalizar</button>
	</section>
	`
	 document.querySelector('#idVistaCentral').innerHTML = auxVista
	 document.querySelector('#btnIniciarCombate').addEventListener('click', (event) => { 
		 logicaMain.timerCombate(event.currentTarget) 
		 auxObjCombate.inicio = Date.now()
		 document.querySelector('#btnFinalizarCombate').disabled = false
		 } )
	 const auxBtnAddPuntos = document.querySelectorAll('.btnPuntos')
	 auxBtnAddPuntos.forEach( ele => ele.addEventListener('click', event => logicaMain.addPuntajeCombate(event.currentTarget) ) )
	 document.querySelector('#btnFinalizarCombate').addEventListener('click', () => logicaMain.guardarCombate(auxObjCombate, idTorneo, idCombate) )
}

async function verTorneo(id){

	const auxTorneo = await fetchMain.verTorneo(id)

	const auxArrGrupos = auxTorneo.participantes.map( ele => {return {nombre: ele.nombre, escuela: ele.escuela}} )
	let Grupos = []
	const auxTemplate = `

		<div id="divVerTorneoSup">
			<section id="secVerTorneoInfo">

				<h3 id="h3TorneoTitulo">Nombre del Torneo: ${auxTorneo.nombreTorneo}</h3>
				<button type="button" class="btnPlus">Props</button>
					<p>Tamano grupo: ${auxTorneo.tamGrupo}<p>

			</section>
		
		</div>

		<div id="datosVerTorneoMed">
			<p>Fase: genFase</p>
		</div>

		<div id="divVerTorneoMed">
			<section id="secVerTorneoLsParticipantes"></section>
			<section id="secVerTorneoLsGrupos"></section>
			<section id="secVerTorneoLsCombates"></section>
		</div>
	`
	document.querySelector('#idVistaCentral').innerHTML = auxTemplate

	if(auxTorneo.participantes[0]){ // Mostrar Tabla Participantes
	document.querySelector('#secVerTorneoLsParticipantes').innerHTML = logicaMain.auxCrearTabla(auxTorneo.participantes, 'tblVerTorneoParticipantes', 'Lista de Participantes:', Object.keys(auxTorneo.participantes[0]))
	}

	if(auxTorneo.grupos[0]){
		logicaMain.crearTablaGrupos('#secVerTorneoLsGrupos', 'classClickCombates', auxTorneo.grupos)
	} // Mostrar Tabla Grupos

	 if(auxTorneo.combates){ 
		logicaMain.verTodosCombatesGrupo(auxTorneo.combates, auxTorneo._id , '#secVerTorneoLsCombates',fnAuxVistaCombate)
	 } // Mostrar Tabla Combates
}


async function editarTorneo(id){
	const auxTorneo = await fetchMain.verTorneo(id);
	const auxArrGrupos = auxTorneo.participantes.map( ele => {
		let auxData = { _id: ele._id, nombre: ele.nombre, escuela: ele.escuela } 
		return auxData
	})
	let grupos = []
	const auxTemplate = `

		<div id="divEditarTorneoSup">
			<section id="secEditarTorneoInfo">
				
			  <form id="formEditarTorneo">
				<div class="parInpt">
					<label for="nombreTorneo">Nombre del Torneo: </label>
					<input id="nombreTorneo" placeholder="Nombre" value="${auxTorneo.nombreTorneo}" />
				</div>

				<div class="parInpt">
					<label for="tamGrupo">Tamaño de Grupo: </label>
					<input type="number" id="inpTorneoTamanoGrupo" placeholder="Tamaño del Grupo" value=${auxTorneo.tamGrupo} />
				</div>

				<div class="parBtnAceCan">
				 <button type="button" class="btnCancelar">Cancelar</button>
				 <button type="button" id="btnEditarTorneoAceptar" class="btnAceptar" auxid="${auxTorneo._id}">Aceptar</button>
				</div>
			  </form>

			</section>

			<section id="secEditarTorneoAddParticipante">
				<form id="formAddParticipante">
				 <div class="parInpt">
					 <label for="inpParticipanteNombre">Nombre del Participante: </label>
					 <input id="inpParticipanteNombre" placeholder="Nombre" />
				 </div>

				 <fieldset class="fieldset">
					 <legend>Escuela</legend>
					  <div class="parInpRadio">
						<input type="radio" id="inpRadioKrigerskole" name="escuela" value="krigerskole" />
						<label for="inpRadioKrigerskole">Krigerskole</label>
					  </div>
					  <div class="parInpRadio">
						<input type="radio" id="inpRadioScorpius" name="escuela" value="scorpius" />
						<label for="inpRadioScorpius">Scorpius</label>
					  </div>
					  <div class="parInpRadio">
						<input type="radio" id="inpRadioOtraEscuela" name="escuela" value="null" />
						<label for="inpRadioOtraEscuela">Otro: </label>
						<input id="inpOtraEscuela" placeholder="Ingresar Nombre de Escuela"/>
					  </div>
				 </fieldset>

				 <div class="parBtnAceCan">
				  <button type="button" class="btnCancelar">Cancelar</button>
				  <button type="button" id="btnEditTorneoAddParticipante" class="btnAceptar">Aceptar</button>
				 </div>
				</form>

			</section>
		
		</div>

		<div id="btnsEditarTorneoMed">
			<button type="button" id="btnOrganizarGrupos">Organizar grupos</button>
			<button type="button" id="btnOrganizarCombates">Organizar combates</button>
			<button type="button" id="btnGruposAceptar">Guardar Grupos / Combates</button>
		</div>

		<div id="divEditarTorneoMed">
			<section id="secEditarTorneoLsParticipantes"></section>
			<section id="secEditarTorneoLsGrupos"></section>
			<section id="secEditarTorneoLsCombates"></section>
		</div>
	`
	document.querySelector('#idVistaCentral').innerHTML = auxTemplate
	if(auxTorneo.participantes[0]){ // Mostrar Tabla Participantes


	document.querySelector('#secEditarTorneoLsParticipantes').innerHTML = logicaMain.auxCrearTabla(auxTorneo.participantes, 'tblEditarTorneoParticipantes', 'Lista de Participantes:', Object.keys(auxTorneo.participantes[0]))
	}

	if(auxTorneo.grupos[0]){
		logicaMain.crearTablaGrupos('#secEditarTorneoLsGrupos', 'classClickCombates', auxTorneo.grupos)
	} // Mostrar Tabla Grupos

	 if(auxTorneo.combates){ 
	 	 logicaMain.verTodosCombatesGrupo(auxTorneo.combates, auxTorneo._id,  '#secEditarTorneoLsCombates', fnAuxVistaCombate)
	 } // Mostrar Tabla Combates

	// -------------- Agregar fnBotones

	
	document.querySelector('#btnEditarTorneoAceptar').addEventListener('click', () => fnAuxAddEditarTorneoFunctions(auxTorneo._id)) //botonAceptarInfo
	
	document.querySelector('#btnEditTorneoAddParticipante').addEventListener('click', () => logicaMain.addParticipante(auxTorneo._id))

	document.querySelector('#btnOrganizarGrupos').addEventListener('click', ()=>{

		grupos = logicaMain.asignarGrupos([...auxArrGrupos], auxTorneo.tamGrupo)
		auxTorneo.grupos = [...grupos]

		logicaMain.crearTablaGrupos('#secEditarTorneoLsGrupos', 'classClickCombates', grupos)

		auxTorneo.combates = grupos.map( ele => {
			return logicaMain.combatesGrupos(ele)
		})

// console.log(auxTorneo.grupos)
	 logicaMain.verTodosCombatesGrupo(auxTorneo.combates, auxTorneo._id, '#secEditarTorneoLsCombates', fnAuxVistaCombate)


		/* const auxIrClickCombate = document.querySelectorAll('.tbCombate')
		auxIrClickCombate.forEach( ele =>{
			ele.addEventListener('click', () => {fnAuxVistaCombate()})
		})
		*/
	}) // btnOrganizarGrupos


	document.querySelector('#btnOrganizarCombates').addEventListener('click', () => {
		auxTorneo.combates = auxTorneo.grupos.map( ele => {
			return logicaMain.combatesGrupos(ele)
		})
		console.log(auxTorneo.combates)
		logicaMain.verTodosCombatesGrupo(auxTorneo.combates, auxTorneo._id, '#secEditarTorneoLsCombates', fnAuxVistaCombate)

		const auxIrClickCombate = document.querySelectorAll('.tbCombate')
		auxIrClickCombate.forEach( ele =>{
			ele.addEventListener('click', () => {fnAuxVistaCombate()})
		})
	})


	document.querySelector('#btnGruposAceptar').addEventListener('click', (() => {
			fetchMain.editarGruposTorneo(auxTorneo._id, auxTorneo.grupos)
			fetchMain.editarCombatesTorneo(auxTorneo._id, auxTorneo.combates)
		}))


}


	const auxCrearTr = (inpDataObj) => {
		 const datosObjeto = Object.values(inpDataObj);
		 let auxId =  ''
		 if(inpDataObj.id){ auxId = inpDataObj.id.toString();}
		 return datosObjeto.reduce( (accStr, ele) => {
				 return accStr + `<td  class="tdViewClass">` + ele + '</td>'
			  },`<tr auxId = ${ + auxId} class=" trViewClass">` ) + '</tr>';
	  };

// --------------- logicaTorneos

async function verTorneos(idEvento){
	const arrTorneos = await fetchMain.verTorneos(idEvento);
	const auxDom = document.querySelector('#divEventoTorneos');
	const auxDataArr = arrTorneos.map( (ele, i,) => {
		return {id: (i + 1), nombre: ele.nombreTorneo, estado: ele.estado, editar: `<button type="button" class="btnEditTorneo" auxIdEditTor="${ele._id}">Editar</button>`, ver:`<button type="button" class="btnVerTorneo" auxIdVerTor="${ele._id}">Ver</button>`, }
	})

	const auxVista = logicaMain.auxCrearTabla(auxDataArr,`tbTorneos`, 'Torneos', ['id', 'nombre', 'estado', 'Editar', 'ver'], )

	return auxVista	
}

function crearEvento(){
	const auxDom = document.querySelector('#idVistaCentral')
	const auxHtml = `
			<div id="divCrearEvento">
				<form id="formCrearEvento">

					<div class="parInpt">
						<label for="nombreEvento">Nombre del Evento: </label>
						<input id="nombreEvento" name="nombreEvento" placeholder="Nombre" />
					</div>

					<div class="parInpt">
						<label for="fechaEvento">Fecha del Evento: </label>
						<input type="date" id="fechaEvento" name="fechaEvento" min="2024-01-01" />
					</div>

					<div class="parInpt">
						<label for="sedeEvento">Sede del Evento: </label>
						<input id="sedeEvento" name="sedeEvento" placeholder="Sede del Evento" />
					</div>

					<button type="sumbit" id="btnFormCrearEvento">Crear</button>
				</form>

				<div id="divCrearTorneo"></div>
			</div>
	`

	auxDom.innerHTML = auxHtml

	document.querySelector('#btnFormCrearEvento').addEventListener( 'click', logicaMain.crearEvento )

}



async function verEventos(){
	const eventos = await fetchMain.verEventos()

	const tablaTorneos =	await Promise.all( eventos.map( async(ele) => await verTorneos(ele._id)	)
	)
	
	const auxDom = document.querySelector('#idVistaCentral')
	const domHtml = eventos.reduce( (accStr, ele, i) => {
		
	const auxHtml = `
				<article class="artEvento">
					<h3 class="h3EventoNombre">${ele.eventoNombre}</h3>
					<div class="divEventoEncabezado">
						<div class="divEventoInfo">
							<p class="clsEventoData pEventoFecha">Fecha: ${new Date(ele.eventoFecha).toLocaleDateString('es-MX')}</p>
							<p class="clsEventoData pEventoFecha">Fin: ${new Date(ele.eventoFechaFin).toLocaleDateString('es-MX')}</p>
							<p class="clsEventoData pEventoSede">Sede: ${ele.eventoSede}</p>
						</div>
						<button type="button" class="btnVerEventoExtras">Extras / Costos</button>
						<img src="../assets/imagenes/logoGen.jpg" alt="imagen" />
					</div>
					<div id= class="divEventoTorneos">
						${tablaTorneos[i]}
					</div>
				</article>
	`
		return accStr + auxHtml 

	}, '' )

	auxDom.innerHTML = domHtml


	document.querySelectorAll('.btnEditTorneo').forEach( 
	ele => {
		ele.addEventListener('click', event => editarTorneo( event.target.getAttribute('auxidedittor') )) 
		})


	document.querySelectorAll('.btnVerTorneo').forEach( 
	ele => {
		ele.addEventListener('click', event => verTorneo( event.target.getAttribute('auxidvertor') )) 
		})
}

const renderMain = {
	crearEvento: ()=> { crearEvento() },
	verEventos: ()=> { verEventos() },
}
export default renderMain 
