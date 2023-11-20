import fetchMain from "./fetchMain.js"



async function editarTorneo(id){
	const auxTorneo = await fetchMain.verTorneo(id);
	const auxArrGrupos = auxTorneo.participantes.map( ele => {
		let auxData = { nombre: ele.nombre, escuela: ele.escuela } 
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
			<button type="button" id="btnGruposAceptar">Guardar Grupos</button>
			<button type="button" id="btnCombatesAceptar">Guardar Combates</button>
		</div>

		<div id="divEditarTorneoMed">
			<section id="secEditarTorneoLsParticipantes"></section>
			<section id="secEditarTorneoLsGrupos"></section>
			<section id="secEditarTorneoLsCombates"></section>
		</div>
	`
	document.querySelector('#idVistaCentral').innerHTML = auxTemplate
/*
	if(auxTorneo.participantes[0]){ // Mostrar Tabla Participantes
	document.querySelector('#secEditarTorneoLsParticipantes').innerHTML = auxCrearTabla(auxTorneo.participantes, 'tblEditarTorneoParticipantes', 'Lista de Participantes:', Object.keys(auxTorneo.participantes[0]))
	}

	if(auxTorneo.grupos[0]){
		crearTablaGrupos('#secEditarTorneoLsGrupos', 'classClickCombates', auxTorneo.grupos)
	} // Mostrar Tabla Grupos
*/	
	// -------------- Agregar fnBotones

	
	document.querySelector('#btnEditarTorneoAceptar').addEventListener('click', () => fnAuxAddEditarTorneoFunctions(auxTorneo._id)) //botonAceptarInfo
	
	document.querySelector('#btnEditTorneoAddParticipante').addEventListener('click', () => fnAddParticipante(auxTorneo._id))

	document.querySelector('#btnOrganizarGrupos').addEventListener('click', ()=>{
		grupos = fnAsignarGrupos([...auxArrGrupos], auxTorneo.tamGrupo)
		console.log(grupos)
		crearTablaGrupos('#secEditarTorneoLsGrupos', 'classClickCombates', grupos)

	auxTorneo.combates = grupos.map( ele => {
		return fnCombatesGrupos(ele)
	})

	 // auxTorneo.combates.map( ele => {console.log(ele); verTodosCombatesGrupo(ele , '#secEditarTorneoLsCombates')})
	 verTodosCombatesGrupo(auxTorneo.combates, '#secEditarTorneoLsCombates')


	const auxIrClickCombate = document.querySelectorAll('.tbCombate')
	auxIrClickCombate.forEach( ele =>{
		ele.addEventListener('click', () => {fnAuxVistaCombate()})
	})
	}) // btnOrganizarGrupos


	document.querySelector('#btnOrganizarCombates').addEventListener('click', () => {
	console.log(auxTorneo)
	auxTorneo.combates = fnCombatesGrupos([...auxTorneo.grupos])
	verCombatesGrupo(auxTorneo.combates, '#secEditarTorneoLsGrupos')



	})


	document.querySelector('#btnGruposAceptar').addEventListener('click', (() => {fetchGuardarGrupos(auxTorneo._id, grupos); auxTorneo.grupos = grupos}))

	document.querySelector('#btnCombatesAceptar').addEventListener('click', () => console.log('guardar'))

}

	const auxCrearTr = (inpDataObj) => {
		 const datosObjeto = Object.values(inpDataObj);
		 let auxId =  ''
		 if(inpDataObj.id){ auxId = inpDataObj.id.toString();}
		 return datosObjeto.reduce( (accStr, ele) => {
				 return accStr + `<td  class="tdViewClass">` + ele + '</td>'
			  },`<tr auxId = ${ + auxId} class=" trViewClass">` ) + '</tr>';
	  };

const auxCrearTabla = (inpArr, auxClassJs = '',inpCaption = '', inpArrTitulo = []) => {

		 const auxTbTitulo = inpArrTitulo.reduce( (accStr, ele) => {
				 return accStr + `<th class="tdViewClass">` + ele + '</th>'
			  },'<thead class="theadViewClass"><tr>' ) + '</tr></thead>';
		return inpArr.reduce( (accStr, ele) => {
			return accStr + auxCrearTr(ele)
		},` <table class="tableViewClass ${auxClassJs}"><caption>${inpCaption}</caption>${auxTbTitulo}<tbody class="tbodyViewClass">` ) + '</tbody></table>';
		
}

async function verTorneos(idEvento){
	const arrTorneos = await fetchMain.verTorneos(idEvento);
	const auxDom = document.querySelector('#divEventoTorneos');
	const auxDataArr = arrTorneos.map( (ele, i,) => {
		return {id: (i + 1), nombre: ele.nombreTorneo, estado: ele.estado, editar: `<button type="button" class="btnEditTorneo" auxIdEditTor="${ele._id}">Editar</button>`, ver:`<button type="button" class="btnVerTorneo" auxIdVerTor="${ele._id}">Ver</button>`, }
	})

	const auxVista = auxCrearTabla(auxDataArr,`tbTorneos`, 'Torneos', ['id', 'nombre', 'estado', 'Editar', 'ver'], )

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

				</form>
			</div>
	`

	auxDom.innerHTML = auxHtml

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
