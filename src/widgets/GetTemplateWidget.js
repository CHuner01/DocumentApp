
import {useEffect, useState} from "react";
import axios from "axios";
import Paragraph from "../shared/Paragraph";
import Input from "../shared/Input";

import {
    Autocomplete,
    Button,
    Container, Dialog, DialogContent, DialogContentText, Fab,
    FormControl, Grid2,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from '@mui/icons-material/Delete';
import fileDownload from "js-file-download";
function GetTemplateWidget({checkToken, isAdmin}) {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState("Шаблон");
    const [isTemplateSelected, setIsTemplateSelected] = useState(false);
    const [isInputs, setIsInputs] = useState(false);
    const [fields, setFields] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    const [isError, setIsError] = useState(false);
    const [isTemplateDeleted, setIsTemplateDeleted] = useState(false);

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
        const API_URL = process.env.REACT_APP_HOST || 'http://localhost:8181';
        axios.get(API_URL + "/api/v1/templates",
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
        const API_URL = process.env.REACT_APP_HOST || 'http://localhost:8181';
        axios.get(API_URL + "/api/v1/templates/" + selectedTemplate.toString(), {
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
        const API_URL = process.env.REACT_APP_HOST || 'http://localhost:8181';
        axios.post(API_URL + "/api/v1/documents/download", JSON.stringify(mapValues), {
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
                setIsError(true);
            })
    }

    function deleteTemplate() {
        checkToken();
        const accessToken = localStorage.getItem('accessToken');
        const API_URL = process.env.REACT_APP_HOST || 'http://localhost:8181';
        axios.delete(API_URL + "/api/v1/templates/" + selectedTemplate.toString(), {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(function (response) {
            console.log(response);
            getTemplates();
            setIsTemplateSelected(false);
            setIsTemplateDeleted(isTemplateDeleted => !isTemplateDeleted);

            setIsInputs(false);
            setDescriptions([])
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
                        <Grid2 container spacing={2} sx={{display: "flex", flexDirection: "row"}}>
                            <Grid2 item>
                                <Autocomplete
                                    disablePortal
                                    options={templates}
                                    sx={{width: 300}}
                                    renderInput={(params) => <TextField {...params} label="Шаблон" />}
                                    onChange={onChange}
                                    key={isTemplateDeleted}
                                />
                            </Grid2>
                            <Grid2 item>
                                {isAdmin && <Fab size="medium" color="primary" onClick={deleteTemplate}>
                                    <DeleteIcon />
                                </Fab>}
                            </Grid2>
                        </Grid2>
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
                                    sx={{width: 300}}
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

                        <Dialog
                            open={isError}
                            onClose={() => setIsError(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {isError && "Файл шаблона не корректен"}
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    );
}

export default GetTemplateWidget;