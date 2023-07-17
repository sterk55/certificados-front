<template>
  <navar-main></navar-main>
  <navar-cer></navar-cer>
  <br>
  <h1>Certificados</h1>
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
            <td class="bonito"><a id="IDcedulaPaciente" @click="buscarCedula(l.cedulaPaciente, this.paciente)">{{ l.cedulaPaciente }}</a></td>
            <td class="bonito"><a id="IDcedulaDoctor" @click="buscarCedula(l.cedulaDoctor, this.doctor)">{{ l.cedulaDoctor }}</a></td>
            <td class="bonito">{{ l.fechaInicio }}</td>
            <td class="bonito">{{ l.fechaFin }}</td>
            <td class="bonito">{{ l.diasValidos }}</td>
            <td class="bonito"><a id="idImprimir" @click="imprimirPdf(l.cedulaPaciente, l.cedulaDoctor, l.fechaGeneracion, l.fechaInicio, l.fechaFin, l.diasValidos)">Imprimir</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </fieldset>
</template>

<script>
import NavarMain from '@/components/NavarMain.vue';
import NavarCer from '@/components/NavarCer.vue';
import { listaCertificadosTodos } from '@/js/ProcesarCertificados';

export default {
  components:{
    NavarMain,
    NavarCer,
   
  },
  data(){
    return{
      lista:[],
      mostrarB:false,
      paciente: "paciente",
      doctor: "doctor"
    }
  },
  methods:{
    async mostrarLista(){
      this.lista = await listaCertificadosTodos()
      this.mostrarB = true
    },
    buscarCedula(cedula, tipo){
      console.log(cedula);
      this.$router.push({name:'cedula' , params: {cedula: cedula , tipo: tipo } })
      console.log("hey" + tipo);
    },
    imprimirPdf(cedulaPaciente, cedulaDoctor, fechaGeneracion, fechaInicio, fechaFin, diasValidos){
      let route = this.$router.resolve({name:'imprimir', params:{cedulaPaciente:cedulaPaciente, cedulaDoctor:cedulaDoctor, fechaGeneracion:fechaGeneracion, fechaInicio:fechaInicio, fechaFin:fechaFin,diasValidos:diasValidos}})
      //window.open(route.href, '_blank')
      window.open(route.href, "ventana1", "width= 1340, height = 780, scrollbars = NO")
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