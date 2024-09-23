import Input from "../shared/Input";
import Paragraph from "../shared/Paragraph";
import Button from "../shared/Button";

function GetInputsFunction() {
    const fields = ["первое", "второе", "третье"];
    function getInputsValue() {
        let valueArray = [];
        for (let i = 0; i < fields.length; i++) {
            valueArray[i] = document.getElementById('input' + i).value;
        }
        console.log(JSON.stringify(valueArray))
    }

    return (
        <>
            {fields.map((el, index) => (
                <div key={index}>
                    <Paragraph title={el}/>
                    <Input id={"input" + index}/>
                </div>))}
            <Button title={"Получить данные"} clickFunction={getInputsValue}/>
        </>
    );
}

export default GetInputsFunction;