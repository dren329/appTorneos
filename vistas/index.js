import renderMain from "./genJs/renderMain.js"

// funciones auxiliares para crear DOM

// ------------------------ Asignar Funciones a DOM -----------

function fnEditarTorneoNombre(auxIdTorneo){
	const auxInp = document.querySelector('#nombreTorneo').value
	const torneo = lsTorneos.findIndex( ({id}) => {return id == auxIdTorneo})
	lsTorneos[torneo].nombreTorneo = auxInp
}

function fnEditarTorneoTamGrupo(auxIdTorneo){
	const auxInp = document.querySelector('#inpTorneoTamanoGrupo').value
	const torneo = lsTorneos.findIndex( ({id}) => {return id == auxIdTorneo})
	lsTorneos[torneo].tamGrupo = parseInt(auxInp)
}

function fnEditarTorneoFase(){}

function fnAuxAddEditarTorneoFunctions(auxIdTorneo){
	fnEditarTorneoNombre(auxIdTorneo)
	fnEditarTorneoTamGrupo(auxIdTorneo)
}


// Creacion de Torneos, estructuras

// -----------------------comFetch
async function fetchTorneo(idTorneo){
	const resTorneo = await fetch(`/verTorneo/${idTorneo}`)
	const  jsonTorneo = await resTorneo.json()
	return jsonTorneo
}

async function fetchTorneos(){
	const resTorneos = await fetch('/verTorneos')
	const lsTorneos = await resTorneos.json()
	return lsTorneos
}

async function fetchGuardarGrupos(idTorneo, prmGrupos){
	console.log(prmGrupos)
	if(!prmGrupos || ( prmGrupos == [] ) ){
		alert('Datos Vacios')
		return
	}
	const auxData = { grupos: prmGrupos };
	await fetch(`/editarTorneo/${idTorneo}`, {
		method:'PUT',
		body:JSON.stringify(auxData),
		headers: {
			'Content-Type': 'application/json'
		}
	})
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


// -------------------------------- asignar acciones al DOM
	//Crear evento

document.querySelector('#btnCrearEvento').addEventListener('click', ()=> renderMain.crearEvento() )
document.querySelector('#btnAddParticipante').addEventListener('click', ()=> btnAddParticipante() )


window.onload = () =>{
	renderMain.verEventos()
}
