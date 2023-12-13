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


	const addParticipante = (auxIdTorneo)=> {
		
	console.log(auxIdTorneo)
		const auxNombrePart = document.querySelector('#inpParticipanteNombre').value
		const escuela = document.querySelector('input[name="escuela"]:checked').value

		const dataParticipante = { nombre: auxNombrePart , escuela: escuela, puntos: 0, dobles: 0, ganados: 0, perdidos: 0 }
		console.log(dataParticipante)

		const resFetch = fetchMain.addParticipante(auxIdTorneo, dataParticipante)
		console.log(resFetch)

return
		if(auxIdTorneo || (auxIdTorneo == 0)){
			const auxIndex = lsTorneos.findIndex( ({id}) => id == auxIdTorneo )
			lsTorneos[auxIndex].participantes.push(auxDataParticipante)


		document.querySelector('#secEditarTorneoLsParticipantes').innerHTML = auxCrearTabla(lsTorneos[auxIndex].participantes, 'tblEditarTorneoParticipantes', 'Lista de Participantes:', Object.keys(lsTorneos[auxIndex].participantes[0]))
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
	auxDivDom.classList.add('pAccionCombate')
	const auxTexto = document.createTextNode(strHistorial)

	const auxBtnEliminar = document.createElement('button')
	auxBtnEliminar.setAttribute('type', 'button')
	auxBtnEliminar.classList.add('btnEliminarAccionCombate')
	auxBtnEliminar.setAttribute('value', parseInt(valorPunto))
	auxBtnEliminar.innerHTML = 'X'

	auxDivDom.appendChild(auxTexto)
	auxDivDom.appendChild(auxBtnEliminar)
	domHistorial.appendChild(auxDivDom)

	auxBtnEliminar.addEventListener('click', () => { 
		const puntajeActualizado = parseInt(pPuntaje.getAttribute('value')) - parseInt(auxBtnEliminar.value)
		pPuntaje.innerText = puntajeActualizado 
		pPuntaje.setAttribute('value',  puntajeActualizado)
		auxDivDom.remove() 
	} )
}

const guardarCombate = () => {
	const puntajeP1 = document.querySelector('pPuntajeP1')
	const puntajeP2 = document.querySelector('pPuntajeP2')
	const arrDomHistorial = document.querySelectorAll('.pAccionCombate')
	const arrHistorial = arrDomHistorial.map( ele => ele.innerText )

}

const logicaMain = {
	auxCrearTabla,
	addParticipante,
	asignarGrupos,
	crearTablaGrupos,
	combatesGrupos,
	verTodosCombatesGrupo,
	timerCombate,
	addPuntajeCombate
}

export default logicaMain



