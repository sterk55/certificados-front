<template>
    <navar-main-vue></navar-main-vue>
    <navar-pac-vue></navar-pac-vue>
    <br>
    <h1>Buscar Paciente por la Cedula</h1>
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
            <td class="bonito" ><a id="clicCertificados" @click="buscarCedula(l.cedula)" >Certificados</a></td>
            <td class="bonito"><a id="clicEditar" @click="editarPaciente(l.cedula, l.nombre, l.apellido, l.direccion, l.fechaNacimiento, l.codigoSeguro, l.telefono, l.id)">Actualizar</a></td>
            <td class="bonito"><a id="clicEliminar" @click="alerta(l.cedula)">Eliminar</a></td>
          </tr>
        </tbody>
            </table>
        </div>
    </fieldset>
  <br>
  <label for="">{{ mensaje }}</label>
</template>

<script>
import NavarMainVue from '@/components/NavarMain.vue'
import NavarPacVue from '@/components/NavarPac.vue'
import { listaPacientePorCedula, pacienteEliminadoPorCedula } from '@/js/ProcesarPaciente';
export default {
    components:{
        NavarMainVue,
        NavarPacVue
    },
    data(){
        return{
            lista:[],
            mostrarB: false,
            cedula:null,
            mensaje:null
        }
    },
    methods:{
        async mostrarLista(){
            
            if(this.cedula.toString().length ==10){
            this.lista = await listaPacientePorCedula(this.cedula)
            if(this.lista.length >=1){
            this.mostrarB = true
            this.mensaje = ""
        }else{
            this.mostrarB = false
            this.mensaje = "No se ha encontrado paciente con la cedula "+ this.cedula
        }}else{
            this.mensaje = "Ingrese cedula valida"
            this.mostrarB = false
        }

        },
        buscarCedula(cedula){
            this.$router.push({name:'cedula' , params: {cedula: cedula  } })

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
        editarPaciente(cedula, nombre, apellido, direccion,fechaNacimiento, codigoSeguro ,telefono, id){
        this.$router.push({name:'editar', params:{cedulas:cedula, nombres:nombre, apellidos:apellido, direccions:direccion,fechaNacimientos:fechaNacimiento,codigoSeguros:codigoSeguro, telefonos:telefono, ids:id}})
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

#clicEditar, #clicCertificados{
    color: blue;
    text-decoration: underline;  
    cursor: pointer;  
}
#clicEliminar{
    color: red;
    text-decoration: underline;  
    cursor: pointer;  
}
</style>