import Input from "../shared/Input";
import Paragraph from "../shared/Paragraph";

import axios from "axios";
import {
    Button,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid2,
    Popover,
    TextField
} from "@mui/material";
import {useState} from "react";

function GetInputsFunction({checkToken, fields, fileName}) {
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState();

    const valueJson = new Map();
    const mapValues = new Map();

    function handleClose() {
        setIsDownloaded(false);
        setIsError(false);
    }
    function getInputsValue() {
        checkToken();
        for (let i = 0; i < fields.length; i++) {
            valueJson[fields[i]] = document.getElementById('input' + i).value;
        }
        mapValues["templateValues"] =  valueJson

        sendInputs();
    }

    function sendInputs() {
        const accessToken = localStorage.getItem('accessToken');
        // const API_URL = process.env.REACT_APP_HOST || 'http://localhost:8181';
        axios.put("/api/v1/templates/" + fileName.toString(), JSON.stringify(mapValues), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }).then(function (response) {
            console.log(response)
            setIsDownloaded(true);
        })
            .catch(function (error) {
                console.log(error);
                setIsError(true);
                setErrorText(error.response.data.errors[0].message);
            })
    }

    return (
        <>
            <Grid2 container spacing={2} sx={{display: "flex", flexDirection: "column"}}>
                {fields.map((el, index) => (
                    <div key={index}>
                        <Grid2 item>
                            <TextField
                                id={"input" + index}
                                label={el}
                                variant="outlined"
                                multiline
                                sx={{width: 300}}
                            />
                        </Grid2>
                    </div>))}
                <Grid2 item>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={getInputsValue}
                    >Создать шаблон</Button>
                    <Dialog
                        open={isDownloaded || isError}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {isDownloaded && "Шаблон успешно создан"}
                                {isError && errorText}
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Grid2>
            </Grid2>
        </>
    );
}

export default GetInputsFunction;