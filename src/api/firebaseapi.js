import axios from "axios"

export function fireBaseApi() {
    return axios.create({
        headers:{
            // Authorization:getTokenFromCookie(),
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',

        },
        // transformRequest: [(data) => JSON.stringify(data.data)],
        baseURL:"https://workflows-600eb-default-rtdb.firebaseio.com/"
    })
}