import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { styled, useTheme } from "@mui/material/styles";
import {
  Typography,
  Box,
  TextField,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import ThemeToggle from "./themeToggle";
import { getAllMessagesByChannel, createMessage } from "@/services/messageService";

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
}));


const Content = styled(Box)`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
  `;

const InputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 8,
  padding: 16,
  borderRadius: "0 0 8px 8px",
  backgroundColor: theme.palette.background.paper,
}));
const MessagesName = styled(Box)(({ theme }) => ({
  display: "flex",
  color: theme.palette.text.primary,
}));


const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiInputBase-root": {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.background.default : "#fff",
    color: theme.palette.text.primary,
  },
}));

const StyledButton = styled(IconButton)`
  &:hover {
    background-color: transparent;
    box-shadow: none;
  }

`;

const StyledSendIcon = styled(SendIcon)(({ theme, disabled }) => ({
  color: disabled ? theme.palette.action.disabled : theme.palette.primary.main,
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowY: "auto",
  gap: "12px",
  width: "50%",
  padding: "12px",
  flexDirection: "column",
}));

const MessageBox = styled(Box)` 
display: "flex",
flexDirection: "column",
marginBottom: 12,
maxWidth: "60%",
wordBreak: "break-word",
`
const MessageContent = styled(Box)(({ theme }) => ({
  fontSize: "0.875rem",
  lineHeight: 1.4,
  justifyContent: "space-between",
  color: theme.palette.text.primary,
}))
const OwnMessage = styled(MessageBox)(({ theme }) => ({
  alignSelf: "flex-start",
  padding: "12px",
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#CBD5E1"
    }`,
  color: theme.palette.text.primary,
  boxShadow: theme.palette.mode === "dark" ? "none" : "0 2px 6px rgba(0,0,0,0.12)",
}));

const OtherMessage = styled(MessageBox)(({ theme }) => ({
  alignSelf: "flex-start",
  padding: "12px",
  borderRadius: 8,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.mode === "dark" ? "#475569" : "#CBD5E1"
    }`,
  color: theme.palette.text.primary,
  boxShadow: theme.palette.mode === "dark" ? "none" : "0 2px 6px rgba(0,0,0,0.12)",
}));


const Chat = ({ workspaceId, channelId, currentUserId }) => {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["messages", channelId],
    queryFn: () => getAllMessagesByChannel(workspaceId, channelId),
    enabled: !!channelId,
  });

  const messages = data?.messages || [];

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await createMessage(newMessage.trim(), workspaceId, channelId);
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["messages", channelId] });
    } catch (err) {
      console.error("Error enviando mensaje:", err);
    }
  };

  if (isLoading) {
    return (
      <Box
        justifyContent="center"
        display="flex"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }
  if (isError) {
    return (
      <MainContainer>
        <Typography color="error">Error: {error.message}</Typography>
      </MainContainer>
    );
  } return (
    <MainContainer>
      <Content>
        {isLoading ? (
          <Box
            justifyContent="center"
            display="flex"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error">Error: {error.message}</Typography>
        ) : messages.length === 0 ? (
          <Typography>No hay mensajes en este canal.</Typography>
        ) : (
          <Paper
            elevation={5}
            sx={{ padding: 2, flex: 1, display: "flex", flexDirection: "column" }}
          >
            <MessagesContainer>
              {messages.map((msg) => {
                const isOwn = msg.user._id;
                const MessageComponent = isOwn ? OwnMessage : OtherMessage;
                return (
                  <MessageComponent key={msg._id}>
                    <MessageContent>
                      <Box display="flex" gap={1} fontSize="0.75rem" color="text.secondary" alignItems="center">
                        <MessagesName>🧑 {msg.user.name} </MessagesName>
                        <Box>{new Date(msg.created_at).toLocaleTimeString()}</Box>
                      </Box>
                      <Box mt={0.5} ml={0.5}>
                        {msg.content}
                      </Box>
                    </MessageContent>
                  </MessageComponent>
                );
              })}
            </MessagesContainer>
          </Paper>
        )}
      </Content>

      <InputWrapper>
        <StyledTextField
          label="Escribe un mensaje"
          multiline
          minRows={2}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          variant="outlined"
        />
        <StyledButton
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <StyledSendIcon disabled={!newMessage.trim()} />
        </StyledButton>
      </InputWrapper>
    </MainContainer>
  );

}

export default Chat