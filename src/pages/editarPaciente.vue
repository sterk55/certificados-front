<template>
    <navar-main-vue></navar-main-vue>
    <navar-pac-vue></navar-pac-vue>
    <br>
    <h1>Editar Paciente con numero de cedula: {{ cedulas }} </h1>
    <br>
    
    <table>
        <tr>
            <td><label for="">Nombre: </label> </td>
            <td><input v-model="nombre" required type="text" name="" id="idNombre"></td>
            <td><label for="" id="">{{ nombres }}</label></td>
        </tr>
    
        <tr>
            <td><label for="">Apellido: </label></td>
            <td><input v-model="apellido" required type="text" name="" id="idApellido"></td>
            <td><label for="">{{ apellidos }}</label></td>
        </tr>
        <tr>
            <td><label for="">Fecha de Nacimiento: </label></td>
            <td><input v-model="fechaNacimiento" required type="date" name="" id="idFecha"></td>
            <td><label for="">{{ fechaNacimientos }}</label></td>
        </tr>
        <tr>
            <td><label for="">Codigo Seguro: </label></td>
            <td><input v-model="codigoSeguro" required type="text"  name="" id="idCodigo"></td>
            <td><label for="">{{ codigoSeguros }}</label></td>
        </tr>
        <tr>
            <td><label for="">Direccion: </label></td>
            <td><input v-model="direccion" required type="text" name="" id="idDireccion"></td>
            <td><label for="">{{ direccions }}</label></td>
        </tr>
        <tr>
            <td><label for="">Telefono: </label></td>
            <td><input v-model="telefono" required type="number" name="" id="idTelefono"></td>
            <td><label for="">{{ telefonos }}</label></td>
        </tr>
        <tr>
            <td><label for="">CIE10: </label></td>
            <td>
                <select name="" id="">
                    <option value="r">11025</option>
                    <option value="t">11026</option>
                </select>
            </td>
        </tr>


    </table>
    <br>
    <table>
        <tr>
            <td><button @click="actualizar()">Editar Paciente</button></td>
        </tr>
    </table>
<br>
<label for="">{{ mensaje }}</label>
  
</template>

<script>
import NavarMainVue from '@/components/NavarMain.vue'
import NavarPacVue from '@/components/NavarPac.vue'
import { actualizarPacienteFinal } from '@/js/ProcesarPaciente'
export default {
    components:{
        NavarMainVue,
        NavarPacVue
    },
    data(){
        return{
            nombre:null,
            apellido:null,
            direccion:null,
            telefono:null,
            mensaje:null,
            fechaNacimiento:null,
            codigoSeguro:null

        }
    },
    props:{
        cedulas:{
            type:String,
            default:'hola'
        },
        nombres:{
            type:String
        },
        apellidos:{
            type:String
        },
        direccions:{
            type:String
        },
        telefonos:{
            type:String
        },
        fechaNacimientos:{
            type:Date
        },
        codigoSeguros:{
            type:String
        },
        ids:null



    },
    methods:{
        valoresDefinidos(){
            document.getElementById("idNombre").value = this.nombres
            document.getElementById("idApellido").value = this.apellidos
            document.getElementById("idDireccion").value = this.direccions
            document.getElementById("idTelefono").value = this.telefonos

        },
        async actualizar(){
            const paciente = {
                cedula: this.cedulas,
                nombre : this.nombre,
                apellido: this.apellido,
                direccion: this.direccion,
                telefono: this.telefono,
                fechaNacimiento: this.fechaNacimiento,
                codigoSeguro: this.codigoSeguro
            };
            if(
                this.nombre == null ||
                this.apellido == null ||
                this.direccion == null ||
                this.telefono == null ||
                this.fechaNacimiento == null  ||
                this.codigoSeguro == null
            ){
                this.mensaje = "Llene todos los parametros"
            }else{
                await actualizarPacienteFinal(this.ids ,paciente);
                this.nombre = null,
                this.apellido = null,
                this.direccion = null,
                this.telefono = null,
                this.fechaNacimiento = null,
                this.codigoSeguro = null,
                this.mensaje = "Se ha actualizado correctamente"
                alert("Se ha actualizado correctamente")
                this.regresar()
            }

        },
        regresar(){
            this.$router.replace('/doctor/paciente/buscar')

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