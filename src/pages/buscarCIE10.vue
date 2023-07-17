<template>
  <navar-main></navar-main>
  <navar-cie></navar-cie>
  <br>
  <h1>Buscar CIE10</h1>
  <br>
  <fieldset>
    <div v-if="mostrarB">
      <table class="tablasP">
        <thead>
          <tr>
            <th class="bonito" scope="col">Codigo</th>
            <th class="bonito" scope="col">Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in lista" v-bind:key="l">
            <th class="bonito" scope="row">{{ l.codigo }}</th>
            <td class="bonito">{{ l.descripcion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </fieldset>
</template>

<script>
import NavarMain from '@/components/NavarMain.vue';
import NavarCie from '@/components/NavarCie.vue';
import { listaCieTodos } from '@/js/ProcesarCie';
export default {
components:{
  NavarMain,
  NavarCie
},
data(){
  return{
    lista:[],
    mostrarB:false
  }
},
methods:{
  async mostrarLista(){
    this.lista = await listaCieTodos()
    this.mostrarB=true
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
   width: 25%;
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
</style>