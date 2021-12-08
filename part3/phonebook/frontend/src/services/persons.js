import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = (newPerson) => {
    return axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
}

const destroy = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
}

const update = (id, newPerson) => {
    return axios
        .put(`${baseUrl}/${id}`, newPerson)
        .then(response => response.data)
}

export default { getAll, create, destroy, update }