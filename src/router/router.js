import { createRouter, createWebHashHistory } from "vue-router";

const routes=[
    {
        path: '/',
        component: () => import('../components/PaginaMain')
    },
    {
        path: '/doctor',
        component: () => import('../pages/principalDoctor')
    },
    {
        path: '/doctor/paciente',
        component: () => import('../pages/principalPaciente')
    },
    {
        path: '/doctor/cie10',
        component: () => import('../pages/principalCIE10')
    },
    {
        path: '/doctor/certificados',
        component: () => import('../pages/principalCertificados')
    },
    {
        path: '/doctor/ingresar',
        component: () => import('../pages/ingresarDoctor')
    },
    {
        path: '/doctor/buscar',
        component: () => import('../pages/buscarDoctor')
    },
    {
        path: '/doctor/paciente/ingresar',
        component: () => import('../pages/ingresarPaciente')
    },
    {
        path: '/doctor/paciente/buscar',
        component: () => import('../pages/buscarPaciente')
    },
    {
        path: '/doctor/cie10/ingresar',
        component: () => import('../pages/ingresarCIE10')
    },
    {
        path: '/doctor/cie10/buscar',
        component: () => import('../pages/buscarCIE10')
    },
    {
        path: '/doctor/certificados/ingresar',
        component: () => import('../pages/ingresarCertificado')
    },
    {
        path: '/doctor/certificados/buscar',
        component: () => import('../pages/buscarCertificados')
    },
    {
        path: '/doctor/certificados/buscar/cedula/:cedula-:tipo',
        name:'cedula',
        props:true,
        component: () => import('../pages/buscarCertificadoPorCedulaDefinida')
    },
    {
        path: '/doctor/certificados/buscarCedula' ,
        component: () => import('../pages/buscarCertificadoPorCedula')
    },
    {
        path: '/doctor/paciente/buscarApellido' ,
        component: () => import('../pages/buscarPacientePorApellido')
    },
    {
        path: '/doctor/certificados/buscarFecha' ,
        component: () => import('../pages/buscarCertificadoPorFecha')
    },
    {
        path: '/doctor/paciente/buscarCedula' ,
        component: () => import('../pages/buscarPacientePorCedula')
    },
    {
        path: '/doctor/cie10/buscarDescipcion' ,
        component: () => import('../pages/buscarCiePorDescripcion')
    },
    {
        path: '/doctor/paciente/editarPaciente/:cedulas-:nombres-:apellidos-:direccions-:fechaNacimientos-:codigoSeguros-:telefonos-:ids' ,
        name:'editar',
        props:true,
        component: () => import('../pages/editarPaciente')
    },
    {
        path: '/doctor/buscarCedula',
        component: () => import('../pages/buscarDoctorPorCedula')
    },
    {
        path: '/doctor/editarDoctor/:cedulas-:nombres-:apellidos-:correos-:contrasenas-:admins-:ids' ,
        name:'editarDoc',
        props:true,
        component: () => import('../pages/editarDoctor')
    },
    {
        path: '/doctor/certificado/imprimir/:cedulaPaciente--:cedulaDoctor--:fechaGeneracion--:fechaInicio--:fechaFin--:diasValidos',
        name:'imprimir',
        props:true,
        component: () => import('../pages/imprimirPdf')
    },


]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router