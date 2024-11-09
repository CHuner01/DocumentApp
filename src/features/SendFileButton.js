
import Input from "../shared/Input";
import {useState} from "react";

import GetInputsFunction from "./GetInputsFunction";

import axios from "axios";
import {Button, Container, Dialog, DialogContent, DialogContentText, Grid2, TextField, Typography} from "@mui/material";

function SendFileButton({checkToken}) {
    const [isFileSend, setIsFileSend] = useState(false);
    const [fields, setFields] = useState([]);
    const [file, setFile] = useState();
    const [isGetInput, setIsGetInput] = useState(false);
    const [fileNamee, setFileNamee] = useState("")


    const onChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setIsGetInput(true)
        setFileNamee(selectedFile.name)
    }

    const onChangeName = (e) => {
        setFileNamee(e.target.value);
        console.log(fileNamee)
    }

    function sendFile() {
        checkToken();
        const formData = new FormData();
        formData.append('file', file);

        const accessToken = localStorage.getItem('accessToken');
        // const API_URL = process.env.REACT_APP_HOST || 'http://localhost:8181';
        axios.post("http://localhost:8181/api/v1/templates/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                name: fileNamee
            }
        }).then(function (response) {
            console.log(response)

            let tmpArray = [];
            for (let i = 0; i < response.data.replacements.length; i++) {
                tmpArray.push(response.data.replacements[i].replacementVariable)
            }

            setFields(tmpArray);
            setFileNamee(response.data.templateName);
            setIsFileSend(true);
        })
        .catch(function (error) {
            console.log(error);

        })
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
                    {isGetInput && <>
                        <Grid2 item>
                            <Typography variant="h2">{"Можете указать название шаблона"}</Typography>
                            <TextField
                                label={file.name}
                                variant="outlined"
                                onChange={onChangeName}
                                multiline
                                sx={{width: 300}}
                            />
                        </Grid2>
                        <Grid2 item>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={sendFile}
                            >Отправить файл</Button>
                        </Grid2>
                    </>}
                    <Grid2 item>
                        {isFileSend && <GetInputsFunction checkToken={checkToken} fields={fields} fileName={fileNamee}/>}
                    </Grid2>
                </Grid2>
            </Container>
        </>
    );
}

export default SendFileButton;