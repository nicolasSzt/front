import { styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)`
  && {
    margin-top: 12px;

    & label {
      font-weight: 500;
      color: #555;
    }

    & .MuiInputBase-root {
      font-size: 1rem;
    }
  }
`;

export default StyledTextField;
