import axios from "axios";
function AxiosFunction(method, url, data) {
    return (
        axios({
            method: method,
            url: url,
            data: data,
        })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        })
    );
}

export default AxiosFunction;