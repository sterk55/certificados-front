import axios from "axios"

export const insertarDoctor = async (body) =>{
    return await insertar(body)
}

export const listaDocTodos = async () =>{
    return await listaDoc()
}

export const eliminarPorCedula = async (cedula) =>{
    await eliminar(cedula)
}

export const comprobarLogin = async (cedula, constraseña) =>{
    return await login(cedula, constraseña)
}


export const listaDoctorPorCedula = async(cedula) =>{
    return await buscarDoctorPorCedula(cedula)
}

export const actualizarDoctorFinal = async(id, body) =>{
    await actualizarDoctor(id,body)
}

const insertar = async (body) =>{
    const data = axios.post(`http://localhost:8088/API/Certificados/V1/doctores`, body).then(r => r.data)
    console.log(data);
    return data

}

const listaDoc = async () =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/doctores/todos`).then(r => r.data)
    console.log(data);
    return data
}

const eliminar = async (cedula) =>{
    axios.delete(`http://localhost:8088/API/Certificados/V1/doctores/${cedula}`).then(r => r.data)
}

const login = async (cedula, constraseña) =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/doctores/login/${cedula}/${constraseña}`).then(r => r.data)
    return data
}

const buscarDoctorPorCedula = async (cedula) =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/doctores/cedula/${cedula}`).then(r => r.data)
    return data
}

const actualizarDoctor = async (id, body) =>{
    axios.put(`http://localhost:8088/API/Certificados/V1/doctores/${id}`, body).then(r => r.data)

}