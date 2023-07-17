<template>
<nav class="navbar sticky-top navbar-expand-lg navbar-dark" style="background-color: #72f27f;">
  <div class="container-fluid">
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active text-dark" aria-current="page" to="/doctor">Doctor</router-link> 
        </li>
        <li class="nav-item">
          <router-link class="nav-link active text-dark" aria-current="page" to="/doctor/ingresar">Ingresar Doctor</router-link> 
        </li>
        <li class="nav-item">
          <router-link class="nav-link active text-dark" aria-current="page" to="/doctor/buscar">Doctores</router-link> 
        </li>
        <li class="nav-item">
          <router-link class="nav-link active text-dark" aria-current="page" to="/doctor/buscarCedula">Buscar Doctor Por Cedula</router-link> 
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import login from '@/js/login'

export default {
computed:{
  userLogeado(){
    return login.getUserNameLogged()
  }
},
mounted(){
    if(this.userLogeado.admin == false){
      this.$router.replace('/doctor/paciente')
    }
}
}
</script>

<style>

</style>