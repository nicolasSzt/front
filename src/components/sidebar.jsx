import React, { useState } from "react";
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
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
import { createChannel } from "@/services/channelService";

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

const DialogContentStyled = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  && {
    padding-top: ${({ theme }) => theme.spacing(1)};
  }
`;
const DialogTitleStyled = styled(DialogTitle)`
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Sidebar = ({
  channels = [],
  selectedChannel = null,
  onChannelSelect = () => { },
  mobileOpen = false,
  onMobileToggle = () => { },
  currentWorkspace = null,
  workspace_id ,
}) => {
  const [channelsExpanded, setChannelsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
console.log("Sidebar channels:", workspace_id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openModal, setOpenModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewChannelName("");
    setNewChannelDescription("");
  };

  const handleCreateChannel = async () => {
    console.log("Creating channel:", newChannelName, newChannelDescription, workspace_id);
    try {
      await createChannel(newChannelName, newChannelDescription, workspace_id);
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error("Error al crear canal", error);
    }
  };

  const handleChannelClick = (channelId) => {
    onChannelSelect(channelId);
    if (isMobile) {
      onMobileToggle();
    }
  };

  const filteredChannels = channels.filter((channel) =>
    channel.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <NavBox component="nav" ismobile={isMobile ? "true" : "false"}>
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitleStyled>Create a new channel</DialogTitleStyled>
        <DialogContentStyled>
          <TextField
            label="Channel Name"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={newChannelDescription}
            onChange={(e) => setNewChannelDescription(e.target.value)}
            fullWidth
          />
        </DialogContentStyled>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateChannel}
            variant="contained"
            disabled={!newChannelName.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <MobileDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileToggle}
        ModalProps={{ keepMounted: true }}
      >
        <SidebarContainer>
          <WorkspaceHeader title={currentWorkspace?.title || ""} />
          {isMobile && (
            <CloseButtonContainer>
              <IconButton onClick={onMobileToggle} size="small">
                <CloseIcon />
              </IconButton>
            </CloseButtonContainer>
          )}
          <SearchContainer>
            <StyledTextField
              fullWidth
              size="small"
              placeholder="Search channels"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  primary="Channels"
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
                        onClick={() => handleChannelClick(channel._id)}
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
                    <AddItemButton onClick={handleOpenModal}>
                      <ListItemIconStyled>
                        <AddIcon fontSize="small" />
                      </ListItemIconStyled>
                      <ListItemText
                        primary="Add channels"
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
      </MobileDrawer>

      <DesktopDrawer variant="permanent" open>
        <SidebarContainer>
          <WorkspaceHeader
            title={currentWorkspace?.title || ""}
            subtitle={currentWorkspace?.description || ""}
          />
          <SearchContainer>
            <StyledTextField
              fullWidth
              size="small"
              placeholder="Search channels"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  primary="Channels"
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
                        onClick={() => handleChannelClick(channel._id)}
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
                    <AddItemButton onClick={handleOpenModal}>
                      <ListItemIconStyled>
                        <AddIcon fontSize="small" />
                      </ListItemIconStyled>
                      <ListItemText
                        primary="Add channels"
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
      </DesktopDrawer>
    </NavBox>
  );
}

export default Sidebar;