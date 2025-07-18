import { Box, Typography, styled, } from "@mui/material";

const HeaderBox = styled(Box)`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: 8,
  fontSize: 28,
  color: theme.palette.text.primary,
}));

const AuthHeader = ({ isLogin }) => {

  return (
    <HeaderBox>
      <Title variant="h4">
        {isLogin ? "Iniciar sesión" : "Crear cuenta"}
      </Title>
    </HeaderBox>
  );
};

export default AuthHeader;
