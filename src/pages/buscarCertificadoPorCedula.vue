<template>
    <navar-main-vue></navar-main-vue>
    <navar-cer-vue></navar-cer-vue>
    <br>
    <h1>Buscar Certificados por la Cedula del Paciente</h1>
    <br>
    <table class="table2">
        <tr>
            <th><label for="">Ingrese la Cedula:</label></th>
        </tr>
        <tr>
            <td class="td2"><input type="text" v-model="cedula"></td>
        </tr>
        
        <tr>
            <td class="td2"><button @click="mostrarLista()">Buscar</button></td>
        </tr>
    </table>
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
import NavarCerVue from '@/components/NavarCer.vue'
import { listaCertificadoPorCedulaP} from '@/js/ProcesarCertificados'
export default {
    components:{
        NavarMainVue,
        NavarCerVue
    },
    data(){
        return{
            lista:[],
            mostrarB: false,
            cedula:null,
            mensaje:null
        }
    },
    methods:{
        async mostrarLista(){
            if(this.cedula.toString().length == 10){
            this.lista = await listaCertificadoPorCedulaP(this.cedula)
            if(this.lista.length >= 1){
            this.mostrarB = true
            this.mensaje = ""
            }else{
                this.mensaje = "No existe certificados para la cedula " + this.cedula
                this.mostrarB = false

            }
        }else{
            this.mensaje = "Ingrese una cedula valida"
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
    padding: 0.5em;

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

#IDcedulaPaciente, #idImprimir{
    color: blue;
    text-decoration: underline;  
    cursor: pointer; 
}
</style>