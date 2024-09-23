import Input from "../shared/Input";
import SendFileButton from "../features/SendFileButton";
import Button from "../shared/Button";



function SendFileWidget() {
    function hahaha() {
        console.log("все ок")
    }

    return (
        <>
            <Input id={"uploadInput"} type={"file"} accept={".doc, .docx"} />
            <SendFileButton />

        </>
    );
}

export default SendFileWidget;