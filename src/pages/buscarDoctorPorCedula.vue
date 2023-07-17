<template>
   <navar-main></navar-main>
  <navar-doc></navar-doc>
  <br>
  <h1>Buscar por Cedula</h1>
  <br>
  <table class="table2">
        <tr>
            <th><label for="">Ingrese la Cedula:</label></th>
        </tr>
        <tr>
            <td class="td2"><input required type="text" v-model="cedula" id="idTexto"></td>
        </tr>
        
        <tr>
            <td class="td2"><button @click="mostrarLista()">Buscar</button></td>
        </tr>
    </table>
  <br>
  <fieldset>
    <div v-if="mostrarB">
      <table class="tablasP">
        <thead>
          <tr>
            <th class="bonito" scope="col">Cedula</th>
            <th class="bonito" scope="col">Apellidos</th>
            <th class="bonito" scope="col">Nombres</th>
            <th class="bonito" scope="col">Correo</th>
            <th class="bonito" scope="col">Contraseña</th>
            <th class="bonito" scope="col">Admin</th>
            <th class="bonito" scope="col">Certificados</th>
            <th class="bonito" scope="col">Actualizar</th>
            <th class="bonito" scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in lista" v-bind:key="l">
            <th class="bonito" scope="row">{{ l.cedula }}</th>
            <td class="bonito">{{ l.apellido }}</td>
            <td class="bonito">{{ l.nombre }}</td>
            <td class="bonito">{{ l.correo }}</td>
            <td class="bonito">{{ l.contraseña }}</td>
            <td class="bonito">{{ l.admin }}</td>
            <td class="bonito"><a id="idCertificados">Certificados</a></td>
            <td class="bonito"><a id="idEditar">Actualizar</a></td>
            <td class="bonito"><a id="idEliminar" @click="alerta(l.cedula)">Eliminar</a></td>
          </tr>
        </tbody>

      </table>

    </div>
  </fieldset>
  <br>
  <label for="">{{ mensaje }}</label>
</template>

<script>
import NavarMain from '@/components/NavarMain.vue';
import NavarDoc from '@/components/NavarDoc.vue';
import { eliminarPorCedula, listaDoctorPorCedula } from '@/js/ProcesarDoctor';
export default {
    components:{
  NavarDoc,
  NavarMain
},
data(){
    return{
        lista:[],
        mostrarB:false,
        mensaje:null,
        cedula:null
    }
},
methods:{
    async mostrarLista() {
        if(this.cedula.toString().length == 10){
        this.lista = await listaDoctorPorCedula(this.cedula)
        if(this.lista.length >=1){
            this.mostrarB= true
            this.mensaje = ""
        }else{
            this.mostrarB = false
            this.mensaje = ""
        }
    }else{
        this.mensaje = "Ingrese cedula valida"
        this.mostrarB = false
    }
    },
    async eliminarPorCedulaDoc(cedula){
        await eliminarPorCedula(cedula)
        alert("Se ha eliminado Correctamente!")
        location.reload()
    },
    alerta(cedula){
        var opcion = confirm("Desea eliminar el Doctor con cedula: "+ cedula);
        if(opcion == true){
            this.eliminarPorCedulaDoc(cedula)

        }else{
            alert("No se ha eliminado")
        }
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

#idEditar, #idCertificados{
    color: blue;
    text-decoration: underline;  
    cursor: pointer;  
}
#idEliminar{
    color: red;
    text-decoration: underline;  
    cursor: pointer;  
}
</style>