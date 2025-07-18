import { IconButton, Tooltip, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTheme } from "./themeProvider"
import { LightMode, DarkMode } from "@mui/icons-material"

const StyledToggle = styled(IconButton)(({ theme }) => ({
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
        transform: "scale(1.1)",
        backgroundColor: theme.palette.action.hover,
        boxShadow: theme.shadows[4],
    },
    "&:active": {
        transform: "scale(0.95)",
    },
}))

const IconWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
})

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme()

    return (
        <Tooltip title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}>
            <StyledToggle onClick={toggleTheme} size="large">
                <IconWrapper sx={{ transform: darkMode ? "rotate(180deg)" : "rotate(0deg)" }}>
                    {darkMode ? <LightMode /> : <DarkMode />}
                </IconWrapper>
            </StyledToggle>
        </Tooltip>
    )
}

export default ThemeToggle
