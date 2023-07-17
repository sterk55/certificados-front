<template>
    <div ref="content" id="a4">

        <section class="tpm">
            <img src="../assets/encabezadoCertificadoA4.png" alt="">
            <p id="idNombreDoc">{{ nombreDoctor }} {{ apellidoDoctor }}</p>
            <p id="idProfesionDoc">{{ profesionDoctor }}</p>
            <p id="idProfesion2Doc">PREVENCIONISTA DE RIESGOS LABORALES</p>
            <p id="idProfesion3Doc">OFICIAL DE SEGURIDAD RADIOLOGICA</p>
            <p id="idDireccionDoc">{{ direccionDoctor }}</p>
            <p id="idEdificioDoc">{{ direccionDetalladaDoctor }}</p>
            <p id="idTelefonoDoc">0{{ telefonoDoctor }}</p>
            <p id="idCorreoDoc">{{ correoDoctor }}</p>
        </section>
        <p id="idFechaCertificado">D.M.Q.. {{ diaNumeroGeneracion }} de {{mesLetraGeneracion}} del 2023</p>
        <p id="idTitulo">CERTIFICADO.. MEDICO DE REPOSO</p>
        <p class="classContenidos" id="idPrimerContenido">Por medio del presente certifico que el paciente <a>{{
            nombrePaciente }} {{ apellidoPaciente }}</a> con CC <a>{{ cedulaPaciente }}</a> con HC: <a>1704195831</a>
            acude el dia de hoy {{diaNumeroGeneracion}} ({{ diaLetraGeneracion }} ) de {{mesLetraGeneracion}} a las 06:00 por presentar:</p>
        <p class="medio" id="idDiagnostico"><a>Diagnostico</a>: Bronquitis Aguda, No Especificada </p>
        <p class="medio" id="idCie"><a>CIE 10</a>: (1209)</p>
        <p class="classContenidos" id="idSegundoContenido">Paciente requiere reposo de <a>{{ diaNumeroValido }} ({{ diaLetraValido }} )</a> dias, <a>desde el {{ diaNumeroInicio }}
                ({{ diaLetraInicio }} ) de {{mesLetraInicio}} del 2023 al {{ diaNumeroFin }} ({{ diaLetraFin }} ) de {{mesLetraFin}} del 2023.</a></p>
        <p class="medio" id="idDireccionPac"><a>Direccion Domiciliaria: </a> {{ direccionPaciente }}</p>
        <p class="medio" id="idTelefonoPac"><a>Telefono: </a> 0{{ telefonoPaciente }}</p>
        <p class="medio" id="idActividadLaboralPac"><a>Actividad Laboral:</a> Independiente</p>
        <p class="medio" id="idTipoContingencia"><a>Tipo De Contingencia: </a>Enfermedad general</p>
        <p class="classContenidos" id="idNota"><a>Nota: </a> Paciente debe guardar aislamiento respiratorio y uso permanente
            de mascarilla.</p>
        <p class="classContenidos" id="idTercerContenido">Es todo cuanto puedo certificar, el paciente puede hacer uso del
            presente de acuerdo a su necesidad dentro de los cánones legales.</p>
        <p id="idFirmaNombreDoc">Dr. {{ nombreDoctor }} {{ apellidoDoctor }}</p>
        <p class="firma" id="idFirmaProfesionDoc">Prevencionista de Riesgos Laborales</p>
        <p class="firma" id="idUlitmosDatosDoc">CC: {{ cedulaDoctors }} - Registro: 1036-2020-2163035</p>
    </div>

    <button @click="cerrar()">Cerrar</button>
</template>
  
<script>
import jsPDF from 'jspdf';
import { listaDoctorPorCedula } from '@/js/ProcesarDoctor';
import { listaPacientePorCedula } from '@/js/ProcesarPaciente';
//import html2canvas from "html2canvas";
export default {
    data() {
        return {
            nombreDoctor: null,
            apellidoDoctor: null,
            telefonoDoctor: null,
            cedulaDoctors: null,
            correoDoctor: null,
            direccionDoctor: null,
            direccionDetalladaDoctor: null,
            profesionDoctor: null,
            diaLetraGeneracion:null,
            diaNumeroGeneracion:null,
            diaLetraInicio:null,
            diaNumeroInicio:null,
            diaLetraFin:null,
            diaNumeroFin:null,
            diaLetraValido:null,
            diaNumeroValido:null,
            mesLetraGeneracion:null,
            mesLetraInicio:null,
            mesLetraFin:null,
            nombrePaciente: null,
            apellidoPaciente: null,
            cedulaPacientes: null,
            direccionPaciente: null,
            telefonoPaciente: null,
            actividadPaciente: "Independiente",
            listaDoc: [],
            listaPac: [],
            meses: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

        }
    },
    props: {
        cedulaPaciente: {
            type: String
        },
        cedulaDoctor: {
            type: String
        },
        fechaGeneracion: {
            type: Date
        },
        fechaInicio: {
            type: Date
        },
        fechaFin: {
            type: Date
        },
        diasValidos: {
            type: String
        }
    },
    methods: {
        descargar() {

            this.asignarValores()
            var doc = new jsPDF('p', 'pt', 'A4')
            var margins = 0;
            var scale = (doc.internal.pageSize.width - margins * 2) / document.body.scrollWidth;
            doc.html(this.$refs.content, {
                x: margins,
                y: margins,
                html2canvas: {
                    scale: scale,
                },
                callback: function (doc) {
                    doc.output('dataurlnewwindow', { filename: 'fichero-pdf.pdf' })
                }
            })

            doc.fromHTML(this.$refs.content, this.margins.left, this.margins.top, {
                'width': this.margins.width
            });
            doc.save('test.pdf')
        },
        async asignarValores() {
            console.log("entra");
            this.listaDoc = await listaDoctorPorCedula(this.cedulaDoctor)
            console.log(this.listaDoc[0].nombre);
            this.cedulaDoctors = this.cedulaDoctor
            this.nombreDoctor = this.listaDoc[0].nombre
            this.apellidoDoctor = this.listaDoc[0].apellido
            this.correoDoctor = this.listaDoc[0].correo

            this.listaPac = await listaPacientePorCedula(this.cedulaPaciente)
            this.cedulaPacientes = this.cedulaPaciente
            this.nombrePaciente = this.listaPac[0].nombre
            this.apellidoPaciente = this.listaPac[0].apellido
            this.direccionPaciente = this.listaPac[0].direccion
            this.telefonoPaciente = this.listaPac[0].telefono


        },
        cerrar() {
            window.close()
        },
        Unidades(num) {

            switch (num) {
                case 1: return "Uno";
                case 2: return "Dos";
                case 3: return "Tres";
                case 4: return "Cuatro";
                case 5: return "Cinco";
                case 6: return "Seis";
                case 7: return "Siete";
                case 8: return "Ocho";
                case 9: return "Nueve";
            }

            return "";
        },
        Decenas(num) {

            var decena = Math.floor(num / 10);
            var unidad = (num - (decena * 10));

            switch (decena) {
                case 1:
                    switch (unidad) {
                        case 0: return "Diez";
                        case 1: return "Once";
                        case 2: return "Doce";
                        case 3: return "Trece";
                        case 4: return "Catorce";
                        case 5: return "Quince";
                        default: return "Dieci" + this.Unidades(unidad);
                    }
                case 2:
                    switch (unidad) {
                        case 0: return "Veinte";
                        default: return "Veinti" + this.Unidades(unidad);
                    }
                case 3: return this.DecenasY("Treinta", unidad);
                case 4: return this.DecenasY("Cuarenta", unidad);
                case 5: return this.DecenasY("Cincuenta", unidad);
                case 6: return this.DecenasY("Sesenta", unidad);
                case 7: return this.DecenasY("Setenta", unidad);
                case 8: return this.DecenasY("Ochenta", unidad);
                case 9: return this.DecenasY("Noventa", unidad);
                case 0: return this.Unidades(unidad);
            }
        },
        DecenasY(strSin, numUnidades) {
            if (numUnidades > 0)
                return strSin + " y " + this.Unidades(numUnidades)

            return strSin;




        },
    },
        async mounted() {
            setTimeout(this.cerrar, 1560)
            console.log("entra");
            var generacion = new Date(this.fechaGeneracion)
            var inicio = new Date(this.fechaInicio)
            var fin = new Date(this.fechaFin)
          
            this.listaDoc = await listaDoctorPorCedula(this.cedulaDoctor)
            console.log(this.listaDoc[0].nombre);
            console.log(this.meses[generacion.getMonth()]);

            this.mesLetraGeneracion = this.meses[generacion.getMonth()]
            this.mesLetraInicio = this.meses[inicio.getMonth()]
            this.mesLetraFin = this.meses[fin.getMonth()]

            this.diaLetraGeneracion = this.Decenas(generacion.getDate()+1)
            this.diaNumeroGeneracion = (generacion.getDate()+1)

            this.diaLetraInicio = this.Decenas(inicio.getDate()+1)
            this.diaNumeroInicio = (inicio.getDate()+1)

            this.diaLetraFin = this.Decenas(fin.getDate()+1)
            this.diaNumeroFin = (fin.getDate()+1)

            this.diaLetraValido = this.Decenas(this.diasValidos)
            this.diaNumeroValido = this.diasValidos


            this.cedulaDoctors = this.cedulaDoctor
            this.nombreDoctor = this.listaDoc[0].nombre
            this.apellidoDoctor = this.listaDoc[0].apellido
            this.correoDoctor = this.listaDoc[0].correo
            this.telefonoDoctor = this.listaDoc[0].telefono
            this.direccionDoctor = this.listaDoc[0].direccion
            this.direccionDetalladaDoctor = this.listaDoc[0].direccionDetallada
            this.profesionDoctor = this.listaDoc[0].profesion

            this.listaPac = await listaPacientePorCedula(this.cedulaPaciente)
            this.cedulaPacientes = this.cedulaPaciente
            this.nombrePaciente = this.listaPac[0].nombre
            this.apellidoPaciente = this.listaPac[0].apellido
            this.direccionPaciente = this.listaPac[0].direccion
            this.telefonoPaciente = this.listaPac[0].telefono

            this.descargar()

        }
    }
</script>
  
<style>
img {
    width: 100%;
}

#a4 {
    width: 100%;
}

.tpm {
    position: relative;
}

#idNombreDoc {
    font-size: 2.7rem;
    color: white;
    position: absolute;
    top: 15%;
    left: 8%;
    font-weight: bold;
}

#idProfesionDoc {
    font-size: 1.8rem;
    color: white;
    position: absolute;
    top: 35%;
    left: 8%;
    font-weight: bold;
}

#idProfesion2Doc {
    font-size: 1.8rem;
    color: white;
    position: absolute;
    top: 41%;
    left: 8%;
    font-weight: bold;
}

#idProfesion3Doc {
    font-size: 1.8rem;
    color: white;
    position: absolute;
    top: 47%;
    left: 8%;
    font-weight: bold;
}

#idDireccionDoc {
    font-size: 1.5rem;
    color: white;
    position: absolute;
    top: 59%;
    left: 8%;
}

#idEdificioDoc {
    font-size: 1.5rem;
    color: white;
    position: absolute;
    top: 65%;
    left: 8%;
}

#idTelefonoDoc {
    font-size: 1.5rem;
    color: white;
    position: absolute;
    top: 71%;
    left: 8%;
}

#idCorreoDoc {
    font-size: 1.5rem;
    color: white;
    position: absolute;
    top: 77%;
    left: 8%;

}

#idFechaCertificado {
    font-size: 1.7rem;
    text-align: right;
    margin-right: 10%;
}

#idTitulo {
    font-size: 2rem;
    text-align: center;
    color: #000;
    font-weight: bold;
    margin-top: 3%;
}

.classContenidos {
    font-size: 1.7rem;
    margin-left: 10%;
    margin-right: 10%;
    text-align: justify;
    margin-top: 2%;
    color: #000;

}


a {
    font-weight: bold;
}

.medio {
    font-size: 1.7rem;
    text-align: left;
    margin-left: 10%;
    margin-top: 2%;
    color: #000;
}

.firma {
    font-size: 1.7rem;
    text-align: center;
    margin-top: 2.7%;
    color: #000;
}

#idFirmaNombreDoc {
    font-size: 1.7rem;
    text-align: center;
    margin-top: 12%;
    color: #000;
}
</style>