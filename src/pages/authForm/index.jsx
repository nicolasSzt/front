import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
    Box,
    Button,
    FormControlLabel,
    Switch,
    Typography,
    TextField,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import handleRegister from "@/helpers/handleRegister";
import handleLogin from "@/helpers/handleLogin";
import { REGISTER_FIELD_NAME } from "@/constans/form/register";
import ThemeToggle from "@/components/themeToggle";
import { AuthAlerts } from "@/components/componentsAuth";

const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
        theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0f172a 0%, #334155 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
    transition: "background 0.5s ease",
    padding: theme.spacing(2),
}));

const AuthCard = styled(Box)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? "#1E1E1E" : "#fff",
    color: theme.palette.text.primary,
    padding: theme.spacing(4),
    borderRadius: 16,
    width: "100%",
    maxWidth: 420,
    boxShadow:
        theme.palette.mode === "dark"
            ? "0 8px 24px rgba(255, 255, 255, 0.1)"
            : "0 8px 24px rgba(0, 0, 0, 0.1)",
}));

const Title = styled(Typography)`
  font-weight: 700;
  font-size: 1.75rem;
  text-align: center;
`;

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    borderRadius: 8,
    fontWeight: 600,
    textTransform: "none",
    backgroundColor:
        theme.palette.mode === "dark" ? "#1363b4ff" : undefined,
    color:
        theme.palette.mode === "dark" ? "#ffffffff" : "#000000ff",
    "&:hover": {
        backgroundColor:
            theme.palette.mode === "dark" ? "#0c4b8aff" : undefined,
    },
}));

const AuthForm = () => {
    const theme = useTheme();
    const [formState, setFormState] = useState({
        [REGISTER_FIELD_NAME.NAME]: "",
        [REGISTER_FIELD_NAME.EMAIL]: "",
        [REGISTER_FIELD_NAME.PASSWORD]: "",
        [REGISTER_FIELD_NAME.CONFIRM_PASSWORD]: "",
    });

    const [uiState, setUiState] = useState({
        isLogin: true,
        showPassword: false,
        showConfirmPassword: false,
        loading: false,
        error: "",
        successMessage: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        if (uiState.error) setUiState((prev) => ({ ...prev, error: "" }));
    };

    const setUi = (updates) => setUiState((prev) => ({ ...prev, ...updates }));

    const handleLoginSubmit = handleLogin({
        formState,
        setUi,
        navigate,
    });

    const handleRegisterSubmit = handleRegister({
        formState,
        setUi,
        resetForm: () =>
            setFormState({
                [REGISTER_FIELD_NAME.NAME]: "",
                [REGISTER_FIELD_NAME.EMAIL]: "",
                [REGISTER_FIELD_NAME.PASSWORD]: "",
                [REGISTER_FIELD_NAME.CONFIRM_PASSWORD]: "",
            }),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uiState.isLogin) {
            await handleLoginSubmit();
        } else {
            await handleRegisterSubmit();
        }
    };

    const passwordMismatch =
        !uiState.isLogin &&
        formState[REGISTER_FIELD_NAME.PASSWORD] &&
        formState[REGISTER_FIELD_NAME.CONFIRM_PASSWORD] &&
        formState[REGISTER_FIELD_NAME.PASSWORD] !==
        formState[REGISTER_FIELD_NAME.CONFIRM_PASSWORD];

    const toggleAuthMode = (isLogin) => {
        setUi({ isLogin });
        setFormState({
            [REGISTER_FIELD_NAME.NAME]: "",
            [REGISTER_FIELD_NAME.EMAIL]: "",
            [REGISTER_FIELD_NAME.PASSWORD]: "",
            [REGISTER_FIELD_NAME.CONFIRM_PASSWORD]: "",
        });
    };

    return (
        <MainContainer>
            <AuthCard>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} mb={2}>
                    <Title variant="h1">{uiState.isLogin ? "Iniciar sesión" : "Registrarse"}</Title>
                    <ThemeToggle
                        toggleTheme={() => setDarkMode(!darkMode)}
                    />
                </Box>
                <AuthAlerts
                    successMessage={uiState.successMessage}
                    error={uiState.error}
                />

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    display="flex"
                    flexDirection="column"
                    gap={2}
                >
                    {!uiState.isLogin && (
                        <TextField
                            label="Nombre"
                            name={REGISTER_FIELD_NAME.NAME}
                            value={formState[REGISTER_FIELD_NAME.NAME]}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            autoComplete="name"
                            required
                        />
                    )}

                    <TextField
                        label="Email"
                        name={REGISTER_FIELD_NAME.EMAIL}
                        type="email"
                        value={formState[REGISTER_FIELD_NAME.EMAIL]}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        autoComplete="email"
                        required
                    />

                    <TextField
                        label="Contraseña"
                        name={REGISTER_FIELD_NAME.PASSWORD}
                        type={uiState.showPassword ? "text" : "password"}
                        value={formState[REGISTER_FIELD_NAME.PASSWORD]}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        autoComplete="current-password"
                        required
                    />

                    {!uiState.isLogin && (
                        <TextField
                            label="Confirmar contraseña"
                            name={REGISTER_FIELD_NAME.CONFIRM_PASSWORD}
                            type={uiState.showConfirmPassword ? "text" : "password"}
                            value={formState[REGISTER_FIELD_NAME.CONFIRM_PASSWORD]}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            autoComplete="new-password"
                            required
                            error={passwordMismatch}
                            helperText={passwordMismatch ? "Las contraseñas no coinciden" : ""}
                        />
                    )}

                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={uiState.showPassword}
                                    onChange={() => setUi({ showPassword: !uiState.showPassword })}
                                />
                            }
                            label="Mostrar contraseña"
                        />

                        {!uiState.isLogin && (
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={uiState.showConfirmPassword}
                                        onChange={() =>
                                            setUi({ showConfirmPassword: !uiState.showConfirmPassword })
                                        }
                                    />
                                }
                                label="Mostrar confirmar contraseña"
                            />
                        )}
                    </Box>

                    <StyledButton
                        type="submit"
                        variant="contained"
                        disabled={uiState.loading || passwordMismatch}
                        fullWidth
                    >
                        {uiState.loading
                            ? uiState.isLogin
                                ? "Iniciando..."
                                : "Creando..."
                            : uiState.isLogin
                                ? "Iniciar sesión"
                                : "Registrarse"}
                    </StyledButton>
                </Box>

                <Box
                    mt={3}
                    display="flex"
                    justifyContent="center"
                    gap={2}
                    flexWrap="wrap"
                    fontSize="0.9rem"
                    color={theme.palette.text.secondary}
                >
                    {uiState.isLogin ? (
                        <>
                            <Typography
                                component="span"
                                sx={{ cursor: "pointer", color: theme.palette.primary.main }}
                                onClick={() => toggleAuthMode(false)}
                            >
                                ¿No tienes cuenta? Regístrate
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography
                                component="span"
                                sx={{ cursor: "pointer", color: theme.palette.primary.main }}
                                onClick={() => toggleAuthMode(true)}
                            >
                                ¿Ya tienes cuenta? Inicia sesión
                            </Typography>
                        </>
                    )}
                </Box>
            </AuthCard>
        </MainContainer>
    );
};

export default AuthForm;
