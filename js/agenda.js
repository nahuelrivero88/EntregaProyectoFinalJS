// Array Horarios para agendar
const listaHorarios = [
    { deporte: "Futbol", dias: "Lunes, Miercoles, Viernes", horario1: "8:00", horario2: "9:00", horario3: "10:00" },
    { deporte: "Basketball", dias: "Martes y Jueves", horario1: "11:00", horario2: "12:00", horario3: "13:00" },
    { deporte: "Volleyball", dias: "Lunes y Jueves", horario1: "14:00", horario2: "15:00", horario3: "16:00" },
    { deporte: "Libre", dias: "Martes, Viernes y Sabados", horario1: "17:00", horario2: "18:00", horario3: "19:00" }
];

$('#deporteFutbol').append(`<b class="deporteSeleccionado">Futbol</b>`);
$('#deporteBasket').append(`<b class="deporteSeleccionado">Basketball</b>`);
$('#deporteVolley').append(`<b class="deporteSeleccionado">Volleyball</b>`);
$('#deporteLibre').append(`<b class="deporteSeleccionado">Libre</b>`);

// Filtro para Horarios
function filtrarHorario(horarioFiltrado) {
    let divHorario = $("#horarios");
    divHorario.html("");
    for (const listaHorario of horarioFiltrado) {

        divHorario.append(`
        <div>

        <b> Horarios para ${listaHorario.deporte}(${listaHorario.dias}): </b>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault10">
        <label class="form-check-label" for="flexRadioDefault10">${listaHorario.horario1}</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault20" checked>
        <label class="form-check-label" for="flexRadioDefault20">${listaHorario.horario2}</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault30" checked>
        <label class="form-check-label" for="flexRadioDefault30">${listaHorario.horario3}</label>
        </div>
        
        </div>
        `);
    }
}
//Función click al nombre del deporte
$(".deporteSeleccionado").click(function () {
    let deporte = $(this).html();
    let horarioFiltrado = listaHorarios.filter(p => p.deporte === deporte);

    filtrarHorario(horarioFiltrado);
})

// Boton Seleccionar Deporte
$('#listaDeportes').fadeOut();
let tocaBoton = false;
$('#botonDeportes').click(() => {
    if (tocaBoton)
        $('#listaDeportes').slideDown();
    else
        $('#listaDeportes').slideUp();
    tocaBoton = !tocaBoton;
});


// Validación Formulario
let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarForm);

let eventoValidado = false;
$('#noIngresoDias').append('<p style="color:red">Ingrese un día por favor</p>');

function validarForm(evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre");
    const dias = document.getElementById("dias");
    $('#noIngresoDias').hide();

    if (dias.value == 0){
        $('#noIngresoDias').show();
        return;
    }
    else {
        eventoValidado = true;
        $('#noIngresoDias').hide();
        $("#myModal").modal("hide");
        $('#horaAgendada').append(`<b>` + $('#nombre').val() + ` su horario ha sido agendado para el dia ` + $('#dias option:selected').text() + `.</b>`);
        borrarDatosIngresados();
    }
    // JSON
    const agenda1 = {
        cliente: nombre.value,
    };
    const enJSON = JSON.stringify(agenda1);
    if (eventoValidado == true) {
        console.log(enJSON);
        localStorage.setItem("agenda1", enJSON);
    } else {
        console.log("Ingreso algun dato erroneo o no habia horario.");
    }
}
// Reseter datos del Modal
function borrarDatosIngresados(){
    $('#nombre').val("");
    $('#listaDeportes').val("");
    $('#dias').val("");
}
// Función para seleccionar solo los dias de cada deporte

$( "#deporteFutbol" ).on( "click", function() {
    $( "#lunes").show();
    $( "#martes").hide();
    $( "#miercoles").show();
    $( "#jueves").hide();
    $( "#viernes").show();
    $( "#sabado").hide();
});
$( "#deporteBasket" ).on( "click", function() {
    $( "#lunes").hide();
    $( "#martes").show();
    $( "#miercoles").hide();
    $( "#jueves").show();
    $( "#viernes").hide();
    $( "#sabado").hide();
});
$( "#deporteVolley" ).on( "click", function() {
    $( "#lunes").show();
    $( "#martes").hide();
    $( "#miercoles").hide();
    $( "#jueves").show();
    $( "#viernes").hide();
    $( "#sabado").hide();
});
$( "#deporteLibre" ).on( "click", function() {
    $( "#lunes").hide();
    $( "#martes").show();
    $( "#miercoles").hide();
    $( "#jueves").hide();
    $( "#viernes").show();
    $( "#sabado").show();
});

// Boton Animacion perfil de entrenadores
$('#btnEntrenador').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#team").offset().top
    }, 50);
});

// Aplicando Ajax en la seccion de "Nuestro Equipo"
const datosJSON = "https://nahuelrivero88.github.io/Pre-Entrega3JS/datos.json"

$("#btnAjax").click(() => { 
$.getJSON(datosJSON, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;
      for (const dato of misDatos) {
        $("#equipoCompleto").prepend(`<div>
                                <h3>${dato.nombre}</h3>
                                <p> Función: ${dato.funcion}</p>
                                <p> Celular:${dato.telefono} </p>
                            </div>`)
      }  
    }
    });
});
