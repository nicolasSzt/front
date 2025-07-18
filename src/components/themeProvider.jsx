import { createContext, useContext, useState, useEffect } from "react"
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material"
import { lightTheme, darkTheme } from "../styles/theme"

const ThemeContext = createContext(undefined)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkModeState] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        try {
            const savedTheme = localStorage.getItem("theme")
            if (savedTheme) {
                setDarkModeState(savedTheme === "dark")
            } else {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                setDarkModeState(prefersDark)
            }
        } catch (error) {
            console.warn("Error loading theme preference:", error)
        }
    }, [])

    const setDarkMode = (dark) => {
        setDarkModeState(dark)
        try {
            localStorage.setItem("theme", dark ? "dark" : "light")
        } catch (error) {
            console.warn("Error saving theme preference:", error)
        }
    }

    const toggleTheme = () => {
        setDarkMode(!darkMode)
    }

    const theme = darkMode ? darkTheme : lightTheme

    if (!mounted) {
        return null
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme, setDarkMode }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}
