import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { Typography, TextField, Button, Box } from "@mui/material";
import { getAllMessagesByChannel, createMessage } from "@/services/messageService";
const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const MessagesContainer = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
`;

const MessageBox = styled(Box)`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 12px;
  max-width: 60%;
  word-break: break-word;
`;

const OwnMessage = styled(MessageBox)`
  align-self: flex-end;
  background-color: #dcf8c6;
  margin-left: auto;
`;

const OtherMessage = styled(MessageBox)`
  align-self: flex-start;
  background-color: #f5f5f5;
  margin-right: auto;
`;

const Timestamp = styled(Typography)`
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 4px;
`;

const InputArea = styled(Box)`
  padding: 16px;
  border-top: 1px solid #ddd;
  background-color: white;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  && {
    margin-bottom: 12px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const Chat = ({ workspaceId, channelId, currentUserId }) => {
    const queryClient = useQueryClient();
    const [newMessage, setNewMessage] = useState("");

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["messages", channelId],
        queryFn: () => getAllMessagesByChannel(workspaceId, channelId),
        enabled: !!channelId,
    });
    const messages = data?.messages;

    const handleSendMessage = async () => {
        try {
            await createMessage(newMessage.trim(), workspaceId, channelId);
            setNewMessage("");
            queryClient.invalidateQueries({ queryKey: ["messages", channelId] });
        } catch (error) {
            console.error("Error enviando mensaje:", error);
        }
    };

    if (isLoading) return <Typography>Cargando mensajes...</Typography>;
    if (isError) return <Typography>Error: {error.message}</Typography>;

    return (
        <Container>
            <MessagesContainer>
                {messages.length < 1 ? (
                    <Typography>No hay mensajes en este canal.</Typography>
                ) : (
                    messages.map((msg) => {
                        const isOwn = msg.user._id === currentUserId;
                        const MessageComponent = isOwn ? OwnMessage : OtherMessage;
                        console.log("Mensaje completo:", msg);
                        return (
                            <MessageComponent key={msg._id}>


                                <Timestamp variant="body2">
                                    🧑‍💻 <strong>{msg.user.name}</strong>
                                </Timestamp>

                                <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                                    {msg.content}
                                </Typography>
                                <Timestamp variant="caption">
                                    {new Date(msg.created_at).toLocaleTimeString()}
                                </Timestamp>

                            </MessageComponent>
                        );
                    })

                )}
            </MessagesContainer>

            <InputArea>
                <StyledTextField
                    label="Escribe un mensaje"
                    multiline
                    minRows={2}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    variant="outlined"
                />
                <StyledButton
                    variant="contained"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                >
                    Enviar
                </StyledButton>
            </InputArea>
        </Container>
    );
};

export default Chat;
