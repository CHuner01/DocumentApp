import Input from "../shared/Input";
import Paragraph from "../shared/Paragraph";
import Button from "../shared/Button";
import Test from "../shared/Test";
import {useState} from "react";
import axios from "axios";

function GetInputsFunction({fields, fileName}) {

    const valueJson = new Map();
    const mapValues = new Map();
    function getInputsValue() {
        for (let i = 0; i < fields.length; i++) {
            valueJson[fields[i]] = document.getElementById('input' + i).value;
        }
        mapValues["templateValues"] =  valueJson

        sendInputs();
    }

    function sendInputs() {

        console.log("сработало")
        axios.put("http://localhost:8181/api/v1/templates/" + fileName.toString(), JSON.stringify(mapValues), {
            headers: {
                'Content-Type': 'application/json'
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
            {fields.map((el, index) => (
                <div key={index}>
                    <Paragraph title={el}/>
                    <Input id={"input" + index}/>
                </div>))}
            <Button title={"Создать шаблон"} clickFunction={getInputsValue}/>
        </>
    );
}

export default GetInputsFunction;