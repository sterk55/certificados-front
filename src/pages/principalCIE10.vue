<template>
  <navar-main v-if="mostrarNavarA"></navar-main>
  <navar-main-doc v-if="mostrarNavarD"></navar-main-doc>
  <br>
  <h1>CIE10</h1>
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
import NavarMainDoc from '@/components/NavarMainDoc.vue';
import router from '@/router/router';

export default {
components:{
  NavarMain,
  NavarMainDoc
},
data(){
  return{
    mostrarNavarA:true,
    mostrarNavarD:false
  }
},
methods:{
  sendToRegistrar(){
      router.push('/doctor/cie10/ingresar')
  },
  sendToBuscarDoctor(){
    router.push('/doctor/cie10/buscar')
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