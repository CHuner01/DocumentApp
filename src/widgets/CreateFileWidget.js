
import SendFileButton from "../features/SendFileButton";

import {useEffect, useState} from "react";
import GetTemplateWidget from "./GetTemplateWidget";
import {Button, Container, Fab, Grid2} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";



function CreateFileWidget({checkToken}) {
    const [isNewFile, setIsNewFile] = useState(false);
    const [isNewTemplate, setIsNewTemplate] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    function returnFunction() {
        setIsNewTemplate(false);
        setIsNewFile(false);
    }

    function checkAdmin() {
        const accessToken = localStorage.getItem('accessToken');
        // const API_URL = process.env.REACT_APP_HOST || 'http://localhost:8181';
        axios.post("/api/v1/auth/role", {
            "token": accessToken,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(function (response) {
            console.log(response);
            if (response.data.toString() === "ADMIN") {
                setIsAdmin(true);
            }
            else {
                setIsAdmin(false);
            }
        })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        checkAdmin();
    }, []);

    return (
        <>
            <Container maxWidth="xl" sx={{ my: 2}}>
                <Grid2 container spacing={2} sx={{display: "flex", flexDirection: "column"}}>
                    {!isNewFile && !isNewTemplate && <>
                        <Grid2 item>
                            {isAdmin && <Button
                                variant="contained"
                                sx={{minWidth: "200px", minHeight: "100px" }}
                                onClick={() => setIsNewTemplate(true)}
                            >Создать шаблон</Button>}
                        </Grid2>

                        <Grid2 item>
                            {isAdmin && <Button
                                variant="contained"
                                sx={{minWidth: "200px", minHeight: "100px" }}
                                onClick={() => setIsNewFile(true)}
                            >Создать файл по шаблону</Button>}
                        </Grid2>
                    </>}
                </Grid2>
            </Container>



            <Container maxWidth="xl">
                <Grid2 container spacing={1}>
                    <Grid2 item>
                        {isAdmin && (isNewFile || isNewTemplate) && <Fab size="medium" color="primary" onClick={returnFunction}>
                            <ArrowBackIcon />
                        </Fab>}
                    </Grid2>
                    <Grid2 item>
                        {isAdmin && isNewFile && <GetTemplateWidget checkToken={checkToken} isAdmin={isAdmin}/>}
                        {isAdmin && isNewTemplate && <SendFileButton checkToken={checkToken}/>}
                        {!isAdmin && <GetTemplateWidget checkToken={checkToken} isAdmin={isAdmin}/>}
                    </Grid2>
                </Grid2>
            </Container>
        </>
    );
}

export default CreateFileWidget;