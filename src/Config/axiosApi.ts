import axios from "axios";

const baseUrl = "http://localhost:3000";

const api = axios.create({
    baseURL:baseUrl,
    timeout: 20*1000,
    timeoutErrorMessage:"Check Internet Connection"
})

api.interceptors.request.use(
    ((req) =>{
        return req
    }),
    ((error) =>{
        return Promise.reject(error)
    })
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error("Response error:", error.response.data);
            switch (error.response.status) {
                case 400:
                    console.error("Bad Request");
                    break;
                case 401:
                    console.error("Unauthorized - Redirecting to login");
                    break;
                case 403:
                    console.error("Forbidden");
                    break;
                case 404:
                    console.error("Not Found");
                    break;
                case 500:
                    console.error("Internal Server Error");
                    break;
                default:
                    console.error("Unhandled Error:", error.response.status);
            }
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error:", error.message);
        }
        return Promise.reject(error);
    }
);


export default api