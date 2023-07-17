<template>
    <navar-main></navar-main>
   <navar-doc></navar-doc> 
   <br>
  <h1>Ingresar Doctor</h1>
  <form action="">
    <table>
        <tr>
            <td><label for="">Nombre: </label> </td>
            <td><input v-model="nombre" required type="text" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Apellido: </label></td>
            <td><input v-model="apellido" required type="text" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Direccion: </label></td>
            <td><input v-model="direccion" required type="text"></td>
        </tr>
        <tr>
            <td><label for="">Direccion Detallada: </label></td>
            <td><input type="text" v-model="direccionDetallada" required></td>
        </tr>
        <tr>
            <td><label for="">Telefono: </label></td>
            <td><input type="number" v-model="telefono" required></td>
        </tr>
        <tr>
            <td><label for="">Profesion: </label></td>
            <td><input type="text" v-model="profesion" required></td>
        </tr>
        <tr>
            <td><label for="">Cedula: </label></td>
            <td><input v-model="cedula" required type="text" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Correo: </label></td>
            <td><input v-model="correo" required type="datetime" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Contraseña: </label></td>
            <td><input v-model="contraseña" required type="password" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Admin: </label></td>
            <td><select v-model="admin" name="" id="">
                <option value="true">Si</option>
                <option value="false">No</option>
            </select></td>
        </tr>
        


    </table>
    <table>
        <tr>
            <td><button @click="insertar()">Ingresar Doctor</button></td>
        </tr>
    </table>

  </form>
  <br>
  <label for="">{{ mensaje }}</label>
</template>

<script>
import NavarMain from '@/components/NavarMain.vue';
import NavarDoc from '@/components/NavarDoc.vue';
import { insertarDoctor, listaDoctorPorCedula } from '@/js/ProcesarDoctor';
export default {
components:{
    NavarDoc,
    NavarMain
},
data(){
    return{
        nombre:null,
        apellido:null,
        cedula:null,
        correo:null,
        contraseña:null,
        mensaje:null,
        listaDoc:[],
        admin: null,
        telefono: null,
        direccion: null,
        direccionDetallada: null,
        profesion: null
    }
},
methods:{
    async insertar(){
        this.listaDoc = await listaDoctorPorCedula(this.cedula)
        if(this.cedula.toString().length == 10){
          if(this.listaDoc.length == 0)  
            {const doctor = {
            nombre: this.nombre,
            apellido: this.apellido,
            cedula: this.cedula,
            correo: this.correo,
            contraseña: this.contraseña,
            admin: this.admin,
            direccion: this.direccion,
            telefono: this.telefono,
            direccionDetallada: this.direccionDetallada,
            profesion: this.profesion
        };
        if(
        this.nombre == null ||
        this.apellido == null ||
        this.cedula == null ||
        this.correo == null ||
        this.contraseña == null ||
        this.admin == null ||
        this.direccion == null ||
        this.direccionDetallada == null ||
        this.telefono == null||
        this.profesion == null
        ){
            this.mensaje = "Llene todos los parametros"
        }else{
            const response = await insertarDoctor(doctor);
        
            this.nombre = null,
            this.apellido = null,
            this.cedula = null,
            this.correo = null,
            this.contraseña = null,
            this.admin = null,
            this.direccion = null,
            this.direccionDetallada = null,
            this.telefono = null,
            this.profesion = null
            if(response == "Se ha ingresado correctamente"){
                this.mensaje = response;
            }else{
                this.mensaje = "No se ha podido ingresar"
            }
        }}else{
            this.mensaje = "El Doctor con cedula " + this.cedula+ " ya esta registrado"

        }}else{
            this.mensaje = "Ingrese una cedula valida"
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