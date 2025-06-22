import { useState } from "react";
import { useParams } from "react-router-dom";
import workspaces from "../data/workspacesData";
import extractFormData from "../helpers/extractFormData";

const WorkspaceScreen = () => {
    const { workspace_id } = useParams();

    const workspace = workspaces.find(
        (ws) => String(ws.id) === String(workspace_id)
    );

    if (!workspace) {
        return <div>Workspace not found</div>;
    }

    const [messages, setMessages] = useState(workspace.messages || []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const formValues = extractFormData(e.target);
        if (!formValues.mensaje?.trim()) return;

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);


        e.target.reset();
    };

    return (
        <div>
            <h1>{workspace.title}</h1>
            <MessagesList messages={messages} />
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Escribe tu mensaje"
                    name="mensaje"
                    autoComplete="off"
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default WorkspaceScreen;
