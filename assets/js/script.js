let listaNombreGastos = []
let listaValoresGastos = []
let listaDescripcionGastos = []
let indiceEditar = -1 // Indica si estamos en modo edición


function clickBoton(){
    let nombreGasto =  document.getElementById('nombreGasto').value
    let valorGasto = document.getElementById('valorGasto').value
    let descripcionGasto = document.getElementById("descripcionGasto").value


    // Si estamos en modo de edición, actualizamos el gasto
    if (indiceEditar >= 0) {
        listaNombreGastos[indiceEditar] = nombreGasto
        listaValoresGastos[indiceEditar] = valorGasto
        listaDescripcionGastos[indiceEditar] = descripcionGasto
        indiceEditar = -1; // Salimos del modo edición
    } else {
        listaNombreGastos.push(nombreGasto)
        listaValoresGastos.push(valorGasto)
        listaDescripcionGastos.push(descripcionGasto)
    }

    if(valorGasto> 150.00){
        alert("¡Precaución!: Se ha generado un gasto mayor a 150 USD")
    }

    actualizarListaGasto()
}

function actualizarListaGasto(){
    const listaElementos = document.getElementById('listaDeGastos')
    const totalElementos = document.getElementById('totalGastos')
    let htmlLista = ''
    let totalGastos = 0
    listaNombreGastos.forEach((elemento,posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion])
        const descripcionGasto = listaDescripcionGastos[posicion];
        

        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} - - ${descripcionGasto}
        <button onclick="modificarGasto(${posicion});">Modificar</button>
        <button onclick="eliminarGasto(${posicion});">Eliminar</button>
        </li>`
        
        
        //Se calcula el total de los gastos
        totalGastos += Number(valorGasto)
    });

    // Para mostrar los valores en el HTML
    listaElementos.innerHTML= htmlLista
    totalElementos.innerHTML = totalGastos.toFixed(2)
    limpiar()
}

function limpiar(){
    document.getElementById('nombreGasto').value =''
    document.getElementById('descripcionGasto').value =''
    document.getElementById('valorGasto').value =''
}

function eliminarGasto(posicion){
    listaNombreGastos.splice(posicion, 1)
    listaValoresGastos.splice(posicion, 1)

    actualizarListaGasto()
}
function modificarGasto(posicion) {
    // Cargamos el gasto seleccionado en los campos de entrada
    document.getElementById('nombreGasto').value = listaNombreGastos[posicion]
    document.getElementById('valorGasto').value = listaValoresGastos[posicion]
    document.getElementById('descripcionGasto').value = listaDescripcionGastos[posicion]

    // Cambiamos a modo edición, guardando el índice del gasto que se está editando
    indiceEditar = posicion
}
