import {useState} from "react";
import Input from "../shared/Input";

import axios from "axios";
import {Button, Container, Grid2, TextField, Typography} from "@mui/material";
import {purple} from "@mui/material/colors";

function AuthorizationWidget({checkToken}) {
    const [isRegistered, setIsRegistered] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function checkRegistered() {
        setIsRegistered(isRegistered => !isRegistered);
    }

    function createAccount(value) {
        // const API_URL = process.env.REACT_APP_HOST || 'http://localhost:8181';
        axios.post("/api/v1/auth/" + value, {
                "email": email,
                "password": password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            })
            .then(function (response) {
                console.log(response)
                localStorage.setItem('accessToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                checkToken();

            })
            .catch(function (error) {
                console.log(error);
            })
    }


    return (
        <>
            <Container maxWidth="sm" sx={{display: "flex", alignItems:"center", justifyContent: "center",
                flexDirection: "column", minHeight: '100vh' }}>

                <Typography variant="h1" sx={{mb: 3, textAlign: "center"}}>
                    {isRegistered ? "Авторизация" : "Регистрация"}
                </Typography>

                <Grid2 container spacing={2} sx={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                    <Grid2 item>
                        <TextField
                            label="Почта"
                            variant="outlined"
                            // slotProps={{ input: { fontSize: "25px" } }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 item>
                        <TextField
                            label="Пароль"
                            type="password"

                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid2>


                    {isRegistered && <>
                        <Grid2 item sx={{display: "flex", flexDirection: "column"}}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{"&:hover": {bgcolor: "primary.dark"}}}
                                    onClick={() => createAccount("authenticate")}
                                >Авторизоваться</Button>
                                <Button
                                    sx={{fontSize: "20px", "&:hover": {bgcolor: "#FFFFFF"}}}
                                    onClick={checkRegistered}
                                >Нет аккаунта</Button>
                        </Grid2>
                    </>}
                    {!isRegistered && <>
                        <Grid2 item sx={{display: "flex", flexDirection: "column"}}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{"&:hover": {bgcolor: "primary.dark"}}}
                                onClick={() => createAccount("register")}
                            >Зарегистрироваться</Button>
                            <Button
                                sx={{fontSize: "20px", "&:hover": {bgcolor: "#FFFFFF"}}}
                                onClick={checkRegistered}
                            >Есть аккаунт</Button>
                        </Grid2>
                    </>}
                </Grid2>
            </Container>
        </>
    );
}

export default AuthorizationWidget;