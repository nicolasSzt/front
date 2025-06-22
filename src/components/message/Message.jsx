const Message = ({ texto, autor, hora }) => (
    <div>
        <h3>
            {autor}
        </h3>
        <p>{texto}</p>
        <span>Hora: {hora}</span>
        <hr />
    </div>
);

export default Message
