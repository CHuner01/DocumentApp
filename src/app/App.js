import Input from "../shared/Input";
import "./styles/App.css"
import SendFileButton from "../features/SendFileButton";
import CreateFileWidget from "../widgets/CreateFileWidget";
import Button from "../shared/Button";
import Test from "../shared/Test";
import {useState} from "react";
import Paragraph from "../shared/Paragraph";
import AuthorizationWidget from "../widgets/AuthorizationWidget";


function App() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    function checkAuthorization() {

    }

    return (
        <>
            {/*{isAuthorized ? <CreateFileWidget/> : <AuthorizationWidget />}*/}
            <CreateFileWidget/>

        </>
    );
}

export default App;

// shared -> entities -> features -> widgets -> pages -> app
