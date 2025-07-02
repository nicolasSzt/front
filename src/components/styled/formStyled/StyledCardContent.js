import { CardContent, styled } from "@mui/material";

const StyledCardContent = styled(CardContent)`
  padding: 0 !important; /* Para que quede sin padding extra */
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default StyledCardContent;
