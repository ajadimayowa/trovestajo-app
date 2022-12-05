import axios from 'axios'
import { host } from '../../constants'

const baseUrl = `${host}/api/v1/agent`
// const baseUrl = `${host}/api/v1`

const headers = {
    'Content-Type': 'application/json'
}
export const loginAgent = (data) => {
    const requestOptions = {
        method: "post",
        url: `${baseUrl}/login-agent`,
        headers: headers,
        data: data
    }
    return axios(requestOptions);
}

export const creatAgentArtisan = (data) => {
    headers.authorization = `Bearer ${data.token}`
    const requestOptions = {
        method: "post",
        url: `${baseUrl}/create-artisan`,
        headers: headers,
        data: data.data
    }
    return axios(requestOptions);
}

export const getAgentArtisan = (payload) => {
    headers.authorization = `Bearer ${payload}`
    const requestOptions = {
        method: "get",
        url: `${baseUrl}/get-artisans`,
        headers: headers,
    }
    return axios(requestOptions);
}

export const getTotalAgents = (payload) => {
    const { skip, limit, token } = payload
    headers.authorization = `Bearer ${token}`
    const requestOptions = {
        method: "get",
        url: `${baseUrl}/admin/get-admin-agents?skip=${skip}&limit=${limit}`,
        headers: headers,
    }
    return axios(requestOptions);
}

export const getAdmin = (token) => {
    headers.authorization = `Bearer ${token}`
    const requestOptions = {
        method: "get",
        url: `${baseUrl}/admin/get-admin`,
        headers: headers,
    }
    return axios(requestOptions);
}
export const loginAdminRequest = (data) => {
    const requestOptions = {
        method: "post",
        url: `${baseUrl}/admin/login-admin`,
        headers: headers,
        data: data
    }
    return axios(requestOptions);
}

export const getAdminAgentCollection = (data) => {
    const { agent_id, token } = data
    headers.authorization = `Bearer ${token}`
    const requestOptions = {
        method: "get",
        url: `${baseUrl}/admin/thrifts/${agent_id}`,
        headers: headers,
    }
    return axios(requestOptions);
}