<template>
  <navar-main></navar-main>
  <navar-cer></navar-cer>
  <br>
  <h1>Ingresar Certificado</h1>
  <form action="">
    <table>
        <tr>
            <td><label for="">Fecha de Inicio: </label></td>
            <td><input v-model="fechaInicio" type="date" name="" id="fechaInicial"></td>
        </tr>
        <tr>
            <td><label for="">Fecha de Fin: </label></td>
            <td><input v-model="fechaFin" type="date" name="" id="fechaFinal"></td>
        </tr>
        <tr>
            <td><label for="">Ingresar Cedula de Paciente: </label></td>
            <td><input v-model="cedulaPaciente" type="text" name="" id=""></td>
        </tr>
      
    </table> 
    <br>
    <table>
      <tr>
        <td><button @click="insertar">Ingresar Certificado</button></td>
      </tr>
    </table>
    <br>
    <label for="">{{ mensaje }}</label>
    
  </form>
</template>

<script>
import NavarMain from '@/components/NavarMain.vue';
import NavarCer from '@/components/NavarCer.vue';
import { insertarCer } from '@/js/ProcesarCertificados';
import { listaPacientePorCedula } from '@/js/ProcesarPaciente';
import login from '@/js/login';
export default {
  components:{
    NavarMain,
    NavarCer
  },
  data(){
    return{
      fechaInicio:null,
      fechaFin:null,
      cedulaPaciente:null,
      diasValidos:null,
      mensaje:null,
      dif:null,
      fechaGeneracion:null,
      listaPac:[]
    }
  },
  methods:{
    diasRestantes(){
      var inicial = new Date (document.getElementById("fechaInicial").value)
      var final = new Date (document.getElementById("fechaFinal").value)
      console.log(document.getElementById("fechaFinal").value);
      console.log(final.getTime());
      console.log(final.getDate());
      var difD = final.getTime() - inicial.getTime();
      this.dif = Math.round(difD/(1000*60*60*24));
     

    },

    async insertar(){
      this.listaPac = await listaPacientePorCedula(this.cedulaPaciente)
      console.log(this.cedulaPaciente.toString().length);
      if(this.cedulaPaciente.toString().length == 10){
      if(this.listaPac.length == 1){
      this.diasRestantes();
      if(this.dif > 0){
      var hoy = new Date()
      this.fechaGeneracion = hoy.toISOString().slice(0,-14)
      const certificados = {
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
        cedulaPaciente: this.cedulaPaciente,
        diasValidos: this.dif,
        fechaGeneracion: this.fechaGeneracion,
        cedulaDoctor: this.userLogeado.cedula
      };
      console.log(this.userLogeado.cedula);
      console.log(certificados.cedulaDoctor);
      if(
        this.fechaInicio == null ||
        this.fechaFin == null ||
        this.cedulaPaciente ==null
      ){
        this.mensaje = "Llene todos los campos"
      }else{
        const response = await insertarCer(certificados);
        this.fechaInicio = null,
        this.fechaFin = null,
        this.cedulaPaciente =null,
        this.mensaje = ""
        if(response == "Se ha ingresado correctamente"){
          this.mensaje = response
        }else{
          this.mensaje = "No se ha podido registrar"
        }}
      }else{
        this.mensaje = "Ingrese fechas validas"
      }

    }else{
      this.mensaje = "El Paciente con numero de cedula "+this.cedulaPaciente+" no existe, registrelo primero" 
    }}else{
      this.mensaje = "Ingrese una cedula valida"
     
    }
  }
    
  },
  computed:{
    userLogeado(){
      return login.getUserNameLogged()
    }
  }

}
</script>

<style>
table{
  margin: 0 auto;
}
</style>