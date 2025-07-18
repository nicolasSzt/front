import { styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: 12,
  "& label": {
    fontWeight: 500,
    color: theme.palette.mode === "dark" ? "#bbb" : "#555",
  },
  "& .MuiInputBase-root": {
    fontSize: "1rem",
    color: theme.palette.text.primary,
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: theme.palette.mode === "dark" ? "#666" : "rgba(0,0,0,0.42)", 
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: theme.palette.mode === "dark" ? "#aaa" : "rgba(0,0,0,0.87)",
  },
}));

export default StyledTextField;
