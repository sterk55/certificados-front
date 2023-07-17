<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <label class="navbar-brand text-light" aria-current="page" to="/">Certificados Medicos</label> 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-if="mostrar">
          <router-link class="nav-link active" aria-current="page" to="/doctor">Doctor</router-link> 
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/doctor/paciente">Paciente</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/doctor/certificados">Certificados</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/doctor/cie10">CIE10</router-link>
        </li>
        <li class="nav-item">
          <router-link @click="salir()" class="nav-link active" aria-current="page" to="/">Cerrar Sesion</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import login from '@/js/login'

export default {
  data(){
    return{
      mostrar:true
    }
  },
  computed:{
  userLogeado(){
    return login.getUserNameLogged()
  },
  userLogeadoSN(){
    return login.getUserNameLoggedSN()
  },

},
mounted(){
  if(this.userLogeadoSN != undefined){
    if(this.userLogeado.admin == false){
    this.mostrar = false
  }else{
    this.mostrar = true
  }
  }else{
  this.$router.replace('/')
  alert("Inicie sesion primero")
}
},
methods:{
  salir(){
    login.deleteUserNameLogged()
  }
}

}
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>