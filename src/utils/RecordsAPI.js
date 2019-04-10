import axios from  'axios'

const api = process.env.REACT_APP_RECORDS_API_URL || "https://5cab08d0c85e05001452e2da.mockapi.io"


export const getAll = ()=> axios.get(`${api}/api/v1/records`)

export const addRecode= (body)=> axios.post(`${api}/api/v1/records`,body)

export const  update = (id,body)=> axios.put(`${api}/api/v1/records/${id}`,body)

export const  delectRecode=(id,body)=> axios.delete(`${api}/api/v1/records/${id}`,body)