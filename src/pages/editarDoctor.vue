<template>
    <navar-main-vue></navar-main-vue>
    <navar-doc-vue></navar-doc-vue>
    <br>
    <h1>Editar Doctor con numero de cedula: {{ cedulas }}</h1>
    <br>
    <table>
        <tr>
            <td><label for="">Nombre: </label></td>
            <td><input type="text" required v-model="nombre" id="idNombre"></td>
            <td><label for="">{{ nombres }}</label></td>
        </tr>
        <tr>
            <td><label for="">Apellido: </label></td>
            <td><input type="text" required v-model="apellido" id="idApellido"></td>
            <td><label for="">{{ apellidos }}</label></td>
        </tr>
        <tr>
            <td><label for="">Direccion: </label></td>
            <td><input type="text" required v-model="direccion"></td>
            <td><label for="">{{ direccions }}</label></td>
        </tr>
        <tr>
            <td><label for="">Direccion Detallada: </label></td>
            <td><input type="text" required v-model="direccionDetallada"></td>
            <td><label for="">{{ direccionDetalladas }}</label></td>
        </tr>
        <tr>
            <td><label for="">Profesion: </label></td>
            <td><input type="text" required v-model="profesion"></td>
            <td><label for="">{{ profesions }}</label></td>
        </tr>
        <tr>
            <td><label for="">Telefono: </label></td>
            <td><input type="number" required v-model="telefono"></td>
            <td><label for="">{{ telefonos }}</label></td>
        </tr>
        <tr>
            <td><label for="">Correo: </label></td>
            <td><input type="email" required v-model="correo" id="idCorreo"></td>
            <td><label for="">{{ correos }}</label></td>
        </tr>
        <tr>
            <td><label for="">Contraseña: </label></td>
            <td><input type="password" required v-model="contraseña" id="idContrasela"></td>
            <td><label for="">{{ contrasenas }}</label></td>
        </tr>
        <tr>
            <td><label for="">Admin: </label></td>
            <td><select v-model="admin" required name="" id="idAdmin">
                <option value="true">Si</option>
                <option value="false">No</option>
            </select></td>
            <td><label for="">{{ admins }}</label></td>
        </tr>
    </table>
    <br>
    <table>
        <tr>
            <td><button @click="actualizar()">Actualizar Doctor</button></td>
        </tr>
        <tr>
            <td><label for="">{{ mensaje }}</label></td>
        </tr>
    </table>
</template>

<script>
import NavarMainVue from '@/components/NavarMain.vue'
import NavarDocVue from '@/components/NavarDoc.vue'
import { actualizarDoctorFinal } from '@/js/ProcesarDoctor'
export default {
    components:{
        NavarMainVue,
        NavarDocVue
    },
    data(){
        return{
            nombre:null,
            apellido:null,
            correo: null,
            contraseña: null,
            admin: null,
            mensaje: null,
            direccion:null,
            direccionDetallada:null,
            telefono:null,
            profesion:null
        }
    },
    props:{
        cedulas:{
            type:String
        },
        nombres:{
            type:String
        },
        apellidos:{
            type:String
        },
        correos:{
            type:String
        },
        contrasenas:{
            type:String
        },
        admins:{
            type: Boolean
        },
        profesions:{
            type:String
        },
        direccions:{
            type:String
        },
        direccionDetalladas:{
            type:String
        },
        telefonos:{
            type:String
        }
        ,ids:null
    },
    methods:{
        valoresDefinidos(){
            document.getElementById("idNombre").value = this.nombres
            document.getElementById("idApellido").value = this.apellidos
            document.getElementById("idCorreo").value = this.correos
            document.getElementById("idContrasela").value = this.contrasenas
        },
        async actualizar(){
            console.log(this.cedulas);
            const doctor = {
            cedula: this.cedulas,
            nombre: this.nombre,
            apellido: this.apellido,
            correo: this.correo,
            contraseña: this.contraseña,
            admin: this.admin,
            direccion: this.direccion,
            direccionDetallada: this.direccionDetallada,
            profesion: this.profesion,
            telefono: this.telefono
            };
        if(
            this.nombre == null   ||
            this.apellido == null  ||
            this.correo == null  ||
            this.contraseña == null  ||
            this.admin == null
        ){
            console.log("mmm");
            this.mensaje = "Llene todos los parametros"
        }else{
            console.log("si entra");
            await actualizarDoctorFinal(this.ids, doctor);
            this.nombre = null,
            this.apellido = null,
            this.correo = null,
            this.contraseña = null,
            this.admin = null,
            this.direccion = null,
            this.direccionDetallada = null,
            this.telefono = null,
            this.profesion = null
            this.mensaje = "Se ha actualizado correctamente"
            alert("Se ha actualizado correctamente")
            this.regresar()
        }
        },
        regresar(){
            this.$router.replace('/doctor/buscar')
        }
    },
    mounted(){
        this.valoresDefinidos()
    }
}
</script>

<style>
table{
    margin: 0 auto;
}
</style>