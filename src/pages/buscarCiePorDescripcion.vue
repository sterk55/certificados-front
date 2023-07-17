<template>
    <navar-main-vue></navar-main-vue>
    <navar-cie-vue></navar-cie-vue>
    <br />

<h1>Buscar CIE10 por Descripcion</h1>
<br />
<table class="table2">
  <tr>
    <th><label for="">Ingrese una palabra de la descripcion:</label></th>
  </tr>
  <tr>
    <td class="td2"><input type="text" v-model="descripcion" /></td>
  </tr>

  <tr>
    <td class="td2"><button @click="mostrarLista()">Buscar</button></td>
  </tr>
</table>
<br />
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
import NavarMainVue from '@/components/NavarMain.vue'
import NavarCieVue from '@/components/NavarCie.vue'
import { listaCiePorDescripcion } from '@/js/ProcesarCie';
export default {
    components:{
        NavarCieVue,
        NavarMainVue
    },
    data(){
        return{
            lista:[],
            mostrarB:false,
            descripcion:null
        };
    },
    methods:{
        async mostrarLista(){
            this.lista = await listaCiePorDescripcion(this.descripcion)
            this.mostrarB = true
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