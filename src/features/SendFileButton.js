import Button from "../shared/Button";
import Input from "../shared/Input";
import {useState} from "react";
import AxiosFunction from "./AxiosFunction";
import GetInputsFunction from "./GetInputsFunction";
import getInputsFunction from "./GetInputsFunction";
import axios from "axios";

function SendFileButton() {
    const [isFileSend, setIsFileSend] = useState(false);
    const [fields, setFields] = useState([]);
    const [file, setFile] = useState();
    const [isGetInput, setIsGetInput] = useState(false);


    const onChange = (e) => {
        setFile(e.target.files[0]);
        setIsGetInput(true)
        console.log(file)
    }

    // console.log(document.getElementById('uploadInput').files[0])
    async function Send() {
        try {
            const formData = new FormData();
            formData.append('file', file);
            console.log(file)
            await axios.post("http://localhost:8181/api/v1/templates/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    name: "test.docx"
                }
            }).then(function (response) {
                setFields(response.data.listOfFields);
            })
            .catch(function (error) {
                console.log(error);
            })
        } catch (error) {
            console.log(error)
        }
        setIsFileSend(true);
    }

    return (
        <>
            <Input id={"uploadInput"} type={"file"} onChange={onChange} accept={".doc, .docx"} />
            {isGetInput && <Button title={"Отправить файл"} clickFunction={Send}/>}
            {isFileSend && <GetInputsFunction fields={fields}/>}

        </>
    );
}

export default SendFileButton;