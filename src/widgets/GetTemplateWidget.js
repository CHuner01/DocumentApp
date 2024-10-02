
import {useEffect, useState} from "react";
import axios from "axios";
import Paragraph from "../shared/Paragraph";
import Input from "../shared/Input";

import {
    Autocomplete,
    Button,
    Container,
    FormControl, Grid2,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";

function GetTemplateWidget({checkToken}) {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState("Шаблон");
    const [isTemplateSelected, setIsTemplateSelected] = useState(false);
    const [isInputs, setIsInputs] = useState(false);
    const [fields, setFields] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    var fileDownload = require('js-file-download');

    const valueJson = new Map();
    const mapValues = new Map();
    const onChange = (event, value) => {
        setSelectedTemplate(value);
        setIsTemplateSelected(true);
    }
    function getTemplates() {
        checkToken();
        const accessToken = localStorage.getItem('accessToken');
        axios.get("http://localhost:8181/api/v1/templates",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(function (response) {
                console.log(response)
                let tmpArray = [];
                for (let i = 0; i < response.data.length; i++) {
                    tmpArray.push(response.data[i].templateName)
                }

                setTemplates(tmpArray);

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    function getTemplateInputs() {
        checkToken();
        const accessToken = localStorage.getItem('accessToken');
        axios.get("http://localhost:8181/api/v1/templates/" + selectedTemplate.toString(), {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(function (response) {
                console.log(response)
            setFields(Object.keys(response.data.listOfFieldsReplaceTo));
            setDescriptions(Object.values(response.data.listOfFieldsReplaceTo));
        })
            .catch(function (error) {
                console.log(error);
            })
        setIsInputs(true)
    }

    function getInputsValue() {
        checkToken();
        for (let i = 0; i < fields.length; i++) {
            valueJson[fields[i]] = document.getElementById('input' + i).value;
        }
        mapValues["templateName"] = selectedTemplate;
        mapValues["replacements"] =  valueJson;
        sendInputs();
    }

    function sendInputs() {
        checkToken();
        const accessToken = localStorage.getItem('accessToken');
        axios.post("http://localhost:8181/api/v1/documents/download", JSON.stringify(mapValues), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
            },
            responseType: 'blob'
        }).then(function (response) {
            fileDownload(response.data, 'filename.docx');
        })
            .catch(function (error) {
                console.log(error);
            })
    }
    useEffect(() => {
        getTemplates();
    }, []);


    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h1">Создать файл по шаблону</Typography>
                <Typography variant="h2">Выбери шаблон</Typography>

                <Grid2 container spacing={1} sx={{display: "flex", flexDirection: "column", my: 2}}>
                    <Grid2 item>
                        <Autocomplete
                            disablePortal
                            options={templates}

                            sx={{ width: 300}}
                            renderInput={(params) => <TextField {...params} label="Шаблон" />}
                            onChange={onChange}
                        />
                    </Grid2>
                    <Grid2 item>
                        {isTemplateSelected && <Button
                            onClick={getTemplateInputs}
                            variant="contained"
                            size="large"
                            sx={{"&:hover": {bgcolor: "primary.dark"}}}
                        >Ввести данные</Button>}
                    </Grid2>

                    {descriptions.map((el, index) => (
                        <div key={index}>
                            <Grid2 item>
                                <Typography variant="h2">{el}</Typography>
                                <TextField
                                    id={"input" + index}
                                    variant="outlined"
                                    multiline
                                    sx={{width: 300 }}
                                />
                            </Grid2>
                        </div>))}

                    <Grid2 item>
                        {isInputs && <Button
                            variant="contained"
                            size="large"
                            sx={{"&:hover": {bgcolor: "primary.dark"}}}
                            onClick={getInputsValue}
                        >Скачать файл</Button>}
                    </Grid2>
                </Grid2>
            </Container>
        </>
    );
}

export default GetTemplateWidget;