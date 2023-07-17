<template>
    <navar-main></navar-main>
    <navar-pac></navar-pac>
    <br>
  <h1>Ingresar Paciente</h1>
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
            <td><label for="">Cedula: </label></td>
            <td><input v-model="cedula" required type="text" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Fecha de Nacimiento: </label></td>
            <td><input v-model="fechaNacimiento" required type="date" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Codigo Seguro: </label></td>
            <td><input v-model="codigoSeguro" required type="text" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Direccion: </label></td>
            <td><input v-model="direccion" required type="text" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">Telefono: </label></td>
            <td><input v-model="telefono" required type="number" name="" id=""></td>
        </tr>
        <tr>
            <td><label for="">CIE10: </label></td>
            <td>
                <select v-model="cie" name="" id="">
                    <option v-for="l in listaCie" v-bind:key="l">{{l.codigo}}</option>
                </select>
                <button @click="mostrarOtroCie()" v-if="ocultarPBoton">+</button>
                <select name="" id="" v-if="mostrarOtro">
                    <option v-for="la in listaCie2" v-bind:key="la">{{la.codigo}}</option>
                </select>
                <button v-if="ocultarSBoton">+</button>
            </td>
        </tr>


    </table>
    <table>
        <tr>
            <td><button @click="insertar">Ingresar Paciente</button></td>
        </tr>
    </table>

  </form>
  <br>
  <label for="">{{ mensaje }}</label>
</template>

<script>
import NavarMain from '@/components/NavarMain.vue';
import NavarPac from '@/components/NavarPac.vue';
import { insertarPaciente, listaPacientePorCedula } from '@/js/ProcesarPaciente';
import { listaCieTodos } from '@/js/ProcesarCie';
export default {
components:{
    NavarPac,
    NavarMain
},
data(){
    return{
        nombre:null,
        apellido:null,
        cedula:null,
        fechaNacimiento:null,
        codigoSeguro:null,
        direccion:null,
        telefono:null,
        mensaje:null,
        cie:null,
        listaCie:[],
        listaCie2:[],
        mostrarOtro:false,
        ocultarPBoton:true,
        ocultarSBoton:false,
        listaPac:[]
    }
},
methods:{
    
    async insertar() {
        
        this.listaPac = await listaPacientePorCedula(this.cedula)
        if(this.cedula.toString().length == 10){
            if(this.telefono.toString().length == 9){
            if(this.listaPac.length == 0){
        const paciente = {
        nombre: this.nombre,
        apellido: this.apellido,
        cedula: this.cedula,
        fechaNacimiento: this.fechaNacimiento,
        codigoSeguro: this.codigoSeguro,
        direccion: this.direccion,
        telefono: this.telefono
     };
     if(
        this.nombre == null ||
        this.apellido == null ||
        this.cedula == null ||
        this.fechaNacimiento == null ||
        this.codigoSeguro == null ||
        this.direccion == null ||
        this.telefono == null 
     ){
        this.mensaje = "Llene todos los parametros"
     }else{
        const response = await insertarPaciente(paciente);
        this.nombre = null,
        this.apellido = null,
        this.cedula = null,
        this.fechaNacimiento = null,
        this.codigoSeguro = null,
        this.direccion = null,
        this.telefono = null,
        this.mensaje = ""
        if(response == "Se ha ingresado correctamente"){
            this.mensaje = response;
        }else{
            this.mensaje = "No se ha podido registrar"
        }
        }}else{
            this.mensaje = "El paciente con cedula "+this.cedula+" ya esta registrado"
        }}else{
            this.mensaje = "Ingrese un telefono valido"
        }
    }else{
            this.mensaje = "Ingrese una cedula valida"
        }
     },
     async listaCie10(){
        this.listaCie = await listaCieTodos()
        this.listaCie2 = await listaCieTodos()

     },
     mostrarOtroCie(){
        this.mostrarOtro = true
        this.ocultarPBoton = false
        this.ocultarSBoton = true
     }
    },
    mounted(){
        this.listaCie10()
    }
}

</script>

<style>
table{
    margin: 0 auto;
}
button{
    margin: 0 15px;
}
label, select{
    margin: 5px 7px;
}
</style>