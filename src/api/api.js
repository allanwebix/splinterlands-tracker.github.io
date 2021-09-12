import axios from 'axios';

// axios.defaults.baseURL = "http://";

// axios.defaults.headers.common['xxapp-client-id'] = '92AE3F86-53F1-4919-B5AB-012454234808';

// axios.defaults.withCredentials = true;

// axios.interceptors.response.use(undefined, err => {
//     const {status, data, config } = err.response;

//     if (status === 401){
//         toast.error('Unauthorized');
//         window.location.reload();
//     }
// })

const responseBody = (response) => (response) ? response.data : null;

const request = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    postWithCancel: (url, body, cancelToken) => axios.post(url, body, cancelToken).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    del: (url) => axios.delete(url).then(responseBody),
    // postFormData :  (url, body) => {
    //     return axios({
    //         method: 'post',
    //         url: url,
    //         data: body,
    //         headers: {'Content-Type': 'multipart/form-data' }
    //         })
    //     .then(responseBody)
    // },
    // postGetAttachment : (url, body) => {
    //     return axios({
    //         method: 'post',
    //         url: url,
    //         data: body,
    //         responseType : 'blob'
    //     })
    //     .then(responseBody)
    // }
    }

    const Price = {
        getDECPrice : (curr) => request.get("https://api.coingecko.com/api/v3/simple/price?ids=dark-energy-crystals&vs_currencies="+ curr),
        getSPSPrice : (curr) => request.get("https://api.coingecko.com/api/v3/simple/price?ids=splinterlands&vs_currencies="+curr)
    }


    const Splinterlands = {
        getPlayerBalance    : (username) => request.get(`https://api.splinterlands.io/players/balances?username=${username}`),
        getPlayerSettings   : (username) => request.get(`https://api.splinterlands.io/players/details?name=${username}`),
    }
    const API = {
        Price,
        Splinterlands
    }

    export default API;