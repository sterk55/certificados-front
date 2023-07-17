import axios from "axios"

export const insertarPaciente = async (body) =>{
    return await insertar(body)
}

export const listaPacTodos = async() =>{
    return await listaPac()
}

export const listaPacientePorApellido = async(apellido) =>{
    return await buscarPacientePorApellido(apellido)
}

export const listaPacientePorCedula = async(cedula) =>{
    return await buscarPacientePorCedula(cedula)
}

export const pacienteEliminadoPorCedula = async (cedula) =>{
    await eliminarPacientePorCedula(cedula)
}

export const actualizarPacienteFinal = async(id, body) =>{
    await actualizarPaciente(id, body)
}
//metodos de CRUD

const insertar = async (body) =>{
    const data = axios.post(`http://localhost:8088/API/Certificados/V1/pacientes`, body).then(r => r.data)
    console.log(data);
    return data
}

const listaPac = async () =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/pacientes/todos`).then(r => r.data)
    console.log(data);
    return data
}
const buscarPacientePorApellido = async (apellido) =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/pacientes/apellido/${apellido}`).then(r => r.data)
    console.log(data);
    return data
}

const buscarPacientePorCedula = async (cedula) =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/pacientes/cedula/${cedula}`).then(r => r.data)
    console.log(data);
    return data
}

const eliminarPacientePorCedula = async (cedula) =>{
    axios.get(`http://localhost:8088/API/Certificados/V1/pacientes/eliminar/${cedula}`).then(r => r.data)
}

const actualizarPaciente = async(id, body) =>{
    axios.put(`http://localhost:8088/API/Certificados/V1/pacientes/${id}`, body).then(r => r.data)

}



