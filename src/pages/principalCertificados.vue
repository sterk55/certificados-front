<template>
  <navar-main ></navar-main>
  <br>
  <h1>Certificados</h1>
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
      router.push('/doctor/certificados/ingresar')
  },
  sendToBuscarDoctor(){
    router.push('/doctor/certificados/buscar')
  }
},
computed:{
 
},
mounted(){
  
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