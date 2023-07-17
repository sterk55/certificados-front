<template>
  <navar-main-vue></navar-main-vue>
  <navar-cer></navar-cer>
  <br>
  <h1 v-if="mostrarP">Certificados del Paciente con cedula {{ cedula }}</h1>
  <h1 v-if="mostrarD">Certificados emitidos por el Doctor con cedula {{ cedula }}</h1>
    <br>    
    <fieldset>
        <div v-if="mostrarB">
            <table class="tablasP">
                <thead>
                    <tr>
                        <th class="bonito" scope="col">Fecha de Generación</th>
                        <th class="bonito" scope="col">Cedula de Paciente</th>
                        <th class="bonito" scope="col">Cedula del Doctor</th>
                        <th class="bonito" scope="col">Fecha de Inicio</th>
                        <th class="bonito" scope="col">Fecha de Fin</th>
                        <th class="bonito" scope="col">Dias Validos</th>
                        <th class="bonito" scope="col">Imprimir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="l in lista" v-bind:key="l">
                        <th class="bonito" scope="row">{{ l.fechaGeneracion }}</th>
                        <td class="bonito">{{ l.cedulaPaciente }}</td>
                        <td class="bonito">{{ l.cedulaDoctor }}</td>
                        <td class="bonito">{{ l.fechaInicio }}</td>
                        <td class="bonito">{{ l.fechaFin }}</td>
                        <td class="bonito">{{ l.diasValidos }}</td>
                        <td class="bonito"><a id="idImprimir">Imprimir</a></td>
                     </tr>
                </tbody>
            </table>
        </div>
    </fieldset>
    <br>
    <label for="">{{ mensaje }}</label>

</template>

<script>
import NavarMainVue from '@/components/NavarMain.vue'
import NavarCer from '@/components/NavarCer.vue';
import { listaCertificadoPorCedulaP, listaCertificadoPorCedulaD } from '@/js/ProcesarCertificados';
export default {
    components:{
        NavarMainVue,
        NavarCer
    },
    data(){
        return{
            lista:[],
            mostrarB:false,
            mensaje:null,
            mostrarP: null,
            mostrarD: null
        }
    },
    props:{
        cedula: {
            type:String,
            default: 'Vue!'
        },
        tipo:{
            type:String
        }
    },
    methods:{
        async mostrarLista(){
            if(this.tipo == "paciente"){
            this.mostrarP = true
            this.mostrarD = false
            this.lista = await listaCertificadoPorCedulaP(this.cedula)
            if(this.lista.length >= 1){
            this.mostrarB = true
        }else{
            this.mensaje = "No se han enncontrado certificados con la cedula "+ this.cedula
        }}else{
            this.mostrarD = true
            this.mostrarP = false
            this.lista = await listaCertificadoPorCedulaD(this.cedula)
            if(this.lista.length >= 1){
            this.mostrarB = true
        }else{
            this.mensaje = "No se han encontrado certificados con la cedula "+ this.cedula
        }
        }
        }
    },
    mounted(){
        this.mostrarLista()
    }
}
</script>

<style>
table{
    margin: 0 auto;
}
.tablasP{
    margin: 0 auto;
    border: 1px solid #000;
    width: 70%;
}
.bonito{
   width: 20%;
   text-align: left;
   vertical-align: top;
   border: 1px solid #000;
   border-collapse: collapse;
   padding: 0.3em;
   caption-side: bottom;
}
th {
   background: #dadada;
}

#IDcedulaPaciente,#IDcedulaDoctor ,#idImprimir{
    color: blue;
    text-decoration: underline;  
    cursor: pointer; 
}
</style>