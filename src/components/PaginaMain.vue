<template>
  <h1>Bienvenido!</h1>
  <br>
  <h2>Inicie Sesion</h2>
  <table>
    <tr>
      <td><label>Cedula: </label></td>
      <td><input v-model="cedula" type="text" name="" id=""></td>
    </tr>
    <tr>
      <td><label>Contraseña: </label></td>
      <td><input v-model="contraseña" type="password" name="" id="pass" > </td>
     <td><button id="mostrar" @click="mostrarContraseña()" >Mostrar</button></td>
    </tr>
  </table>
  <br>
  <button @click="ingresar()">Ingresar</button>
 <br>
 <br>
 <label for="">{{ mensaje }}</label>

</template>

<script>
import { comprobarLogin } from '@/js/ProcesarDoctor';
import login from '@/js/login';
export default {
  data(){
    return{
      cedula:null,
      contraseña:null,
      mensaje: null
    }

  },
  methods:{
    mostrarContraseña(){
      var tipo = document.getElementById("pass");
      var mostrar = document.getElementById("mostrar")
      if(tipo.type == "password"){
        tipo.type = "text"
        mostrar.textContent = "Ocultar"

      }else{
        tipo.type = "password"
        mostrar.textContent = "Mostrar"
      }
    },
    async ingresar(){
      const doc = await comprobarLogin(this.cedula, this.contraseña);
      if(doc.length == 0){
        this.mensaje = "Los datos no coinciden, intente de nuevo"
      }else{
       
        login.setUserNameLogged(doc)
        if(this.userLogeado.admin == true){
        this.$router.replace('/doctor')
        }else{
          this.$router.replace('/doctor/paciente')
        }
      
      }

    }

  },
  computed:{
  userLogeado(){
    return login.getUserNameLogged()
  }
},
}
</script>

<style>
table{
  margin: 0 auto;
}
</style>