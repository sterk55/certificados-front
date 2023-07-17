import axios from "axios"


export const insertarCie = async (body) =>{
    return await insertar(body)
}

export const listaCieTodos = async() =>{
    return await listaCie()
}

export const listaCiePorDescripcion = async(descripcion) =>{
    return await buscarCiePorDescripcion(descripcion)
}

const insertar = async (body) =>{
    const data = axios.post(`http://localhost:8088/API/Certificados/V1/cie10`, body).then(r => r.data)
    console.log(data);
    return data
    

}

const listaCie = async() =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/cie10/todos`).then(r => r.data)
    console.log(data);
    return data
}

const buscarCiePorDescripcion = async(descripcion) =>{
    const data = axios.get(`http://localhost:8088/API/Certificados/V1/cie10/descripcion/${descripcion}`).then(r => r.data)
    console.log(data);
    return data
}
