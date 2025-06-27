import { useState } from "react";
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
  Avatar,
  Badge,
  Divider,
  TextField,
  InputAdornment,
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
  FiberManualRecord as OnlineIcon,
} from "@mui/icons-material";
import WorkspaceHeader from "@/components/WorkspaceComponent/workspaceHeader/WorkspaceHeader";

const drawerWidth = 280;

// Styled Components
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
  width: ${({ isMobile }) => (isMobile ? "block" : "none")};
  flex-shrink: 0;
  @media (min-width: 900px) {
    width: ${drawerWidth}px;
    display: ${({ isMobile }) => (isMobile ? "none" : "block")};
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

const Sidebar = ({
  channels = [],
  selectedChannel = null,
  onChannelSelect = () => {},
  mobileOpen = false,
  onMobileToggle = () => {},
  currentWorkspace = null,
}) => {
  const [channelsExpanded, setChannelsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChannelClick = (channelId) => {
    onChannelSelect(channelId);
    if (isMobile) {
      onMobileToggle();
    }
  };

  const filteredChannels = channels.filter((channel) =>
    channel.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const drawerContent = (
    <SidebarContainer>
      <WorkspaceHeader currentWorkspace={currentWorkspace} />

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
              slotProps={{
                primary: {
                  variant: "body2",
                  fontWeight: 600,
                  color: "text.secondary",
                },
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
                      slotProps={{ primary: { variant: "body2" } }}
                    />
                  </ChannelListItemButton>
                </ListItem>
              ))}

              <ListItem disablePadding>
                <AddItemButton>
                  <ListItemIconStyled>
                    <AddIcon fontSize="small" />
                  </ListItemIconStyled>
                  <ListItemText
                    primary="Add channels"
                    slotProps={{
                      primary: { variant: "body2", color: "text.secondary" },
                    }}
                  />
                </AddItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </NavigationContainer>
    </SidebarContainer>
  );

  return (
    <NavBox component="nav" isMobile={isMobile}>
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
    </NavBox>
  );
};

export default Sidebar;