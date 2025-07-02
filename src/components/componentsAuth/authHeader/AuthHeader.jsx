import { Box, Typography, styled } from "@mui/material";

const HeaderBox = styled(Box)`
  text-align: center;
  margin-bottom: 40px;
`;
const Title = styled(Typography)`
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
  font-size: 28px;
`;
const Subtitle = styled(Typography)`
  color: #6b7280;
  font-weight: 500;
  font-size: 15px;
`;

const AuthHeader = ({ isLogin }) => {
    return (
        <HeaderBox>
            <Title variant="h4">{isLogin ? "Iniciar sesión" : "Crear cuenta"}</Title>
            <Subtitle>{isLogin ? "Accede a tu cuenta" : "Únete a la plataforma"}</Subtitle>
        </HeaderBox>
    );
};

export default AuthHeader;
