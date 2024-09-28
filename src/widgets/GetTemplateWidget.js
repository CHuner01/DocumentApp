import Button from "../shared/Button";
import {useState} from "react";
import axios from "axios";
import Paragraph from "../shared/Paragraph";
import Input from "../shared/Input";

function GetTemplateWidget() {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [isTemplateSelected, setIsTemplateSelected] = useState(false);
    const [isInputs, setIsInputs] = useState(false);
    const [fields, setFields] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    var fileDownload = require('js-file-download');

    const valueJson = new Map();
    const mapValues = new Map();
    const onChange = (e) => {
        setSelectedTemplate(e.target.value);
        setIsTemplateSelected(true);
    }
    function getTemplates() {
        axios.get("http://localhost:8181/api/v1/templates")
            .then(function (response) {

            let tmpArray = [];
            for (let i = 0; i < response.data.length; i++) {
                tmpArray.push(response.data[i].templateName)
            }
            setTemplates(tmpArray);
        })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getTemplateInputs() {
        axios.get("http://localhost:8181/api/v1/templates/" + selectedTemplate.toString())
            .then(function (response) {
            setFields(Object.keys(response.data.listOfFieldsReplaceTo));
            setDescriptions(Object.values(response.data.listOfFieldsReplaceTo));
        })
            .catch(function (error) {
                console.log(error);
            })
        setIsInputs(true)
    }

    function getInputsValue() {
        for (let i = 0; i < fields.length; i++) {
            valueJson[fields[i]] = document.getElementById('input' + i).value;
        }
        mapValues["templateName"] = selectedTemplate;
        mapValues["replacements"] =  valueJson;
        sendInputs();
    }

    function sendInputs() {
        axios.post("http://localhost:8181/api/v1/documents/download", JSON.stringify(mapValues), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'multipart/form-data'
            },
            responseType: 'blob'
        }).then(function (response) {
            fileDownload(response.data, 'filename.docx');
        })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <Button title={"Список шаблонов"} clickFunction={getTemplates}/>

            <select onChange={onChange}>{
                templates.map((el, index) => <option key={index}>{el}</option>)
            }</select>
            {isTemplateSelected && <Button title={"Ввести данные"} clickFunction={getTemplateInputs}/>}

            {descriptions.map((el, index) => (
                <div key={index}>
                    <Paragraph title={el}/>
                    <Input id={"input" + index}/>
                </div>))}

            {isInputs && <Button title={"Скачать файл"} clickFunction={getInputsValue}/>}
        </>
    );
}

export default GetTemplateWidget;