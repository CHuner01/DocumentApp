import axios from "axios";
function AxiosFunction(method, url, data, responseFunction ) {
    return (
        axios({
            method: method,
            url: url,
            data: data,
        })
        .then(function (response) {
            //Здесь вставка функции обработки резов
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    );
}

export default AxiosFunction;