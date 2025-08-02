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
import ModalCreate from "@/components/modal";

const drawerWidth = 300;

const SidebarContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 400px) {
    margin-left: 10px;
  }

  @media (min-width: 900px) {
    margin-left: 100px;
  }
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
  width: 100%;
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

const MobileDrawer = styled(Drawer)`
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

const Sidebar = ({
  channels = [],
  selectedChannel = null,
  onChannelSelect = () => { },
  mobileOpen = false,
  onMobileToggle = () => { },
  currentWorkspace = null,
  openModal = false,
  isMobile = false,
  onOpenModal = () => { },
  onCloseModal = () => { },
  newChannelName = "",
  setNewChannelDescription = () => { },
  newChannelDescription = "",
  channelNameError = "",
  handleChangeWithValidation = () => { },
  searchTerm = "",
  onSearchChange = () => { },
  onCreateChannel = () => { },
}) => {
  const [channelsExpanded, setChannelsExpanded] = useState(true);

  const onDescriptionChange = (e) => {
    setNewChannelDescription(e.target.value);
  };

  const filteredChannels = channels.filter((channel) =>
    channel.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <MobileDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileToggle}
        ModalProps={{ keepMounted: true }}
      >
        <>
          <ModalCreate
            openModal={openModal}
            onCloseModal={onCloseModal}
            onCreate={onCreateChannel}
            titleError={channelNameError}
            handleChangeWithValidation={handleChangeWithValidation}
            onChangeDescription={onDescriptionChange} // <-- Acá pasamos la función correcta
            labelTitle={"Nombre del canal"}
            buttonlabel={"Crear nuevo canal"}
            title={newChannelName}
            description={newChannelDescription}
          />

          {isMobile && (
            <CloseButtonContainer>
              <IconButton size="small" onClick={onMobileToggle}>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <StyledTextField
                  fullWidth
                  size="small"
                  placeholder="Buscar canales"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ mr: 1 }}>
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </SearchContainer>

            <NavigationContainer>
              <List dense>
                <StyledListItemButton
                  onClick={() => setChannelsExpanded(!channelsExpanded)}
                >
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
                            if (isMobile) onMobileToggle();
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
      </MobileDrawer>

      <DesktopDrawer variant="permanent">
        <>
          <ModalCreate
            openModal={openModal}
            onCloseModal={onCloseModal}
            onCreate={onCreateChannel}
            titleError={channelNameError}
            handleChangeWithValidation={handleChangeWithValidation}
            onChangeDescription={onDescriptionChange}
            labelTitle={"Nombre del canal"}
            buttonlabel={"Crear nuevo canal"}
            title={newChannelName}
            description={newChannelDescription}
          />

          {isMobile && (
            <CloseButtonContainer>
              <IconButton size="small" onClick={onMobileToggle}>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <StyledTextField
                  fullWidth
                  size="small"
                  placeholder="Buscar canales"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ mr: 1 }}>
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </SearchContainer>

            <NavigationContainer>
              <List dense>
                <StyledListItemButton
                  onClick={() => setChannelsExpanded(!channelsExpanded)}
                >
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
                            if (isMobile) onMobileToggle();
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
      </DesktopDrawer>
    </>
  );
};

export default Sidebar;
