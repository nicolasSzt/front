import { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useQuery } from "@tanstack/react-query";
import { getAllChannelsByWorkspace } from "@/services/workspaceService/workspaceService";
import Sidebar from "@/components/Sidebar/sidebar";
import { useParams } from "react-router-dom";

// Styled Components
const MainContainer = styled(Box)`display: flex;`;
const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;
const ErrorContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const MobileAppBar = styled(AppBar)`
  display: block;
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  @media (min-width: 900px) {
    display: none;
  }
`;
const MainContent = styled(Box)`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  margin-top: 64px;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: 100vh;
  @media (min-width: 900px) {
    margin-top: 0;
  }
`;
const ChatArea = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.spacing(2)};
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;
const LoadingText = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const WorkspaceDetail = () => {
  const { workspace_id } = useParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const { data: channels, isLoading, isError, error } = useQuery({
    queryKey: ["channels", workspace_id],
    queryFn: () => getAllChannelsByWorkspace(workspace_id),
    enabled: !!workspace_id,
    refetchOnWindowFocus: false,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChannelSelect = (channelId) => {
    setSelectedChannel(channelId);
    console.log("Selected channel:", channelId);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <LoadingText variant="body1">Cargando canales...</LoadingText>
      </LoadingContainer>
    );
  }

  if (isError) {
    return (
      <ErrorContainer>
        <Typography variant="body1" color="error">
          Error al obtener los canales: {error?.message || "Error desconocido"}
        </Typography>
      </ErrorContainer>
    );
  }

  return (
    <MainContainer>
      <MobileAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {selectedChannel ? `#${selectedChannel}` : "Selecciona un canal"}
          </Typography>
        </Toolbar>
      </MobileAppBar>

      <Sidebar
        selectedChannel={selectedChannel}
        onChannelSelect={handleChannelSelect}
        mobileOpen={mobileOpen}
        onMobileToggle={handleDrawerToggle}
        channels={channels} 
        workspaceId={workspace_id} 
      />

      <MainContent component="main">
        <Typography variant="h4" gutterBottom>
          {selectedChannel ? `Canal: #${selectedChannel}` : "Selecciona un canal"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Workspace actual: {workspace_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Aquí iría el contenido del chat para el canal seleccionado.
        </Typography>

        <ChatArea>
          <Typography variant="h6" gutterBottom>
            Área de Chat
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta es el área principal donde aparecerían los mensajes del canal{" "}
            {selectedChannel || "ninguno seleccionado"}.
          </Typography>
        </ChatArea>
      </MainContent>
    </MainContainer>
  );
};

export default WorkspaceDetail;
