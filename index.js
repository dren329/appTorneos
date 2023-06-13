const participantesGenericos = [
 { nombre: "Paco", escuela: "Krigerskole" },
 { nombre: "Jose", escuela: "Krigeskole" },
 { nombre: "Juanca", escuela: "Krigeskole" },
 { nombre: "Alexis", escuela: "Krigeskole" },
 { nombre: "Juan", escuela: "Krigeskole" },
 { nombre: "Yadira", escuela: "Krigeskole" },
 { nombre: "Rafael", escuela: "Krigeskole" },
 { nombre: "Chava", escuela: "Krigeskole" },
 { nombre: "Armin", escuela: "Krigeskole" },

 { nombre: "Ana Tavera", escuela: "Scorpius" },
 { nombre: "Adrian Escorcia", escuela: "Scorpius" },
 { nombre: "Scorpius3", escuela: "Scorpius" },
 { nombre: "Scorpius4", escuela: "Scorpius" },
 { nombre: "Scorpius5", escuela: "Scorpius" },
 { nombre: "Scorpius6", escuela: "Scorpius" },
 { nombre: "Scorpius7", escuela: "Scorpius" },
 { nombre: "Scorpius8", escuela: "Scorpius" },
 { nombre: "ArturoLion", escuela: "Lion's Knights" },

 { nombre: "Rex", escuela: "Lion's Knights" },
 { nombre: "Marisol", escuela: "Lion's Knights" },
 { nombre: "Lion4", escuela: "Lion's Knights" },
 { nombre: "Lion6", escuela: "Lion's Knights" },
 { nombre: "Lion7", escuela: "Lion's Knights" },
 { nombre: "Lion8", escuela: "Lion's Knights" },

 { nombre:"Roberto", escuela: "Charros" },
 { nombre:"Majejas", escuela: "Majejas" },
 { nombre:"Rodrigo", escuela: "Majejas" },
 { nombre:"Gaute", escuela: "Gautes" },
 { nombre:"LadyLuna", escuela: "Gautes" },
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
		 participantes: [...participantesGenericos],
		 grupos: [],
		 combates: [],
		},
		{
		 id: 2,
		 nombreTorneo: 'genTorneo3',
		 estado: 'En organizacion',
		 tamGrupo: 4,
		 participantes: [...participantesGenericos],
		 grupos: [],
		 combates: [],
		},
]
const tablaParticipantes = []
const tablaGrupos = []

const genKrigers = [

 { nombre: "Paco", escuela: "Krigerskole" },
 { nombre: "Jose", escuela: "Krigeskole" },
 { nombre: "Juanca", escuela: "Krigeskole" },
 { nombre: "Alexis", escuela: "Krigeskole" },
 { nombre: "Juan", escuela: "Krigeskole" },
 { nombre: "Yadira", escuela: "Krigeskole" },
 { nombre: "Rafael", escuela: "Krigeskole" },
 { nombre: "Chava", escuela: "Krigeskole" },
 { nombre: "Armin", escuela: "Krigeskole" },
]

const genScorpius= [
 { nombre: "Ana Tavera", escuela: "Scorpius" },
 { nombre: "Adrian Escorcia", escuela: "Scorpius" },
 { nombre: "Scorpius3", escuela: "Scorpius" },
 { nombre: "Scorpius4", escuela: "Scorpius" },
 { nombre: "Scorpius5", escuela: "Scorpius" },
 { nombre: "Scorpius6", escuela: "Scorpius" },
 { nombre: "Scorpius7", escuela: "Scorpius" },
 { nombre: "Scorpius8", escuela: "Scorpius" },
]

const genLions= [
 { nombre: "ArturoLion", escuela: "Lion's Knights" },
 { nombre: "Rex", escuela: "Lion's Knights" },
 { nombre: "Marisol", escuela: "Lion's Knights" },
 { nombre: "Lion4", escuela: "Lion's Knights" },
 { nombre: "Lion6", escuela: "Lion's Knights" },
 { nombre: "Lion7", escuela: "Lion's Knights" },
 { nombre: "Lion8", escuela: "Lion's Knights" },
]

const genOtros = [
	{ nombre:"Roberto", escuela: "Charros" },
	{ nombre:"Majejas", escuela: "Majejas" },
	{ nombre:"Rodrigo", escuela: "Majejas" },
	{ nombre:"Gaute", escuela: "Gautes" },
	{ nombre:"LadyLuna", escuela: "Gautes" },
]
genKrigers.forEach(e => tablaParticipantes.push(e))
genScorpius.forEach(e => tablaParticipantes.push(e))
genLions.forEach(e => tablaParticipantes.push(e))
genOtros.forEach(e => tablaParticipantes.push(e))

// funciones auxiliares para crear DOM
/*
function fnAuxAddEventLs(auxClassJs, auxFnListener, auxTipoEvento) {
	
	const auxDomListener = document.getElementsByClassName(auxClassJs)
	Array.from(auxDomListener).forEach(ele => {

	 ele.addEventListener(auxTipoEvento, auxFnListener(event))
	})
}
*/



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


//crearTorneo('genTorneo', participantesGenericos)//

function verCombatesGrupo(event) {

	const auxDom = document.querySelector('#idVistaCentral')
	const auxArrData = fnCombatesGrupos().map( (ele) => {
		return [{p1nombre: ele.p1.nombre, p2nombre: ele.p2.nombre}]
	})


	const auxVista = auxArrData.reduce( (acc, ele, i) => {
		return acc + auxCrearTabla(ele, 'tbCombate', `Combate: ${i+1}`)
	},'')
	auxDom.innerHTML = auxVista
}

function editarTorneo(id){

	const auxTorneo = lsTorneos.find(ele => ele.id == id )
	console.log(auxTorneo)
}

function verTorneo(id){

	const auxTorneo = lsTorneos.find(ele => ele.id == id )
	console.log(auxTorneo)
}
const fnTamanoGrupos = function(numPartici = (tablaParticipantes.length), tamGrupo = 4) {
	return (Math.trunc(numPartici / tamGrupo))
	}
const fnAsignarGrupos = (inpArrParticipantes, tamGrupo) => { 
	const lsGrupos = []
	lsGrupos.push([])
	for(let i = 1; i < fnTamanoGrupos(); i++){ 
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
	/* if(lsGrupos[indexGrupo].length > tamGrupo){// condicionales para asignar grupo
	lsGrupos[indexGrupo + 1].push(partElegido)} else{
	lsGrupos[indexGrupo].push(partElegido)
	} */
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


function fnCombatesGrupos() {
	const inpArray = [
	 {nombre: 'paco', grupo: 1, escuela: 'krigerskole', puntos: 25},
	 {nombre: 'Armin', grupo: 1, escuela: 'krigerskole', puntos: 5},
	 {nombre: 'Rex', grupo: 1, escuela: 'krigerskole', puntos: 2},
	 {nombre: 'Rafa', grupo: 1, escuela: 'krigerskole', puntos: 9},
	 {nombre: 'Pana1', grupo: 1, escuela: 'krigerskole', puntos: 15},
	]
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

document.querySelector('#btnCrVerGrupos').addEventListener('click',()=>
		crearTablaGrupos('#idVistaCentral', 'classClickCombates', fnAsignarGrupos([...participantesGenericos], lsTorneos[0].tamGrupo), verCombatesGrupo)
)


document.querySelector('#btnCrVerCombates').addEventListener('click', ()=> verCombatesGrupo())


window.onload = () =>{
	verTorneos(lsTorneos)
}
