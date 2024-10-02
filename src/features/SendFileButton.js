
import Input from "../shared/Input";
import {useState} from "react";

import GetInputsFunction from "./GetInputsFunction";

import axios from "axios";
import {Button, Container, Grid2, Typography} from "@mui/material";

function SendFileButton({checkToken}) {
    const [isFileSend, setIsFileSend] = useState(false);
    const [fields, setFields] = useState([]);
    const [file, setFile] = useState();
    const [isGetInput, setIsGetInput] = useState(false);
    const [fileName, setFileName] = useState("")


    const onChange = (e) => {
        setFile(e.target.files[0]);
        setIsGetInput(true)
    }

    async function sendFile() {
        try {
            checkToken();
            const formData = new FormData();
            formData.append('file', file);
            console.log(file)
            const accessToken = localStorage.getItem('accessToken');
            await axios.post("http://localhost:8181/api/v1/templates/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    name: file.name
                }
            }).then(function (response) {
                console.log(response)
                setFields(response.data.listOfFields);
                setFileName(response.data.templateName);

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
            <Container>
                <Typography variant="h1">Создать шаблон</Typography>
                <Grid2 container spacing={2} sx={{display: "flex", flexDirection: "column"}}>
                    <Grid2 item>
                        <Button
                            variant="contained"
                            component="label"
                            size="large"
                        >
                            Выберите файл
                            <input
                                type="file"
                                hidden
                                onChange={onChange}
                                accept={".doc, .docx"}
                            />
                        </Button>
                    </Grid2>
                    <Grid2 item>
                        {isGetInput && <Button
                            variant="outlined"
                            size="large"
                            onClick={sendFile}
                        >Отправить файл</Button>}
                    </Grid2>
                    <Grid2 item>
                        {isFileSend && <GetInputsFunction checkToken={checkToken} fields={fields} fileName={fileName}/>}
                    </Grid2>
                </Grid2>
            </Container>
        </>
    );
}

export default SendFileButton;