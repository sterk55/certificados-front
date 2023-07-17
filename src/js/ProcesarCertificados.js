import axios from "axios"


export const insertarCer = async (body) =>{
    return await insertar(body)
}

export const listaCertificadosTodos = async () =>{
    return await listaCertificados()
}

export const listaCertificadoPorCedulaP = async (cedula) =>{
    return await buscarCertificadoCedulaP(cedula)
}

export const listaCertificadoPorCedulaD = async (cedula) =>{
    return await buscarCertificadoCedulaD(cedula)
}

export const listaCertificadoPorFecha = async(fecha) =>{
    return await buscarCertificadoPorFecha(fecha)
}


const insertar = async(body) =>{
    const data = axios.post(`http://localhost:8088/API/Certificados/V1/certificados`, body).then(r => r.data)
    console.log(data);
    return data
}

const listaCertificados = async() =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/certificados/todos`).then(r => r.data)
    console.log(data);
    return data
}

const buscarCertificadoCedulaP = async(cedula) =>{
    console.log("Se envia");
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/certificados/cedulaPaciente/${cedula}`).then(r => r.data)
    console.log(data);
    return data
}

const buscarCertificadoCedulaD = async(cedula) =>{
    console.log("Se envia");
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/certificados/cedulaDoctor/${cedula}`).then(r => r.data)
    console.log(data);
    return data
}

const buscarCertificadoPorFecha = async(fecha) =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/certificados/fecha/${fecha}`).then(r => r.data)
    console.log(data);
    return data
}