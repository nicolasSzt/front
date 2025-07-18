import { styled, Divider } from "@mui/material";

const DividerStyled = styled(Divider)(({ theme }) => ({
  margin: "24px 0",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.divider 
      : undefined,
}));

export default DividerStyled;
