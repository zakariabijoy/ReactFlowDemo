import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:7114/api";

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request ={
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body:{}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body:{}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const ReactFlow ={
    create: (data: any) => request.post<void>('/ReactFlows', data),
    list: () => request.get<any[]>('/ReactFlows'),
    delete: (id:string) => request.del<void>(`/ReactFlows/${id}`),
    update: (id:string, data: any) => request.put<void>(`/ReactFlows/${id}`, data),
    getById: (id: string) => request.get<any>(`/ReactFlows/${id}`)
}

const agent = {
    ReactFlow
}

export default agent