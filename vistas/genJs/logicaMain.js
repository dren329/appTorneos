import fetchMain from "./fetchMain.js"

const	auxCrearTr = (inpDataObj) => {
		 const datosObjeto = Object.values(inpDataObj);
		 let auxId =  ''
		 if(inpDataObj.id){ auxId = inpDataObj.id.toString();}
		 return datosObjeto.reduce( (accStr, ele) => {
				 return accStr + `<td  class="tdViewClass">` + ele + '</td>'
			  },`<tr auxId = ${ + auxId} class=" trViewClass">` ) + '</tr>';
}



const auxCrearTabla = (inpArr, auxClassJs = '',inpCaption = '', inpArrTitulo = []) => {

		 const auxTbTitulo = inpArrTitulo.reduce( (accStr, ele) => {
				 return accStr + `<th class="tdViewClass">` + ele + '</th>'
			  },'<thead class="theadViewClass"><tr>' ) + '</tr></thead>';
		return inpArr.reduce( (accStr, ele) => {
			return accStr + auxCrearTr(ele)
		},` <table class="tableViewClass ${auxClassJs}"><caption>${inpCaption}</caption>${auxTbTitulo}<tbody class="tbodyViewClass">` ) + '</tbody></table>';
		
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
			acc2.push({p1:iteParticipante, p2: iteP2})
			return acc2
		},[])
		
		 acc.push(combatesParticipante)
		 return acc
		}, [])

		return auxResArrayObj.flat()
}



const verTodosCombatesGrupo = (auxArrGrupos, auxDomInp = '#idVistaCentral') => {
const auxDom = document.querySelector(auxDomInp)

const auxVista = auxArrGrupos.reduce( (tablaFinal, grupo, i) =>{

	const tablaGrupo = grupo.reduce( ( accTablaGrupo, combate, ic) =>{

		const auxObjToArr = [
			{p1: combate.p1.nombre, p1puntos:1, p1dobles:2},
			{p2: combate.p2.nombre, p2puntos:0, p2dobles:2}
		]

		accTablaGrupo.push({tb: auxCrearTabla(auxObjToArr, 'tbCombate', '',['Nombre', 'puntos', 'dobles'] )})

		return accTablaGrupo
	}, [])

	return tablaFinal + auxCrearTabla(tablaGrupo, 'tbGrupo', `Grupo: ${i+1}`)
}, '')

	auxDom.innerHTML = auxVista 
}

const logicaMain = {
	auxCrearTabla,
	addParticipante,
	asignarGrupos,
	crearTablaGrupos,
	combatesGrupos,
	verTodosCombatesGrupo
}

export default logicaMain



