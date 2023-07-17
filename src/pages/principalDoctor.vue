<template>
  <navar-main></navar-main>
<br>
  <h1>Doctor</h1>
  <br>
  <label for="">Bienvenido Doctor {{ userLogeado.nombre }} {{ userLogeado.apellido }}</label>
  <br>
  <br>
  <table>
    <tr>
      <td><img class="pacienteImg" src="../assets/registrar.png" alt="" @click="sendToRegistrar"> </td>
      <td><img src="../assets/lupa.png" alt="" @click="sendToBuscarDoctor"></td>
    </tr>
   
  </table>

</template>

<script>
import NavarMain from '@/components/NavarMain.vue';
import router from '@/router/router';
import login from '@/js/login'
export default {
  components:{
    NavarMain
  },

methods:{
  sendToRegistrar(){
      router.push('/doctor/ingresar')
  },
  sendToBuscarDoctor(){
    router.push('/doctor/buscar')
  },
  cerrarLogin(){

   
login.deleteUserNameLogged()
this.$router.push("/")

}
  
},
computed:{
  userLogeado(){
    return login.getUserNameLogged()
  },
  userLogeadoSN(){
    return login.getUserNameLoggedSN()
  }
},
mounted(){
   
   setTimeout(this.cerrarLogin, 600000)
    if(this.userLogeado.admin == false){
      this.$router.replace('/doctor/paciente')
    }
  
  
  
   
 
 }





}

</script>

<style>
table{
  margin: 0 auto;
}
img{
  width: 200px;
  height: 200px;
  margin: 0 30px;
}

</style>