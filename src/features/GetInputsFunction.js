import Input from "../shared/Input";
import Paragraph from "../shared/Paragraph";

import axios from "axios";
import {
    Autocomplete,
    Button,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    Grid2, InputLabel, MenuItem, NativeSelect,
    Popover, Select,
    TextField
} from "@mui/material";
import {useState} from "react";

function GetInputsFunction({checkToken, fields, fileName}) {
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState("");


    const mapValues = new Map();
    let arrayReplacements = [];

    function handleClose() {
        setIsDownloaded(false);
        setIsError(false);
    }
    function getInputsValue() {
        checkToken();
        for (let i = 0; i < fields.length; i++) {
            if (document.getElementById('inputNumber' + i).value < 0 ||
                document.getElementById('inputNumber' + i).value > 100) {
                setIsError(true);
                setErrorText("Количество дожно быть в пределах от 1 до 100");
                return
            }
            arrayReplacements.push({
                "replacementId": i,
                "replacementType": document.getElementById('inputType' + i).value,
                "replacementVariable": fields[i],
                "replacementDescription": document.getElementById('inputDescription' + i).value,
                "replacementResultText": null,
                "replacementResultImageName": null,
                "replacementResultTableNames": null,
                "replacementAmount": document.getElementById('inputNumber' + i).value,
            })
        }
        mapValues["templateName"] = fileName;
        mapValues["replacements"] = arrayReplacements;

        sendInputs();
        console.log(JSON.stringify(mapValues))
    }

    function sendInputs() {
        const accessToken = localStorage.getItem('accessToken');
        // const API_URL = process.env.REACT_APP_HOST || 'http://localhost:8181';
        axios.put("http://localhost:8181/api/v1/templates/" + fileName.toString(), JSON.stringify(mapValues), {
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
                //error.response.data.errors[0].message
                setErrorText("Упс, что-то сломалось");
            })
    }

    return (
        <>
            <Grid2 container spacing={3} sx={{display: "flex", flexDirection: "column"}}>
                {fields.map((el, index) => (
                    <div key={index}>
                        <Grid2 container spacing={2} sx={{display: "flex", flexDirection: "row"}}>
                            <Grid2 item>
                                <TextField
                                    id={"inputDescription" + index}
                                    label={el}
                                    variant="outlined"
                                    multiline
                                    sx={{width: 300}}
                                />
                            </Grid2>
                            <Grid2 item>
                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor={"inputType" + index}>
                                        Тип
                                    </InputLabel>
                                    <NativeSelect
                                        defaultValue={"TEXT"}
                                        variant="outlined"
                                        id={"inputType" + index}
                                    >
                                        <option value={"TEXT"}>Text</option>
                                        <option value={"IMAGE"}>Image</option>
                                        <option value={"TABLE"}>Table</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid2>
                            <Grid2 item>
                                <TextField
                                    id={"inputNumber" + index}
                                    label="Количество"
                                    type="number"
                                    sx={{width: 100}}
                                    defaultValue={1}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            </Grid2>
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