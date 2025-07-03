import React from "react";
import styled from "@emotion/styled";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Tag as HashIcon,
  Lock as LockIcon,
  ExpandLess,
  ExpandMore,
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import WorkspaceHeader from "@/components/WorkspaceComponent/workspaceHeader/WorkspaceHeader";
import Modal from "@/components/modal";
const drawerWidth = 280;

const SidebarContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CloseButtonContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing(1)};
`;

const SearchContainer = styled(Box)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    background-color: ${({ theme }) => theme.palette.grey[50]};
    border-radius: ${({ theme }) => theme.spacing(2)};
    &:hover {
      background-color: ${({ theme }) => theme.palette.grey[100]};
    }
    &.Mui-focused {
      background-color: ${({ theme }) => theme.palette.background.paper};
    }
  }
`;

const NavigationContainer = styled(Box)`
  flex: 1;
  overflow: auto;
  padding-left: ${({ theme }) => theme.spacing(1)};
  padding-right: ${({ theme }) => theme.spacing(1)};
`;

const StyledListItemButton = styled(ListItemButton)`
  border-radius: ${({ theme }) => theme.spacing(2)};
  margin-left: ${({ theme }) => theme.spacing(1)};
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const ChannelListItemButton = styled(ListItemButton)`
  padding-left: ${({ theme }) => theme.spacing(4)};
  margin-left: ${({ theme }) => theme.spacing(1)};
  margin-right: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.spacing(2)};
  &.Mui-selected {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: white;
    &:hover {
      background-color: ${({ theme }) => theme.palette.primary.dark};
    }
    & .MuiListItemIcon-root {
      color: white;
    }
  }
`;

const AddItemButton = styled(ListItemButton)`
  padding-left: ${({ theme }) => theme.spacing(4)};
  margin-left: ${({ theme }) => theme.spacing(1)};
  margin-right: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.spacing(2)};
`;

const ListItemIconStyled = styled(ListItemIcon)`
  min-width: 32px;
`;

const NavBox = styled(Box)`
  display: ${({ ismobile }) => (ismobile === "true" ? "block" : "none")};
  flex-shrink: 0;

  @media (min-width: 900px) {
    width: ${drawerWidth}px;
    display: ${({ ismobile }) => (ismobile === "true" ? "none" : "block")};
  }
`;

const MobileDrawer = styled(Drawer)`
  display: block;

  @media (min-width: 900px) {
    display: none;
  }

  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${drawerWidth}px;
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

const DesktopDrawer = styled(Drawer)`
  display: none;

  @media (min-width: 900px) {
    display: block;
  }

  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${drawerWidth}px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-right: 1px solid ${({ theme }) => theme.palette.divider};
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(1)};
`;

const ModalTitle = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Sidebar = ({
  channels = [],
  setChannels = () => {},
  selectedChannel = null,
  onChannelSelect = () => {},
  mobileOpen = false,
  onMobileToggle = () => {},
  currentWorkspace = null,
  workspace_id,
  openModal = false,
  onOpenModal = () => {},
  onCloseModal = () => {},
  newChannelName = "",
  newChannelDescription = "",
  setNewChannelName = () => {},
  setNewChannelDescription = () => {},
  channelNameError = "",
  handleChangeWithValidation = () => {},
  searchTerm = "",
  onSearchChange = () => {},
  onCreateChannel = () => {},
}) => {
  const [channelsExpanded, setChannelsExpanded] = React.useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const filteredChannels = channels.filter((channel) =>
    channel.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const drawerContent = (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        title="Crear un nuevo canal"
        actions={
          <>
            <Button onClick={onCloseModal} color="secondary">
              Cancelar
            </Button>
            <Button
              onClick={onCreateChannel}
              variant="contained"
              disabled={
                !newChannelName.trim() ||
                !newChannelDescription.trim() ||
                !!channelNameError
              }
            >
              Crear
            </Button>
          </>
        }
      >
        <ModalContent>
          <TextField
            label="Nombre del canal"
            value={newChannelName}
            onChange={handleChangeWithValidation}
            fullWidth
            error={!!channelNameError}
            helperText={channelNameError || ""}
          />
          <TextField
            label="Descripción"
            value={newChannelDescription}
            onChange={(e) => setNewChannelDescription(e.target.value)}
            fullWidth
          />
        </ModalContent>
      </Modal>

      {isMobile && (
        <CloseButtonContainer>
          <IconButton onClick={onMobileToggle} size="small">
            <CloseIcon />
          </IconButton>
        </CloseButtonContainer>
      )}

      <SidebarContainer>
        <WorkspaceHeader
          title={currentWorkspace?.title || ""}
          subtitle={currentWorkspace?.description || ""}
        />

        <SearchContainer>
          <StyledTextField
            fullWidth
            size="small"
            placeholder="Buscar canales"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </SearchContainer>

        <NavigationContainer>
          <List dense>
            <StyledListItemButton onClick={() => setChannelsExpanded(!channelsExpanded)}>
              <ListItemIconStyled>
                {channelsExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemIconStyled>
              <ListItemText
                primary="Canales"
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              />
            </StyledListItemButton>

            <Collapse in={channelsExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {filteredChannels.map((channel) => (
                  <ListItem key={channel._id} disablePadding>
                    <ChannelListItemButton
                      selected={selectedChannel === channel._id}
                      onClick={() => {
                        onChannelSelect(channel._id);
                        if (isMobile) onMobileToggle(); // cerrar drawer en móvil al seleccionar canal
                      }}
                    >
                      <ListItemIconStyled>
                        {channel.isPrivate ? (
                          <LockIcon fontSize="small" />
                        ) : (
                          <HashIcon fontSize="small" />
                        )}
                      </ListItemIconStyled>
                      <ListItemText
                        primary={channel.title}
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ChannelListItemButton>
                  </ListItem>
                ))}

                <ListItem disablePadding>
                  <AddItemButton onClick={onOpenModal}>
                    <ListItemIconStyled>
                      <AddIcon fontSize="small" />
                    </ListItemIconStyled>
                    <ListItemText
                      primary="Agregar canal"
                      primaryTypographyProps={{
                        variant: "body2",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    />
                  </AddItemButton>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </NavigationContainer>
      </SidebarContainer>
    </>
  );

  return (
    <>
      <MobileDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawerContent}
      </MobileDrawer>

      <DesktopDrawer variant="permanent" open>
        {drawerContent}
      </DesktopDrawer>
    </>
  );
};

export default Sidebar;
