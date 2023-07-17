<template>
  <navar-main></navar-main>
  <navar-cie></navar-cie>
  <br>
  <h1>Ingresar CIE10</h1>
  <form action="">
    <table>
        <tr>
            <td><label for="">Codigo: </label></td>
            <td><input v-model="codigo" type="text" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Descripción: </label></td>
            <td><input v-model="descripcion" type="text"></td>
        </tr>
    </table>
    <br>
    <table>
      <tr>
        <td><button @click="insertar">Ingresas CIE10</button></td>
      </tr>
    </table>
    <br>
    <label for="">{{ mensaje }}</label>
  </form>
</template>

<script>
import NavarMain from '@/components/NavarMain.vue';
import NavarCie from '@/components/NavarCie.vue';
import { insertarCie } from '@/js/ProcesarCie';
export default {
  components:{
    NavarCie,
    NavarMain
  },
  data(){
    return{
      codigo:null,
      descripcion:null,
      mensaje: null
    }
  },
  methods:{
    async insertar(){


    
    const cie10 = {
      codigo : this.codigo,
      descripcion : this.descripcion
    };

    if(
      this.codigo == null ||
      this.descripcion ==null
    ){
      this.mensaje = "Llene todos los parametros"
    }else{
      const response = await insertarCie(cie10);
      this.codigo = null,
      this.descripcion = null
      this.mensaje = ""

      if(response == "Se ha ingresado correctamente"){
        this.mensaje = response
      }else{
        this.mensaje = "No se ha podido registrar"
      }
    }

  }
  }

}
</script>

<style>
table{
  margin: 0 auto;
}
</style>