import axios from 'axios'
import { host } from '../../constants'

const baseUrl = `${host}/api/v1/agent`
// const baseUrl = `${host}/api/v1`

const headers = {
    'Accept': 'application/json'
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

export const createAgentArtisan = (token, data) => {
    headers.authorization = `Bearer ${token}`
    headers['Content-Type'] = 'multipart/form-data'
    const requestOptions = {
        method: "post",
        url: `${baseUrl}/create-artisan`,
        headers: headers,
        data: data
    }
    return axios(requestOptions);
}

export const getAgentArtisan = (page, limit, payload) => {
    headers.authorization = `Bearer ${payload}`
    const requestOptions = {
        method: "get",
        url: `${baseUrl}/get-artisans?page=${page}&limit=${limit}`,
        headers: headers,
    }
    return axios(requestOptions);
}

export const getTotalAgents = (payload) => {
    const { page, limit, token } = payload
    headers.authorization = `Bearer ${token}`
    const requestOptions = {
        method: "get",
        url: `${baseUrl}/admin/get-admin-agents?skip=${skip}&limit=${limit}`,
        headers: headers,
    }
    return axios(requestOptions);
}

export const collectThrift = (data) => {
    headers.authorization = `Bearer ${data.token}`
    const requestOptions = {
        method: "post",
        url: `${baseUrl}/collect-thrift`,
        headers: headers,
        data: data.data
    }
    return axios(requestOptions);
}

export const getAgentCollection = (data) => {
    const { agent_id, token,page, limit } = data
    headers.authorization = `Bearer ${token}`
    const requestOptions = {
        method: "get",
        url: `${baseUrl}/collections/${agent_id}?page=${page}&limit=${limit}`,
        headers: headers,
    }
    return axios(requestOptions);
}

export const depositCollectedFunds = (data) => {
    const { collection_id, payment_reference, location, token } = data
    headers.authorization = `Bearer ${token}`
    const requestOptions = {
        method: "POST",
        url: `${baseUrl}/deposit-funds?payment_reference=${payment_reference}&collection_id=${collection_id}&location=${location}`,
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

export const getTodayThrift = (data) => {
    const { date_paid, token } = data
    headers.authorization = `Bearer ${token}`
    const requestOptions = {
        method: "get",
        url: `${baseUrl}/today-thrift?date_paid=${date_paid}`,
        headers: headers,
    }
    return axios(requestOptions);
}