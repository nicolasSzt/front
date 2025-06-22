import { Message } from "../message/Message";

export const MessagesList = ({ messages }) => (
    <div>
        {messages.map((message) => (
            <Message key={message.id} {...message} />
        ))}
    </div>
);
export default MessagesList
