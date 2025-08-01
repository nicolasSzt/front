import { Alert, styled, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
const CleanAlert = styled(Alert)(({ theme }) => ({
  borderRadius: 8,
  marginBottom: 24,
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.primary,
  color: theme.palette.primary,
  "&.MuiAlert-standardError": {
    backgroundColor: theme.palette.primary,
    color: theme.palette.error.dark,
  },
}));

const AuthAlerts = ({ successMessage, error }) => {
  return (
    <>
      {successMessage && (
        <CleanAlert icon={<CheckCircle />} severity="success">
          {successMessage}
        </CleanAlert>
      )}
      {error && (
        <CleanAlert icon={<CheckCircle />} severity="error">
          {error}
        </CleanAlert>
      )}
    </>
  );
};

export default AuthAlerts;