import axios from "axios";


const token   = "";
const Custon_Axios = axios.create({
baseURL : 'http://localhost:8000/api',
headers: {
    Authorization : "Bearer" + token,
    Accept: "*/*",
    "Contect-Type" : "application/json"
},
timeout: 500000,

})

export default Custon_Axios;