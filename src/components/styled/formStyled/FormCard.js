import { styled, Paper } from "@mui/material";

const FormCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 420,
  padding: 24,
  boxSizing: "border-box",
  borderRadius: 8,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 12px rgba(255 255 255 / 0.1)" 
      : "0 4px 12px rgba(0 0 0 / 0.1)",      
  backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
  color: theme.palette.text.primary,
}));

export default FormCard;
