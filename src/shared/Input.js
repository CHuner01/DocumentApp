function Input({id, type, onChange, accept, placeholder}) {
    return (
        <>
            <input className="form-control" id={id} onChange={onChange} type={type} accept={accept} placeholder={placeholder}></input>
        </>
    );
}

export default Input;