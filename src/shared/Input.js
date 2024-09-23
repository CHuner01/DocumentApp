function Input({id, type, accept, placeholder}) {
    return (
        <>
            <input className="form-control" id={id} type={type} accept={accept} placeholder={placeholder}></input>
        </>
    );
}

export default Input;