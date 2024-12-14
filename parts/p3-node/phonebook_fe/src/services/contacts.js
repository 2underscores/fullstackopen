import axios from "axios";

// const baseUrl = 'http://localhost:3002/persons'; // Json server
// const baseUrl = 'http://localhost:3001/api/persons'; // Express dev server
const baseUrl = '/api/persons'; // Prod


const list = () => {
    return axios
        .get(baseUrl)
        .then(({ data }) => data)
}

const get = (id) => {
    return axios
        .get(`${baseUrl}/${id}`)
        .then(({ data }) => data)
}

const create = (contact) => {
    return axios
        .post(baseUrl, contact)
        .then(({ data }) => data)
}

const update = (id, contact) => {
    return axios
        .put(`${baseUrl}/${id}`, contact)
        .then(({ data }) => data)
}

const remove = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(({ data }) => data) // May break?
}

export default { list, get, create, update, remove }