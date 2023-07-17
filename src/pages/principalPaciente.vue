<template>
  <navar-main></navar-main>
  <br>
  <h1>Paciente</h1>
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
  NavarMain,
},
data(){
  return{

  }
},
methods:{
  sendToRegistrar(){
      router.push('/doctor/paciente/ingresar')
  },
  sendToBuscarDoctor(){
    router.push('/doctor/paciente/buscar')
  },
  cerrarLogin(){

   
login.deleteUserNameLogged()
this.$router.push("/")

}
},
mounted(){
 
  if(this.userLogeadoSN != undefined){
   if(this.userLogeado.admin == false){
   setTimeout(this.cerrarLogin, 60000)
    
  }
}else{
  this.$router.replace('/')
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