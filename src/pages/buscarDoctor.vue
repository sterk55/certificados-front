<template>
  <navar-main></navar-main>
  <navar-doc></navar-doc>
  <br>
  <h1>Todos los Doctores</h1>
  <br>
  <fieldset>
    <div v-if="mostrarB">
      <table class="tablasP">
        <thead>
          <tr>
            <th class="bonito" scope="col">Cedula</th>
            <th class="bonito" scope="col">Apellidos</th>
            <th class="bonito" scope="col">Nombres</th>
            <th class="bonito" scope="col">Telefono</th>
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
            <td class="bonito">{{ l.telefono }}</td>
            <td class="bonito">{{ l.correo }}</td>
            <td class="bonito">{{ l.contraseña }}</td>
            <td class="bonito">{{ l.admin }}</td>
            <td class="bonito"><a id="idCertificados" @click="buscarCedula(l.cedula)">Certificados</a></td>
            <td class="bonito"><a id="idEditar" @click="editarDoctor(l.cedula, l.nombre, l.apellido, l.correo, l.contraseña, l.admin, l.id, l.direccion, l.direccionDetallada, l.profesion, l.telefono)">Actualizar</a></td>
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
import { listaDocTodos, eliminarPorCedula } from '@/js/ProcesarDoctor';
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
  }
},
methods:{
  async mostrasLista(){
    this.lista = await listaDocTodos()
    if(this.lista.length == 0){
      this.mensaje = "No hay Doctores Ingresados"
      this.mostrarB = false
    }else{
      this.mostrarB = true

    }
    
  },
  async DoctoreliminarPorCedula(cedula){
    await eliminarPorCedula(cedula)
    alert("Se ha eliminado correctamente")
    location.reload()
  },
  alerta(cedula){
    var opcion = confirm("Desea eliminar el doctor con cedula " + cedula)
    if(opcion==true){
      this.DoctoreliminarPorCedula(cedula)
    }else{
      alert("No se ha eliminado")
    }
  },
  buscarCedula(cedula){
    this.$router.push({name:'cedula', params:{cedula: cedula, tipo: "doctor"}})
  },
  editarDoctor(cedula, nombre, apellido, correo, contraseña, admin, id, direccion, direccionDetallada, profesion, telefono){
    this.$router.push({name: 'editarDoc', params:{cedulas: cedula, nombres: nombre, apellidos: apellido, correos: correo, contrasenas: contraseña, admins: admin, ids: id , direccions:direccion, direccionDetalladas:direccionDetallada, profesions:profesion, telefonos:telefono}})
  }
},
mounted(){
  this.mostrasLista()
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
   width: 18%;
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

#idEditar,#idCertificados{
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