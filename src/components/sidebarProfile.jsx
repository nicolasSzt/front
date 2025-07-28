import { useState } from "react"
import styled from "@emotion/styled"
import {
  Drawer,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material"
import { Person, Settings, AccountCircle, ExitToApp } from "@mui/icons-material"
import useGetUserInformation from "../hooks/useGetUserInformation"
import ThemeToggle from "./themeToggle"
import { useNavigate } from "react-router-dom"

const drawerWidth = 100

const SidebarContainer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  display: none;

  @media (min-width: 900px) {
    display: flex;
  }

  & .MuiDrawer-paper {
    width: ${drawerWidth}px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: end;
    padding: ${({ theme }) => theme.spacing(1)};
  }
`

const SidebarContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  justify-content: end;
`

const StyledButton = styled(Button)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.palette.text.primary};
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: 60px;

 span {
    margin: 0px ;
  },
`

const ThemeToggleContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
color: ${({ theme }) => theme.palette.text.primary};

`

const SidebarProfile = (userId) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logOut = () => {
    localStorage.removeItem('authorization_token');
    if (!localStorage.getItem('authorization_token')) {
      navigate('/login');
    }
  }

  const { userName, isError } = useGetUserInformation(userId)

  return (
    <SidebarContainer variant="permanent">
      <ThemeToggleContainer>
        <ThemeToggle />
      </ThemeToggleContainer>
      <SidebarContent>
        {isError ? (
          <Box textAlign="center">
            <Typography variant="caption" color="error">
              Error
            </Typography>
          </Box>
        ) : (
          <>
            <StyledButton
              aria-haspopup="true"
              onClick={handleClick}
              startIcon={<AccountCircle />}
              size="small"
            >
              <Typography
                variant="caption"
                noWrap
                sx={{ maxWidth: "80px" }}
              >
                {userName}
              </Typography>
            </StyledButton>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                sx: {
                  minWidth: 200,
                  mt: 1,
                  ml: 1,
                },
              }}
            >
              <MenuItem onClick={logOut}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cerrar Sesión</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </SidebarContent>
    </SidebarContainer>
  )
}

export default SidebarProfile

