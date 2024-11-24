import axios from "axios";

 const AxiosRequest = axios.create({
    baseURL: 'http://localhost:6060'
});


export default AxiosRequest;