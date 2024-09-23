import Input from "../shared/Input";
import "./styles/App.css"
import SendFileButton from "../features/SendFileButton";
import SendFileWidget from "../widgets/SendFileWidget";
import Button from "../shared/Button";

import {useState} from "react";
import Test from "../shared/Test";


function App() {
    //const uploadFile = document.getElementById('uploadInput');
    //console.log(uploadFile)
    // const [fields, setFields] = useState([]);

    // function GetInputsFunction() {
    //
    //     const array = ["первое", "второе", "третье"]
    //
    //     console.log("кликнута")
    //
    //     function showInputs() {
    //         setFields(array)
    //     }
    // }



    const [isButton, setIsButton] = useState(false);

    function handleClick() {
        setIsButton(true);
    }

    return (
        <>
            <SendFileWidget/>
            {/*<div>*/}
            {/*    /!*<Button title={"Показать поля для ввода"} clickFunction={showInputs}/>*!/*/}
            {/*    <button onClick={GetInputsFunction}>Показать поля для ввода</button>*/}
            {/*    {fields.map((el, index) => (*/}
            {/*        <div key={index}>{el}</div>))}*/}
            {/*</div>*/}

            {/*<Button title={"Говно"} clickFunction={GetInputsFunction}/>*/}
            {/*<button onClick={showInputs}>хуй</button>*/}

            {/*<button onClick={handleClick}>Вызов функции</button>*/}
            {/*{isButton && <Test />}*/}



        </>


    );
}

export default App;

// shared -> entities -> features -> widgets -> pages -> app
