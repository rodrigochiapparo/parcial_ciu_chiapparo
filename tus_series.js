const modalCreado = document.getElementById('creacionModal');

let indexOfTable = 6;


function funcionPorcentaje(temporadas,cantidad){
    return ((cantidad * 100)/temporadas).toFixed(2) + '%';
}

var table = document.querySelector("#tabla");

for ( var i = 1 , row; row = table.rows[i]; i++){

    var temporadas = row.cells[2].innerHTML
    var cantidad = row.cells[3].innerHTML;
    row.cells[4].innerHTML = funcionPorcentaje(temporadas,cantidad) 
}

//Sumar temporada
function sumarTemporada(event, cantidad){
    const temporadas = parseInt(event.cells[2].innerHTML)
    const cantTempo = parseInt(event.cells[3].innerHTML)
    var porcentaje = parseInt(event.cells[4].innerHTML)
  

    if (parseInt(event.cells[3].innerHTML) < parseInt(event.cells[2].innerHTML)){

        event.cells[3].innerHTML = parseInt(event.cells[3].innerHTML) + cantidad
        event.cells[4].innerHTML = (parseInt(event.cells[3].innerHTML) * 100) / parseInt(event.cells[2].innerHTML)

    }

}
//Restar temporada
function restarTemporada(event, cantidad){
    const temporadas = parseInt(event.cells[2].innerHTML)
    const cantTempo = parseInt(event.cells[3].innerHTML)
    var porcentaje = parseInt(event.cells[4].innerHTML)
  

    if (parseInt(event.cells[3].innerHTML) > 0){

        event.cells[3].innerHTML = parseInt(event.cells[3].innerHTML) - cantidad
        event.cells[4].innerHTML = (parseInt(event.cells[3].innerHTML) * 100) / parseInt(event.cells[2].innerHTML)

    }

}
//buscador

function buscarSerie()
{
    const tableReg = document.getElementById('tabla');
    const searchText = document.getElementById('searchTerm').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            
            tableReg.rows[i].style.display = 'none';
        }
    }


}

//MODAL
const botonNueva = document.getElementById("botonNueva");

modalCreado.addEventListener('show.bs.modal', function (event) {
    const serieName = document.getElementById(`nombreSeries`);
    const temporadaCant = document.getElementById(`cantidadTemporadas`);
    const temporadaViews = document.getElementById(`seriesVistas`);
    serieName.value = "";
    temporadaCant.value = "";
    temporadaViews.value ="";
})



function agregarSerie() {

    const table = document.getElementById('tabla');

    const nameSerie = document.getElementById('nombreSeries');
    const serieSeasons = document.getElementById('cantidadTemporadas');
    const serieVistas = document.getElementById('seriesVistas');
    
    if( (nameSerie.value.trim() !== "" && parseFloat(serieSeasons.value) > 0)
     && parseFloat(serieSeasons.value) >= parseFloat(serieVistas.value)
     && (parseFloat(serieSeasons.value) >= 0) && (parseFloat(serieVistas.value) >= 0))
    {
        table.innerHTML += `
        <tr id="tr${indexOfTable}"  >
            <td></td>
            <td id="nombreSerie">${nameSerie.value}</td>
            <td id="temp" >${parseInt(serieSeasons.value)}</td>
            <td id="cant">${parseInt(serieVistas.value)}</td>
            <td id ="porcentaje">${funcionPorcentaje(parseInt(serieSeasons.value),parseInt(serieVistas.value))}</td>
            <td><button type="button" onclick="sumarTemporada(tr${indexOfTable}, 1)" class="btn btn-primary">Sumar temporada</button>   <button type="button" onclick="restarTemporada(tr${indexOfTable}, 1)"class="btn btn-warning">Restar temporada</button></td>       
        </tr>
        `
        indexOfTable +=1;
    } 
    else if (parseFloat(serieSeasons.value) < parseFloat(serieVistas.value)){
        alert("Las temporadas vistas no pueden ser mayor a las temporadas")
    }
    else if ((parseFloat(serieSeasons.value) < 0) && (parseFloat(serieVistas.value) < 0)){
        alert("No se pueden poner numero negativos")

    }
    else 
    { 
        alert("Falta el nombre de la serie o la cantidad de temporadas") 
    }
}


//SELECCIONAR LA FILA
var filaSeleccionada = document.querySelector(".filaSeleccionada")

var seleccionar = function(){
    for(let i = 1; i < table.rows.length; i++){
        table.rows[i].addEventListener("click", function(){
            if(filaSeleccionada != null){
                filaSeleccionada.classList.remove("filaSeleccionada")
            }

            table.rows[i].classList.toggle("filaSeleccionada")
            filaSeleccionada = table.rows[i]
            
        })
    }
}

table.addEventListener("click", seleccionar)

const botonAceptar= document.getElementById("botonAceptar");

//BOTON EDITAR SERIE DE MODEL
botonAceptar.addEventListener("click", function(){
    validarDatosYEditarlos();
})

function cargarDatosEditar(){
    
    if (filaSeleccionada != undefined)
    {
        var nombreSerieEditar = document.getElementById("nombreSeriesEditar");
        var temporadas = document.getElementById("cantidadTemporadasEditar");
        var temporadasVistas = document.getElementById("seriesVistasEditar");
        var celdasFilaSelecc = filaSeleccionada.querySelectorAll("td");
        nombreSerieEditar.value = celdasFilaSelecc[1].textContent;
        temporadas.value = celdasFilaSelecc[2].textContent;
        temporadasVistas.value = celdasFilaSelecc[3].textContent;
    }

}

function validarDatosYEditarlos(){

    if (filaSeleccionada == undefined)
    {
        alert('Debe seleccionar una serie para modificarla')
        return 
    }
    else
    {
        var nombreSerie = document.getElementById("nombreSeriesEditar").value;
        var temporadas = parseInt(document.getElementById("cantidadTemporadasEditar").value);
        var temporadasVistas = parseInt(document.getElementById("seriesVistasEditar").value);
        
        if (isNaN(temporadas) || isNaN(temporadasVistas)){
            alert("Las temporadas tienen que ser un numero..")
            return false
        } else if (nombreSerie == "" || temporadas == "" || temporadasVistas == ""){
            alert("Tenes que llenar todos los campos..")
            return false
        } else if (temporadas < 0 || temporadasVistas < 0 ) {
            alert("El numero de las temporadas tienen que ser mayor a cero")
            return false
        } else if (temporadasVistas > temporadas){
            alert("Las temporadas vistas no pueden ser mayor al número de temporadas")
            return filaSeleccionada
        } else if(filaSeleccionada == null){
            alert("No seleccionaste ninguna serie..")
        } else{
            editarSerie(nombreSerie, temporadas, temporadasVistas)
        }
    }
}


function editarSerie(nombre, temporadas, vistas){
   
    var celdasFilaSelecc = filaSeleccionada.querySelectorAll("td");

    celdasFilaSelecc[1].textContent = nombre
    celdasFilaSelecc[2].textContent = temporadas
    celdasFilaSelecc[3].textContent = vistas

    celdasFilaSelecc[4].textContent = funcionPorcentaje(temporadas,vistas) + "%"
    
}


