import Input from "../shared/Input";
import SendFileButton from "../features/SendFileButton";
import Button from "../shared/Button";
import {useState} from "react";
import GetTemplateWidget from "./GetTemplateWidget";



function CreateFileWidget() {
    const [isNewFile, setIsNewFile] = useState(false);
    const [isNewTemplate, setIsNewTemplate] = useState(false);

    function returnFunction() {
        setIsNewTemplate(false);
        setIsNewFile(false);
    }

    return (
        <>
            {!isNewFile && !isNewTemplate && <>
                <Button title={"Создать шаблон"} clickFunction={() => setIsNewTemplate(true)}/>
                <Button title={"Создать файл по шаблону"} clickFunction={() => setIsNewFile(true)}/>
            </>}

            {(isNewFile || isNewTemplate) && <Button title={"Назад"} clickFunction={returnFunction}/>}

            {isNewFile ? <GetTemplateWidget /> : <></>}
            {isNewTemplate ? <SendFileButton /> : <></>}

        </>
    );
}

export default CreateFileWidget;