import { Button as MuiButton, styled } from "@mui/material";

const StyledButton = styled(MuiButton)`
  && {
    height: 42px;
    font-weight: 600;
    font-size: 1rem;
    text-transform: none;
    border-radius: 6px;
  }
`;

export default StyledButton;

