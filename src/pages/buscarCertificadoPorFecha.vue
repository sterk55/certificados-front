<template>
    <navar-main></navar-main>
    <navar-cer></navar-cer>
    <br>
    <h1>Buscar Certificados por Fecha de Generación</h1>
    <br>
    <table class="table2">
        <tr>
            <th><label for="">Ingrese la fecha en la que se generó:</label></th>
        </tr>
        <tr>
            <td class="td2"><input type="date" v-model="fecha"></td>
        </tr>
        <tr>
            <td class="td2"><button @click="mostrarLista()">Buscar</button></td>
        </tr>
    </table>
    <br>
    <fieldset>
        <div v-if="mostrarB">
            <table>
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
import NavarCer from '@/components/NavarCer.vue';
import NavarMain from '@/components/NavarMain.vue';
import { listaCertificadoPorFecha } from '@/js/ProcesarCertificados';
export default {
    components:{
        NavarCer,
        NavarMain
    },
    data(){
        return{
            lista:[],
            mostrarB: false,
            fecha:null,
            mensaje:null
        }
    },
    methods:{
        async mostrarLista(){

            this.lista = await listaCertificadoPorFecha(this.fecha);
            if(this.lista.length >= 1){
            this.mostrarB = true
            this.mensaje = ""
        }else{
            this.mostrarB = false
            this.mensaje = "No se ha encontrado certificados generado en "+ this.fecha
        }
        }
    }

}
</script>

<style>
.table2{
    margin: 0 auto;
    border: 1px solid #000;

}
.td2{
    border: 1px solid #000;
    padding: 0.4em;

}
.tablasP{
    margin: 0 auto;
    border: 1px solid #000;
    width: 80%;
}
.bonito{
   width: 18%;
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

#idImprimir{
    color: blue;
    text-decoration: underline;  
    cursor: pointer; 
}
</style>