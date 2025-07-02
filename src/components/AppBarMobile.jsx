import React from "react";
import styled from "@emotion/styled";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const StyledAppBar = styled(AppBar)`
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

const AppBarMobile = ({ selectedChannelLabel, handleDrawerToggle }) => {
    return (
        <StyledAppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    {selectedChannelLabel || "Selecciona un canal"}
                </Typography>
            </Toolbar>
        </StyledAppBar>
    );
};

export default AppBarMobile;
