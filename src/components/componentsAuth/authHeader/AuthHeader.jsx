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

const AuthHeader = ({ isLogin }) => {
  console.log("isLogin:", isLogin);
    return (
        <HeaderBox>
            <Title variant="h4">{isLogin ? "Iniciar sesión" : "Crear cuenta"}</Title>
        </HeaderBox>
    );
};

export default AuthHeader;
