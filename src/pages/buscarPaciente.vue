<template>
  <navar-main></navar-main>
  <navar-pac></navar-pac>
  <br>
  <h1>Todos los Pacientes</h1>
  <br>
  <fieldset>
    <div v-if="mostrarB">
      <table class="tablasP">
        <thead>
          <tr>
            <th class="bonito" scope="col">Cedula</th>
            <th class="bonito" scope="col">Apellidos</th>
            <th class="bonito" scope="col">Nombres</th>
            <th class="bonito" scope="col">Direccion</th>
            <th class="bonito" scope="col">Telefono</th>
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
          <td class="bonito">{{ l.direccion }}</td>
          <td class="bonito">{{ l.telefono }}</td>
          <td class="bonito"><a id="idCertificados" @click="buscarCedula(l.cedula)">Certificados</a></td>
          <td class="bonito"><a id="idEditar" @click="editarPaciente(l.cedula, l.nombre, l.apellido, l.direccion,l.fechaNacimiento, l.codigoSeguro, l.telefono, l.id)">Actualizar</a></td>
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
import NavarPac from '@/components/NavarPac.vue';
import { listaPacTodos, pacienteEliminadoPorCedula } from '@/js/ProcesarPaciente';
export default {
components:{
  NavarPac,
  NavarMain
},
data(){
  return{
    lista:[],
    mostrarB:false,
    mensaje:null
  }
},
methods:{
  async mostrarLista(){
    this.lista = await listaPacTodos()
    if(this.lista.length == 0){
      this.mensaje="No hay Pacientes Ingresados"

    } else{
    this.mostrarB = true}
  },
  buscarCedula(cedula){
    this.$router.push({name:'cedula' , params: {cedula: cedula, tipo: "paciente"  } })

  },
  async eliminarPaciente(cedula){
    await pacienteEliminadoPorCedula(cedula)
    alert("Se ha eliminado correctamente!")
    location.reload()
  },
  alerta(cedula){
    var opcion = confirm("Desea eliminar el paciente con cedula: "+cedula);
    if(opcion==true){
      this.eliminarPaciente(cedula)
    }else{
      alert("No se ha eliminado!")
    }
  },
  editarPaciente(cedula, nombre, apellido, direccion, fechaNacimiento, codigoSeguro, telefono, id){
    this.$router.push({name:'editar', params:{cedulas:cedula, nombres:nombre, apellidos:apellido, direccions:direccion, fechaNacimientos:fechaNacimiento, codigoSeguros:codigoSeguro, telefonos:telefono, ids:id}})
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