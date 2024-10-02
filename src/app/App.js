import "./styles/App.css"
import CreateFileWidget from "../widgets/CreateFileWidget";
import {useEffect, useState} from "react";
import {Button, createTheme, ThemeProvider} from "@mui/material";
import AuthorizationWidget from "../widgets/AuthorizationWidget";
import {purple} from "@mui/material/colors";
import axios from "axios";



function App() {
    const [isAuthorized, setIsAuthorized] = useState(false);


    const theme = createTheme({
        palette: {
            primary: {
                main: purple[400],
                dark: purple[500],
            },
            secondary: {
                main: "#FFFFFF",
            }
        },
        typography: {
            h1: {
                fontSize: "3rem",
                fontWeight: 600,
                marginTop: 16,
                marginBottom: 16,
            },
            h2: {
                fontSize: "2rem",
                fontWeight: 600,
                marginTop: 8,
                marginBottom: 8,
            }
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableRipple: true,
                    disableElevation: true
                },
                styleOverrides: {
                    root: {
                        borderRadius: "6px",
                        textTransform: "none",
                        fontSize: "25px"
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        color: "secondary",

                    }
                },
            },
            MuiSelect: {
                styleOverrides: {
                    select: {
                        '&:before': {
                            borderColor: 'yellow',
                        },
                        '&:after': {
                            borderColor: 'yellow',
                        },
                        '&:not(.Mui-disabled):hover::before': {
                            borderColor: 'yellow',
                        },
                    },
                    icon: {
                        fill: 'black',
                    },
                    root: {
                        color: 'black',
                    },
                }
            }
        }
    })

    function checkAccessToken() {
        const accessToken = localStorage.getItem('accessToken');
        axios.post("http://localhost:8181/api/v1/auth/check-token", {
            "token": accessToken
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
            console.log(response);
            if (response.data) {
                setIsAuthorized(true);
            }
            else {
                console.log("access false")
                checkRefreshToken();

            }
        })
            .catch(function (error) {
                console.log(error);
            })

    }

    function checkRefreshToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        axios.post("http://localhost:8181/api/v1/auth/check-token", {
                "token": refreshToken
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response);
                if (response.data) {
                    getNewTokens();
                }
                else {
                    setIsAuthorized(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getNewTokens() {
        const refreshToken = localStorage.getItem('refreshToken');
        axios.post("http://localhost:8181/api/v1/auth/refresh-token", {
            "refreshToken": refreshToken
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
            console.log(response);
                localStorage.setItem('accessToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                setIsAuthorized(true)
        })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        checkAccessToken();
        console.log("не смотри на ошибку, все работает")
    }, []);


    return (
        <>
            <ThemeProvider theme={theme}>
                {isAuthorized ? <CreateFileWidget checkToken={checkAccessToken}/> : <AuthorizationWidget checkToken={checkAccessToken}/>}
                {/*<CreateFileWidget checkToken={checkAccessToken}/>*/}
                {/*<AuthorizationWidget checkToken={checkAccessToken}/>*/}
            </ThemeProvider>
        </>
    );
}

export default App;

// shared -> entities -> features -> widgets -> pages -> app
