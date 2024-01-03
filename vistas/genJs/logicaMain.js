import fetchMain from "./fetchMain.js"

const	auxCrearTr = (inpDataObj) => {
		 const datosObjeto = Object.values(inpDataObj);
		 let auxId =  ''
		 return datosObjeto.reduce( (accStr, ele) => {
				 return accStr + `<td  class="tdViewClass">` + ele + '</td>'
			  },`<tr  class=" trViewClass">` ) + '</tr>';
}



const auxCrearTabla = (inpArr, auxClassJs = '',inpCaption = '', inpArrTitulo = [], auxAttrs) => {

		 const auxTbTitulo = inpArrTitulo.reduce( (accStr, ele) => {
				 return accStr + `<th class="tdViewClass">` + ele + '</th>'
			  },'<thead class="theadViewClass"><tr>' ) + '</tr></thead>';
		return inpArr.reduce( (accStr, ele) => {
			return accStr + auxCrearTr(ele)
		},` <table class="tableViewClass ${auxClassJs}" ${auxAttrs}><caption>${inpCaption}</caption>${auxTbTitulo}<tbody class="tbodyViewClass">` ) + '</tbody></table>';
		
	}

// ---------------- logicaParticipantes


const addParticipante = async () => {
	const idRef = event.currentTarget.idRef
	const addTarget = event.currentTarget.referencia
	let response = null
    
    const auxNombrePart = document.querySelector('#inpParticipanteNombre').value
    let escuela = document.querySelector('input[name="escuela"]:checked').value

	if(!escuela){
		escuela = document.querySelector('#inpOtraEscuela').value

     	}

    const dataParticipante = { nombre: auxNombrePart , escuela: escuela, puntos: 0, dobles: 0, ganados: 0, perdidos: 0 }

	if(addTarget === 'evento'){
		response =  await fetchMain.addParticipanteEvento(idRef, dataParticipante)
	}

	if(addTarget === 'torneo'){
		response = await fetchMain.addParticipanteTorneo(idRef, dataParticipante)
	}
    console.log(response)

}	

function renderAddParticipante(idEvento){
	
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
				 	<fieldset class="fieldset divChecksTorneos"></fieldset>
				 </div>

				 <div class="parBtnAceCan">
				  <button type="button" class="btnCancelar">Cancelar</button>
				  <button type="button" id="btnAddParticipanteAceptar" class="btnAceptar">Aceptar</button>
				 </div>
				</form>

			</section>

			<br/>
			<br/>
			<br/>
				 <div class="divChecks">
				 	<p>ParticipantesGenericosPrueba: </p>
				 	<fieldset class="fieldset divChecksTorneos"></fieldset>
				 </div>
	`
	document.querySelector('#divAddParticipanteEvento').innerHTML = auxTemplate

	const btnAddParticipante = document.querySelector('#btnAddParticipanteAceptar')
	btnAddParticipante.idRef = idEvento
	btnAddParticipante.referencia = 'evento'
	btnAddParticipante.addEventListener('click', addParticipante )
}

// ---------------- logicaTorneos


const renderTorneoCreado = async ( paramCreadoTorneo ) => {
	const creadoTorneo = await paramCreadoTorneo
	const divRenderTorneos = document.querySelector('#divTorneosCreados')
	const torneosCreados = Array.from( document.querySelectorAll('.pTorneoCreado') )

	const domChecksAddParticipante = Array.from(document.querySelectorAll('.divChecksTorneos'))

	const auxPVista = (refTorneo) => `<p class="pTorneoCreado" auxid="${refTorneo.id}" > ${refTorneo.nombre} </p>`
	const fnTorneoCheckbox = (refTorneo, i, ii) => `
		  <div class="parInpCheckbox">
			  <label for="inpCheck${i}Torneo${ii}">
			  <input type="checkbox" id="inpCheck${i}Torneo${ii}" name="addParticipanteTorneo" value="${refTorneo.id}"/>${refTorneo.nombre} 
			  </label>

		  </div>
	`

	if(torneosCreados.length == 0 ){
		const auxVista = auxPVista(creadoTorneo)
		divRenderTorneos.innerHTML = auxVista
		domChecksAddParticipante.forEach( (ele,i) => ele.innerHTML = fnTorneoCheckbox(creadoTorneo, i, 0))
	}

	if( torneosCreados.length > 0 ){
		const arrayObjTorneo = torneosCreados.map( ite => {
			const objTorneo = {
				id: ite.getAttribute('auxid').toString(),
				nombre: ite.innerText
			}
			return objTorneo
		})

		 const reduceVistaTorneos = arrayObjTorneo.reduce(
			 (acc, ite) => {
				return acc.concat( auxPVista(ite) )
			 }
		 ,'')

		 const reduceVistaAddParticipanteChecks = (iteParam) => { return arrayObjTorneo.reduce( 
		 	(acc, ite, i) => {
				return acc.concat(fnTorneoCheckbox(ite, iteParam, i))
			}
		 ,'<legend>Seleccionar Torneos: </legend>') }

		 const auxVista = reduceVistaTorneos + auxPVista(creadoTorneo)

		 divRenderTorneos.innerHTML = auxVista
		 domChecksAddParticipante.forEach( (ele, i) => ele.innerHTML = reduceVistaAddParticipanteChecks(i) + fnTorneoCheckbox(creadoTorneo, i, arrayObjTorneo.length) )
		}
}
 
function crearTorneo(e){
	const refEvento = e.currentTarget.idEvento
	const auxDomAddP = document.querySelector('#divAddParticipanteEvento')
	
	const formTorneo = document.querySelector('#formCrearTorneo')
	formTorneo.onsubmit = async (e) => {
		e.preventDefault()

		const nombreTorneo = document.querySelector('#nombreTorneo').value
		const numeroParticipantes = document.querySelector('#numeroParticipantes').value
		const tamGrupo = document.querySelector('#tamGrupo').value
		
		const dataTorneo = {
			refEvento,
			nombreTorneo,
			numeroParticipantes,
			tamGrupo,
		}
		const resTorneo = fetchMain.crearTorneo(dataTorneo)

		formTorneo.reset()

		renderTorneoCreado(resTorneo)
		// renderAddParticipante(refEvento, resTorneo)
	}
}


function renderCrearTorneo(idEvento){
	const auxVista = `
		<section id="secCrearTorneo">
			<form id="formCrearTorneo">
			 <div class="parInpt">
				 <label for="nombreTorneo">Nombre del Torneo: </label>
				 <input id="nombreTorneo" name="nombreTorneo" placeholder="Nombre" required />
			 </div>

			 <div class="parInpt">
				 <label for="numeroParticipantes">Numero de participantes:  </label>
				 <input type="number" id="numeroParticipantes" name="numeroParticipantes" placeholder="# Participantes" required/>
			 </div>

			 <div class="parInpt">
				 <label for="tamGrupo">Tamaño de Grupo: </label>
				 <input type="number" id="tamGrupo" name="tamGrupo" placeholder="Tamaño del Grupo" required />
			 </div>

			 <div class="parBtnAceCan">
			  <button type="button" class="btnCancelar">Cancelar</button>
			  <button type="submit" id="btnAceptarCrearTorneo" class="btnAceptar">Aceptar</button>
			 </div>
			</form>

		</section>
	`
	document.querySelector('#divCrearTorneo').innerHTML = auxVista
	const auxAceptarBtn = document.querySelector('#btnAceptarCrearTorneo')
	auxAceptarBtn.idEvento = idEvento
	auxAceptarBtn.addEventListener('click', crearTorneo )
}

// ---------------- ctrEventos

const crearEvento = (event) => {
	const formEvento = document.querySelector('#formCrearEvento')
	formEvento.onsubmit = async (event) => {
		event.preventDefault()
		const nombreEvento = document.querySelector('#nombreEvento').value
		const fechaEvento = document.querySelector('#fechaEvento').value
		const sedeEvento = document.querySelector('#sedeEvento').value

		const objEvento = {
			eventoNombre: nombreEvento,
			eventoFecha: fechaEvento,
			eventoSede: sedeEvento
		}

		const resFetchEvento = await fetchMain.crearEvento(objEvento)
		
		renderCrearTorneo(resFetchEvento)
		renderAddParticipante(resFetchEvento)
	}

}

	const asignarGrupos = (inparrparticipantes, tamgrupo) => { 
		const lsgrupos = []
		lsgrupos.push([])
		const auxtamgrupo = Math.trunc(inparrparticipantes.length / tamgrupo)
		for(let i = 1; i < auxtamgrupo; i++){ 
			lsgrupos.push([])
		}
		
		for(let i = inparrparticipantes.length; i > 0 ; i--){
		const partelegido = inparrparticipantes[Math.floor(Math.random()*i)]

		const auxigualescuela = lsgrupos.map( // map array de disponibles

			function (elegrupo){
				 if(elegrupo.length >= tamgrupo){ 
				return tamgrupo } 
				return elegrupo.reduce( (acc, elepart) => { // reduce numero
					if(elepart.escuela == partelegido.escuela){
						return acc + 1
						} else {
						return acc + 0}
				},0)
			})

		const indexGrupo = auxigualescuela.indexOf(Math.min(...auxigualescuela))

		lsgrupos.forEach( ele => {
			if(ele.find(ele2 => {ele2.escuela == partelegido.escuela})
			){
				lsgrupos[i+1].push(lsgrupos[i].pop())
			}
		})
		/* if(lsGrupos[indexGrupo].length > tamGrupo){// condicionales para asignar grupo
		lsGrupos[indexGrupo + 1].push(partElegido)} else{
		lsGrupos[indexGrupo].push(partElegido)
		} 
		*/
		lsgrupos[indexGrupo].push(partelegido)


		inparrparticipantes.splice(inparrparticipantes.indexOf(partelegido),1)
		}

		return lsgrupos
	}


	const crearTablaGrupos = (nombreVista, auxClassJs, lsG, auxFnListener) => {
		const auxDom = document.querySelector(nombreVista)
		const fnauxGrupos = (auxArr) => auxArr.map( ele => { return {nombre: ele.nombre, escuela: ele.escuela} })
		const auxGrupos = lsG.map( ele => fnauxGrupos(ele) )  // [ fnauxGrupos(lsG[0]), fnauxGrupos(lsG[1])]
		const auxVista = auxGrupos.reduce( (acc, ele, i) => {
			return acc + auxCrearTabla(ele, auxClassJs, `Grupo: ${i+1}`, ['nombre', 'escuela'])
		},'')

		auxDom.innerHTML = auxVista
		
		//fnAuxAddEventLs(auxClassJs, auxFnListener, 'click')
  }



const combatesGrupos = (inpArray) => {
	const inpArray2 = [...inpArray]
	const auxResArrayObj = inpArray.reduce( (acc, iteParticipante, i, inpArray) => {
		inpArray2.shift()

		const combatesParticipante = inpArray2.reduce( (acc2, iteP2) => {
			acc2.push({
				participante1: iteParticipante.nombre,
				participante2: iteP2.nombre,
			})
			return acc2
		},[])
		
		 acc.push(combatesParticipante)
		 return acc
		}, [])

		return auxResArrayObj.flat()
}



const verTodosCombatesGrupo = (auxArrGrupos, idTorneo, auxDomInp = '#idVistaCentral', fnAuxVistaCombate) => {
const auxDom = document.querySelector(auxDomInp)

const auxVista = auxArrGrupos.reduce( (tablaFinal, grupo, i) =>{

	const tablaGrupo = grupo.reduce( ( accTablaGrupo, combate, ic) =>{
		const auxStrId = `auxid='${ combate._id }'`
		
		const auxObjToArr = [
			{p1: combate.participante1, p1puntos: combate.puntosP1, p1Dobles: combate.dobles},
			{p2: combate.participante2, p2puntos: combate.puntosP2, p2dobles: combate.dobles }
		]

		accTablaGrupo.push({tb: auxCrearTabla(auxObjToArr, 'tbCombate', '',['Nombre', 'puntos', 'dobles'], auxStrId )})

		return accTablaGrupo
	}, [])

	return tablaFinal + auxCrearTabla(tablaGrupo, 'tbGrupo', `Grupo: ${i+1}`)
}, '')

	auxDom.innerHTML = auxVista 

	const auxIrClickCombate = document.querySelectorAll('.tbCombate')
	auxIrClickCombate.forEach( ele =>{
		ele.addEventListener('click', event  => {fnAuxVistaCombate(idTorneo, event.currentTarget.getAttribute('auxid'))}  )
	})
}



const timerCombate = (btn) => {
	btn.remove()
console.log('aciutivadoTimer')
	let tiempo = 180
	let tiempoRestante = 0
	let intervalo
	const btnControl = document.querySelector("#btnTemporizador")
	btnControl.style.display = 'block'

	function vistaContador(auxTiempo){
		const minutos = Math.floor(auxTiempo/60)
		const segundos = auxTiempo % 60
		document.querySelector("#pTemporizador").textContent = `${minutos}:${segundos}`
	}

	// document.querySelector("#btnInicio").addEventListener('click', 
	function iniciar(event){
		intervalo = setInterval( function(){
			tiempo--
			
			if(tiempo === 0){ fin() }
			vistaContador(tiempo)
		}, 1000)

		btnControl.innerText = 'Pausar'
		btnControl.removeEventListener('click', iniciar)
		btnControl.addEventListener('click', pausar)
	}
	
	function pausar(event){
		clearInterval(intervalo)
		btnControl.innerText = 'Reanudar'
		btnControl.removeEventListener('click', pausar)
		btnControl.addEventListener('click', iniciar )
	}

	function fin(){ 
		clearInterval(intervalo)
		console.log('finalizado')
	}

	
	iniciar()
}

const addPuntajeCombate = (trg) => {
	const domHistorial = document.querySelector('#divListaHistorial')
	const strHistorial = trg.getAttribute('auxhistorial')
	const participante = trg.getAttribute('auxparticipante')
	const valorPunto = trg.value
	const pPuntaje = document.querySelector(`#pPuntos${participante}`)

	const puntajeToAdd = parseInt(pPuntaje.getAttribute('value')) + parseInt(valorPunto)
	pPuntaje.innerText = puntajeToAdd
	pPuntaje.setAttribute('value', puntajeToAdd)

	const auxDivDom = document.createElement('div')
	const auxPDom = document.createElement('p')
	auxPDom.classList.add('pAccionCombate')
	const auxTexto = document.createTextNode(strHistorial)
	auxPDom.appendChild(auxTexto)

	const auxBtnEliminar = document.createElement('button')
	auxBtnEliminar.setAttribute('type', 'button')
	auxBtnEliminar.classList.add('btnEliminarAccionCombate')
	auxBtnEliminar.setAttribute('value', parseInt(valorPunto))
	auxBtnEliminar.innerHTML = 'X'

	auxDivDom.appendChild(auxPDom)
	auxDivDom.appendChild(auxBtnEliminar)
	domHistorial.appendChild(auxDivDom)

	auxBtnEliminar.addEventListener('click', () => { 
		const puntajeActualizado = parseInt(pPuntaje.getAttribute('value')) - parseInt(auxBtnEliminar.value)
		pPuntaje.innerText = puntajeActualizado 
		pPuntaje.setAttribute('value',  puntajeActualizado)
		auxDivDom.remove() 
	} )
}

const guardarCombate = (paramObjCombate, idTorneo, idCombate) => {
	const objCombate = {}
	const puntajeP1 = parseInt(document.querySelector('#pPuntosP1').getAttribute('value') )
	const puntajeP2 = parseInt(document.querySelector('#pPuntosP2').getAttribute('value') )
	const arrDomHistorial = Array.from( document.querySelectorAll('.pAccionCombate') )
	const arrHistorial = arrDomHistorial.map( ele => ele.innerText )

	Object.assign(objCombate,
		paramObjCombate,
		{ puntosP1: puntajeP1 },
		{ puntosP2: puntajeP2 },
		{ historial: arrHistorial }
	)
	fetchMain.finalizarCombate(idTorneo, idCombate, objCombate)

}

const logicaMain = {
	auxCrearTabla,
	crearEvento,
	addParticipante,
	asignarGrupos,
	crearTablaGrupos,
	combatesGrupos,
	verTodosCombatesGrupo,
	timerCombate,
	addPuntajeCombate,
	guardarCombate,
}

export default logicaMain



