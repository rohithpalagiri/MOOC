import axios from 'axios'
const baseUrl = '/api/persons';

const createContact = personObject =>{
    const request = axios.post(baseUrl, personObject)
    
    return request.then(response => response.data)
}

const deleteContact = (id) =>{
    const request = axios.delete(baseUrl + '/' + id.toString())

    return request.then(response => console.log('Delete data: ', response.data))
}

const updateContact = (id, personObject) =>{
    return axios.put(baseUrl + '/' + id.toString(), personObject);
}

export default {createContact, deleteContact, updateContact, baseUrl}