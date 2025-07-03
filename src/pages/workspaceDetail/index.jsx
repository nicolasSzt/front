import React, { useState } from "react";
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
import { useParams } from "react-router-dom";

import Sidebar from "@/components/sidebar";
import { useWorkspaceChannels } from "@/hooks/useWorkspaceChannels";
import useWorkspacesWithChannels from "@/hooks/useWorkspaceWithChannels";
import Chat from "@/components/ChatArea";

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
  background-color: white;
  color: #111827;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid #ffffff;
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

export const WorkspaceDetail = () => {
  const { workspace_id } = useParams();
  const { workspaces } = useWorkspacesWithChannels();

  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    channels,
    selectedChannel,
    handleChannelSelect,
    isLoading,
    isError,
    error,
  } = useWorkspaceChannels(workspace_id);

  const currentWorkspace = workspaces.find(
    (workspace) => workspace._id === workspace_id
  );

  const [openModal, setOpenModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  const [channelNameError, setChannelNameError] = useState("");

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewChannelName("");
    setNewChannelDescription("");
    setChannelNameError("");
  };

  const handleChangeWithValidation = (e) => {
    const value = e.target.value;
    setNewChannelName(value);

    if (!value.trim()) {
      setChannelNameError("");
      return;
    }

    const exists = channels.some(
      (ch) => ch.title.toLowerCase() === value.toLowerCase()
    );

    setChannelNameError(exists ? "Ya existe un canal con este nombre." : "");
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Cargando canales...
        </Typography>
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
            aria-label="abrir menú"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {selectedChannel ? `#${selectedChannel}` : "Selecciona un canal"}
          </Typography>
        </Toolbar>
      </MobileAppBar>

      <Sidebar
        channels={channels}
        selectedChannel={selectedChannel}
        onChannelSelect={handleChannelSelect}
        mobileOpen={mobileOpen}
        onMobileToggle={handleDrawerToggle}
        currentWorkspace={currentWorkspace}
        workspace_id={workspace_id}
        openModal={openModal}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        newChannelName={newChannelName}
        newChannelDescription={newChannelDescription}
        setNewChannelName={setNewChannelName}
        setNewChannelDescription={setNewChannelDescription}
        channelNameError={channelNameError}
        handleChangeWithValidation={handleChangeWithValidation}
      />

      <MainContent>
        {selectedChannel ? (
          <Chat workspaceId={workspace_id} channelId={selectedChannel} />
        ) : (
          <Typography variant="h5" color="text.secondary">
            Selecciona un canal para comenzar a chatear
          </Typography>
        )}
      </MainContent>
    </MainContainer>
  );
};

export default WorkspaceDetail;
