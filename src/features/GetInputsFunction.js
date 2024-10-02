import Input from "../shared/Input";
import Paragraph from "../shared/Paragraph";


import axios from "axios";
import {Button, Container, Grid2, TextField} from "@mui/material";

function GetInputsFunction({checkToken, fields, fileName}) {

    const valueJson = new Map();
    const mapValues = new Map();
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
        axios.put("http://localhost:8181/api/v1/templates/" + fileName.toString(), JSON.stringify(mapValues), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }).then(function (response) {
            console.log(response)
        })
            .catch(function (error) {
                console.log(error);
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
                            />
                        </Grid2>
                    </div>))}
                <Grid2 item>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={getInputsValue}
                    >Создать шаблон</Button>
                </Grid2>
            </Grid2>
        </>
    );
}

export default GetInputsFunction;