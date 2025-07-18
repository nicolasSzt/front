import React, { useState } from "react";
import styled from "@emotion/styled";
import Sidebar from "@/components/sidebar";
import Chat from "@/components/chat";
import {
  CircularProgress,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useParams, useNavigate } from "react-router-dom";
import { useWorkspaceChannels } from "@/hooks/useWorkspaceChannels";
import useWorkspacesWithChannels from "@/hooks/useWorkspaceWithChannels";
import { createChannel } from "@/services/channelService";
import ThemeToggle from "@/components/themeToggle";

const drawerWidth = 280;

const MainContainer = styled(Box)`
  display: flex;
`;

const MobileAppBar = styled(AppBar)(({ theme }) => ({
  display: "block",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 1px 3px rgba(255, 255, 255, 0.1), 0 8px 24px rgba(255, 255, 255, 0.15)"
      : "0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06)",
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.drawer + 1,
  "@media (min-width:900px)": {
    display: "none",
  },
}));

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: 64,
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  boxSizing: "border-box",
  "@media (min-width:900px)": {
    marginLeft: drawerWidth,
    marginTop: 0,
  },
}));

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

const WorkspaceDetail = () => {
  const { workspace_id } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { workspaces } = useWorkspacesWithChannels();
  const currentWorkspace = workspaces.find(
    (ws) => ws._id === workspace_id
  );

  const {
    channels,
    selectedChannel,
    handleChannelSelect,
    isLoading,
    isError,
    error,
  } = useWorkspaceChannels(workspace_id);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  const [channelNameError, setChannelNameError] = useState("");
  const [channelSearchTerm, setChannelSearchTerm] = useState("");

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

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

    setChannelNameError(
      exists ? "Ya existe un canal con este nombre." : ""
    );
  };

  const handleCreateChannel = async () => {
    try {
      await createChannel(
        newChannelName.trim(),
        newChannelDescription.trim(),
        workspace_id
      );
      handleCloseModal();
      navigate(0); // reload
    } catch (err) {
      console.error("Error al crear canal:", err);
    }
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
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="abrir menú"
            edge="start"
            onClick={handleDrawerToggle}
            size="large"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1, ml: 2 }}>
            {selectedChannel
              ? channels.find((ch) => ch._id === selectedChannel)?.title
              : "Selecciona un canal"}
          </Typography>

          <ThemeToggle />
        </StyledToolbar>
      </MobileAppBar>

      <Sidebar
        channels={channels}
        selectedChannel={selectedChannel}
        onChannelSelect={handleChannelSelect}
        onMobileToggle={handleDrawerToggle}
        currentWorkspace={currentWorkspace}
        onCreateChannel={handleCreateChannel}
        workspace_id={workspace_id}
        mobileOpen={mobileOpen}
        openModal={openModal}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        newChannelName={newChannelName}
        newChannelDescription={newChannelDescription}
        setNewChannelName={setNewChannelName}
        setNewChannelDescription={setNewChannelDescription}
        channelNameError={channelNameError}
        handleChangeWithValidation={handleChangeWithValidation}
        searchTerm={channelSearchTerm}
        onSearchChange={setChannelSearchTerm}
        isMobile={isMobile}
      />

      <MainContent>
        {selectedChannel ? (
          <Chat
            workspaceId={workspace_id}
            channelId={selectedChannel}
            currentUserId={currentWorkspace?.user_id}
            isMobile={isMobile}
          />
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
