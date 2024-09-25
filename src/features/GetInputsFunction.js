import Input from "../shared/Input";
import Paragraph from "../shared/Paragraph";
import Button from "../shared/Button";
import Test from "../shared/Test";
import {useState} from "react";

function GetInputsFunction({fields}) {
    const [valueArray, setValueArray] = useState([]);
    const valueJson = new Map();
    console.log("все сработало")

    function getInputsValue() {
        for (let i = 0; i < fields.length; i++) {
            valueJson[fields[i]] = document.getElementById('input' + i).value;
        }

        console.log(JSON.stringify(valueJson));
        //axios отправляет данные
    }

    return (
        <>
            {fields.map((el, index) => (
                <div key={index}>
                    <Paragraph title={el}/>
                    <Input id={"input" + index}/>
                </div>))}
            <Button title={"Отправить данные"} clickFunction={getInputsValue}/>
            <Button title={"Скачать файл"} clickFunction={"axios с valueArray"}/>
        </>
    );
}

export default GetInputsFunction;