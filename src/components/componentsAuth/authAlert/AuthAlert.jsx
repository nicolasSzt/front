import { Alert, styled, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const CleanAlert = styled(Alert)(({ theme }) => ({
  borderRadius: 8,
  marginBottom: 24,
  display: "flex",
  alignItems: "center",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.success.dark
      : undefined,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.getContrastText(theme.palette.success.dark)
      : undefined,
  "&.MuiAlert-standardError": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.error.dark
        : undefined,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.getContrastText(theme.palette.error.dark)
        : undefined,
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
      {error &&
        <CleanAlert severity="error">
          {error}
        </CleanAlert>}
    </>
  );
};

export default AuthAlerts;
