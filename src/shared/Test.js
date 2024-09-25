import {useState} from "react";
import Button from "./Button";

function Test({fun}) {




    return (
        <>
            <button onClick={fun}>Состояние</button>
            <Button title={"кнопка"} clickFunction={fun}/>
        </>

        // <Button title={"та кнопка"} clickFunction={() => setValue("типа робит")}/>
    );
}

export default Test;