import { Box, Button, Typography, styled } from "@mui/material";

const CenterBox = styled(Box)`
text-align:
center; 
 `;

const ToggleText = styled(Typography)`
color: #6b7280;
font-size: 14px;
margin-bottom: 16px;
font-weight: 500;`;

const ToggleButton = styled(Button)`
border-radius: 8px;
padding: 12px 24px;
font-weight: 600;
background: white;`;


const AuthFooter = (
    { isLogin,
        toggleToRegister,
        toggleToLogin,
        loading
    }) => (
    <CenterBox>
        {isLogin ?  (
            <Box>
                <ToggleText>¿No tienes cuenta?</ToggleText>
                <ToggleButton
                    onClick={toggleToRegister}
                    disabled={loading}
                    fullWidth
                >
                    Crear cuenta
                </ToggleButton>
            </Box>
        ) : (
            <Box>
                <ToggleText>¿Ya tienes cuenta?</ToggleText>
                <ToggleButton
                    onClick={toggleToLogin}
                    disabled={loading}
                >
                    Iniciar sesión
                </ToggleButton>
            </Box>
        )}
    </CenterBox>
);

export default AuthFooter;
