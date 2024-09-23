function Button({title, clickFunction}) {
    return (
        <>
            <button onClick={clickFunction}>{title}</button>
        </>
    );
}

export default Button;