const participantesGenericos = [
 { nombre: "Paco", escuela: "Krigerskole", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Jose", escuela: "Krigeskole", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Juanca", escuela: "Krigeskole", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Alexis", escuela: "Krigeskole", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Juan", escuela: "Krigeskole", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Yadira", escuela: "Krigeskole", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Rafael", escuela: "Krigeskole", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Chava", escuela: "Krigeskole", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Armin", escuela: "Krigeskole", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },

 { nombre: "Ana Tavera", escuela: "Scorpius", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Adrian Escorcia", escuela: "Scorpius", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Scorpius3", escuela: "Scorpius", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Scorpius4", escuela: "Scorpius", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Scorpius5", escuela: "Scorpius", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Scorpius6", escuela: "Scorpius", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Scorpius7", escuela: "Scorpius", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Scorpius8", escuela: "Scorpius", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "ArturoLion", escuela: "Lion's Knights", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },

 { nombre: "Rex", escuela: "Lion's Knights", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Marisol", escuela: "Lion's Knights", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Lion4", escuela: "Lion's Knights", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Lion6", escuela: "Lion's Knights", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Lion7", escuela: "Lion's Knights", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre: "Lion8", escuela: "Lion's Knights", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },

 { nombre:"Roberto", escuela: "Charros", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre:"Majejas", escuela: "Majejas", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre:"Rodrigo", escuela: "Majejas", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre:"Gaute", escuela: "Gautes", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
 { nombre:"LadyLuna", escuela: "Gautes", puntos: 10, dobles: 3, ganados: 5, perdidos: 5 },
]
const escuelas = [
	'krigerskole',
	'scorpius',
	'lion`s knights',
]
const lsTorneos = [
		{
		 id: 0,
		 nombreTorneo: 'genTorneo1',
		 estado: 'Finalizado',
		 tamGrupo: 4,
		 participantes: [...participantesGenericos],
		 grupos: [],
		 combates: [],
		},
		{
		 id: 1,
		 nombreTorneo: 'genTorneo2',
		 estado: 'En proceso',
		 tamGrupo: 4,
		 participantes: [...(participantesGenericos.splice(-10))],
		 grupos: [],
		 combates: [],
		},
		{
		 id: 2,
		 nombreTorneo: 'genTorneo3',
		 estado: 'En organizacion',
		 tamGrupo: 7,
		 participantes: [],
		 grupos: [],
		 combates: [],
		},
]
const tablaGrupos = []

function fnAddParticipante(auxIdTorneo){
console.log(auxIdTorneo)
	const auxNombrePart = document.querySelector('#inpParticipanteNombre').value
	const escuela = document.querySelector('input[name="escuela"]:checked').value

	const auxDataParticipante = { nombre: auxNombrePart , escuela: escuela, puntos: 0, dobles: 0, ganados: 0, perdidos: 0 }
	if(auxIdTorneo || (auxIdTorneo == 0)){
		const auxIndex = lsTorneos.findIndex( ({id}) => id == auxIdTorneo )
		lsTorneos[auxIndex].participantes.push(auxDataParticipante)


	document.querySelector('#secEditarTorneoLsParticipantes').innerHTML = auxCrearTabla(lsTorneos[auxIndex].participantes, 'tblEditarTorneoParticipantes', 'Lista de Participantes:', Object.keys(lsTorneos[auxIndex].participantes[0]))
	}

	
}

// funciones auxiliares para crear DOM

// ------------------------ Asignar Funciones a DOM -----------

function fnEditarTorneoNombre(auxIdTorneo){
	const auxInp = document.querySelector('#inpTorneoNombre').value
	const torneo = lsTorneos.findIndex( ({id}) => {return id == auxIdTorneo})
	lsTorneos[torneo].nombreTorneo = auxInp
}

function fnEditarTorneoTamGrupo(auxIdTorneo){
	const auxInp = document.querySelector('#inpTorneoTamanoGrupo').value
	const torneo = lsTorneos.findIndex( ({id}) => {return id == auxIdTorneo})
	lsTorneos[torneo].tamGrupo = parseInt(auxInp)
	console.log(lsTorneos)
}

function fnEditarTorneoFase(){}

function fnAuxAddEditarTorneoFunctions(auxIdTorneo){
	fnEditarTorneoNombre(auxIdTorneo)
	fnEditarTorneoTamGrupo(auxIdTorneo)
}


// Creacion de Torneos, estructuras
function fnBtnCrearTorneo(){
	const auxVista = `
		<section id="secCrearTorneo">
			<form id="formCrearTorneo">
			 <div class="parInpt">
				 <label for="inpTorneoNombre">Nombre del Torneo: </label>
				 <input id="inpTorneoNombre" placeholder="Nombre" />
			 </div>

			 <div class="parInpt">
				 <label for="inpTamanoGrupo">Tamaño de Grupo: </label>
				 <input type="number" id="inpTorneoTamanoGrupo" placeholder="Tamaño del Grupo" />
			 </div>

			 <fieldset class="fieldset">
				 <legend>Estilo de Puntaje</legend>
				  <div class="parInpRadio">
					<input type="radio" id="inpTorneoTipoCombates" name="tipoPuntaje" value="combates" />
					<label for="inpTorneoTipoCombates">Combates</label>
				  </div>
				  <div class="parInpRadio">
					<input type="radio" id="inpTorneoTipoPuntos" name="tipoPuntaje" value="puntos" />
					<label for="inpTorneoTipoPuntos">Puntos </label>
				  </div>
			 </fieldset>
			 <div class="parBtnAceCan">
			  <button type="button" class="btnCancelar">Cancelar</button>
			  <button type="button" id="btnAceptarCrearTorneo" class="btnAceptar">Aceptar</button>
			 </div>
			</form>

		</section>
	`
	document.querySelector('#idVistaCentral').innerHTML = auxVista
	document.querySelector('#btnAceptarCrearTorneo').addEventListener('click',()=> crearTorneo())
}

function crearTorneo(){
 const nombreTorneo = document.querySelector('#inpTorneoNombre').value
 const tamGrupo = document.querySelector('#inpTorneoTamanoGrupo').value
 const tipoPuntaje = document.querySelector('input[name="tipoPuntaje"]:checked').value
 if(!nombreTorneo || !tamGrupo || !tipoPuntaje){return alert('llenar todos los campos / verifique que los sea un dato coherente')}
 if(isNaN(tamGrupo)){ return alert('el tamaño de grupo debe ser un numero')}
	lsTorneos.push(
		{
		 id: lsTorneos.lenght + 1,
		 nombreTorneo,
		 tamGrupo,
		 estado: 'organizacion',
		 tipoPuntaje,
		 lsParticipantes: [],
		 grupos: [],
		 combates: [],
		},
		)
	verTorneos(lsTorneos)
}


function btnAddParticipante(){
	const auxTemplate = `
			<section id="secAddParticipante">
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

				 <div class="divChecks">
					<fieldset class="fieldset">
						<legend>Seleccionar Torneos: </legend>
						<div class="parInpCheckbox">
							<label for="inpCheckTorneo1"><input type="checkbox" id="inpCheckTorneo1" name="torneosOrganizacion" value="torneo1"/> Torneo gen1 </label>
							<label for="inpCheckTorneo2"><input type="checkbox" id="inpCheckTorneo2" name="torneosOrganizacion" value="torneo2"/> Torneo gen2 </label>
						</div>
					</fieldset>
				 </div>

				 <div class="parBtnAceCan">
				  <button type="button" class="btnCancelar">Cancelar</button>
				  <button type="button" id="btnAddParticipanteAceptar" class="btnAceptar">Aceptar</button>
				 </div>
				</form>

			</section>
	`
	document.querySelector('#idVistaCentral').innerHTML = auxTemplate

	document.querySelector('#btnAddParticipanteAceptar').addEventListener('click', () => console.log('añadir') )
}
//crearTorneo('genTorneo', participantesGenericos)//

function verCombatesGrupo(auxArrGrupo, auxDomInp = '#idVistaCentral') {

	const auxDom = document.querySelector(auxDomInp)
	const auxArrData = auxArrGrupo.map( (ele) => {
		return [{p1nombre: ele.p1.nombre, p2nombre: ele.p2.nombre}]
	})


	const auxVista = auxArrData.reduce( (acc, ele, i) => {
		return acc + auxCrearTabla(ele, 'tbCombate', `Combate: ${i+1}`)
	},'')
	auxDom.innerHTML = auxVista
}

function verTodosCombatesGrupo(auxArrGrupo, auxDomInp = '#idVistaCentral') {

	const auxDom = document.querySelector(auxDomInp)
	const auxArrData = auxArrGrupo[0].map( (ele) => {
		return [{p1nombre: ele.p1.nombre, p2nombre: ele.p2.nombre}]
	})


	const auxVista = auxArrData.reduce( (acc, ele, i) => {
		return acc + auxCrearTabla(ele, 'tbCombate', `Combate: ${i+1}`)
	},'')
	auxDom.innerHTML = auxVista
}

function verTorneo(id){

	const auxTorneo = lsTorneos.find(ele => ele.id == id )
	console.log(auxTorneo)
}

function editarTorneo(id){
	const auxTorneo = lsTorneos.find(ele => ele.id == id )
	const auxArrGrupos = auxTorneo.participantes.map( ele => {return {nombre: ele.nombre, escuela: ele.escuela}} )
	let Grupos = []
	const auxTemplate = `

		<div id="divEditarTorneoSup">
			<section id="secEditarTorneoInfo">
				
			  <form id="formEditarTorneo">
				<div class="parInpt">
					<label for="inpTorneoNombre">Nombre del Torneo: </label>
					<input id="inpTorneoNombre" placeholder="Nombre" value="${auxTorneo.nombreTorneo}" />
				</div>

				<div class="parInpt">
					<label for="inpTamanoGrupo">Tamaño de Grupo: </label>
					<input type="number" id="inpTorneoTamanoGrupo" placeholder="Tamaño del Grupo" value=${auxTorneo.tamGrupo} />
				</div>

				<div class="parBtnAceCan">
				 <button type="button" class="btnCancelar">Cancelar</button>
				 <button type="button" id="btnEditarTorneoAceptar" class="btnAceptar" auxid="${auxTorneo.id}">Aceptar</button>
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

	if(auxTorneo.participantes[0]){ // Mostrar Tabla Participantes
	document.querySelector('#secEditarTorneoLsParticipantes').innerHTML = auxCrearTabla(auxTorneo.participantes, 'tblEditarTorneoParticipantes', 'Lista de Participantes:', Object.keys(auxTorneo.participantes[0]))
	}

	if(auxTorneo.grupos[0]){
		crearTablaGrupos('#secEditarTorneoLsGrupos', 'classClickCombates', auxTorneo.grupos)
	} // Mostrar Tabla Grupos
	
	// -------------- Agregar fnBotones

	
	document.querySelector('#btnEditarTorneoAceptar').addEventListener('click', () => fnAuxAddEditarTorneoFunctions(auxTorneo.id)) //botonAceptarInfo
	
	document.querySelector('#btnEditTorneoAddParticipante').addEventListener('click', () => fnAddParticipante(auxTorneo.id))

	document.querySelector('#btnOrganizarGrupos').addEventListener('click', ()=>{
	grupos = fnAsignarGrupos([...auxArrGrupos], auxTorneo.tamGrupo)
		crearTablaGrupos('#secEditarTorneoLsGrupos', 'classClickCombates', grupos)

	auxTorneo.combates = grupos.map( ele => {
		return fnCombatesGrupos(ele)
	})

	 // auxTorneo.combates.map( ele => {console.log(ele); verTodosCombatesGrupo(ele , '#secEditarTorneoLsCombates')})
	 verTodosCombatesGrupo(auxTorneo.combates, '#secEditarTorneoLsCombates')


	}) // btnOrganizarGrupos


	document.querySelector('#btnOrganizarCombates').addEventListener('click', () => {
	console.log(auxTorneo)
	auxTorneo.combates = fnCombatesGrupos([...auxTorneo.grupos])
	verCombatesGrupo(auxTorneo.combates, '#secEditarTorneoLsGrupos')
	})

	document.querySelector('#btnGruposAceptar').addEventListener('click', (() => {auxTorneo.grupos = grupos}))

	document.querySelector('#btnCombatesAceptar').addEventListener('click', () => console.log('guardar'))

}


const fnAsignarGrupos = (inpArrParticipantes, tamGrupo) => { 
	const lsGrupos = []
	lsGrupos.push([])
	const auxTamGrupo = Math.trunc(inpArrParticipantes.length / tamGrupo)
	for(let i = 1; i < auxTamGrupo; i++){ 
		lsGrupos.push([])
	}
	
	for(let i = inpArrParticipantes.length; i > 0 ; i--){
	const partElegido = inpArrParticipantes[Math.floor(Math.random()*i)]

	const auxIgualEscuela = lsGrupos.map( // map array de disponibles

		function (eleGrupo){
			 if(eleGrupo.length >= tamGrupo){ 
			return tamGrupo } 
			return eleGrupo.reduce( (acc, elePart) => { // reduce numero
				if(elePart.escuela == partElegido.escuela){
					return acc + 1
					} else {
					return acc + 0}
			},0)
		})

	const indexGrupo = auxIgualEscuela.indexOf(Math.min(...auxIgualEscuela))

	lsGrupos.forEach( ele => {
		if(ele.find(ele2 => {ele2.escuela == partElegido.escuela})
		){
			lsGrupos[i+1].push(lsGrupos[i].pop())
		}
	})
	/* if(lsGrupos[indexGrupo].length > tamGrupo){// condicionales para asignar grupo
	lsGrupos[indexGrupo + 1].push(partElegido)} else{
	lsGrupos[indexGrupo].push(partElegido)
	} 
	*/
	lsGrupos[indexGrupo].push(partElegido)


	inpArrParticipantes.splice(inpArrParticipantes.indexOf(partElegido),1)
	}

	return lsGrupos
	}


	// Render lsGrupos

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


	const crearTablaGrupos = (nombreVista, auxClassJs, lsG, auxFnListener) => {
		const auxDom = document.querySelector(nombreVista)

		const auxVista = lsG.reduce( (acc, ele, i) => {
			return acc + auxCrearTabla(ele, auxClassJs, `Grupo: ${i+1}`, ['nombre', 'escuela'])
		},'')

		auxDom.innerHTML = auxVista
		
		//fnAuxAddEventLs(auxClassJs, auxFnListener, 'click')
  }


function fnCombatesGrupos(inpArray) {
	/*const inpArray = [
	 {nombre: 'paco', grupo: 1, escuela: 'krigerskole', puntos: 25},
	 {nombre: 'Armin', grupo: 1, escuela: 'krigerskole', puntos: 5},
	 {nombre: 'Rex', grupo: 1, escuela: 'krigerskole', puntos: 2},
	 {nombre: 'Rafa', grupo: 1, escuela: 'krigerskole', puntos: 9},
	 {nombre: 'Pana1', grupo: 1, escuela: 'krigerskole', puntos: 15},
	a]*/
	const inpArray2 = [...inpArray]
	const auxResArrayObj = inpArray.reduce( (acc, iteParticipante, i, inpArray) => {
		inpArray2.shift()

		const combatesParticipante = inpArray2.reduce( (acc2, iteP2) => {
			acc2.push({p1:iteParticipante, p2: iteP2})
			return acc2
		},[])
		
		 acc.push(combatesParticipante)
		 return acc
		}, [])

		return auxResArrayObj.flat()
}
function verTorneos(arrTorneos){
	
	const auxDom = document.querySelector('#idVistaCentral')
	const auxDataArr = arrTorneos.map( (ele, i,) => {
		return {id: ele.id, nombre: ele.nombreTorneo, estado: ele.estado, editar: `<button type="button" class="btnEditTorneo" auxIdEditTor="${ele.id}">Editar</button>`, ver:`<button type="button" class="btnVerTorneo" auxIdVerTor="${ele.id}">Ver</button>`, }
	})

	const auxVista = auxCrearTabla(auxDataArr,`tbTorneos`, 'Torneos', ['id', 'nombre', 'estado', 'Editar', 'ver'], )

	auxDom.innerHTML = auxVista
	
	document.querySelectorAll('.btnEditTorneo').forEach( 
	ele => {
		ele.addEventListener('click', event => editarTorneo( event.target.getAttribute('auxidedittor') )) 
		})


	document.querySelectorAll('.btnVerTorneo').forEach( 
	ele => {
		ele.addEventListener('click', event => verTorneo( event.target.getAttribute('auxidvertor') )) 
		})
}

// asignar acciones al DOM
document.querySelector('#btnCrearTor').addEventListener('click',()=> fnBtnCrearTorneo())

document.querySelector('#btnVerTor').addEventListener('click', ()=>verTorneos(lsTorneos))

document.querySelector('#btnAddParticipante').addEventListener('click', ()=> btnAddParticipante())

document.querySelector('#btnCrVerGrupos').addEventListener('click',()=>
		crearTablaGrupos('#idVistaCentral', 'classClickCombates', fnAsignarGrupos([...participantesGenericos], lsTorneos[0].tamGrupo))
)


document.querySelector('#btnCrVerCombates').addEventListener('click', ()=> verCombatesGrupo())


window.onload = () =>{
	verTorneos(lsTorneos)
}
