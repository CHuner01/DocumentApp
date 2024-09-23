import Button from "../shared/Button";
import {useState} from "react";
import AxiosFunction from "./AxiosFunction";
import GetInputsFunction from "./GetInputsFunction";
import getInputsFunction from "./GetInputsFunction";

function SendFileButton() {
    const [isFileSend, setIsFileSend] = useState(false);

    function handleClick() {
        setIsFileSend(true);
    }
    // console.log(document.getElementById('uploadInput').files[0])

    function getInputsFunction() {
        const fields = ["первое", "второе", "третье"];
        return (
            <>
                {fields.map((el, index) =>
                    <div key={index}>{el}</div>)}
            </>
        );
    }



    return (
        <>
            <Button title={"Отправить файл"} clickFunction={handleClick}/>
            {/*{isFileSend && <AxiosFunction responseFunction={getInputsFunction}/>}*/}
            {isFileSend && <GetInputsFunction />}
        </>
    );
}

export default SendFileButton;