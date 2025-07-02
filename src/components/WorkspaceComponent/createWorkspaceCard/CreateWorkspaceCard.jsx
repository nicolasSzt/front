import styled from "@emotion/styled";
import { CreateWorkspaceCard, CreateWorkspaceContent } from "@/components/styled/Card";
import { IconContainer } from "@/components/styled/Layaout";
import { CreateDescription, CreateTitle } from "@/components/styled/Typography";
import { PrimaryButton } from "@/components/styled/Button";
import { Box } from "@mui/material";

const PlusIcon = styled(Box)`
  font-size: 40px;
  color: #718096;
  width: 64px;
  height: 64px;
  border-radius: 50%; 
  background-color: #f0f4f8; 
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none; /* para que no se pueda seleccionar el signo + */
`;

const CreateWorkspaceCardComponent = ({ onCreateWorkspace, title, description, buttonText }) => {
  return (
    <CreateWorkspaceCard>
      <CreateWorkspaceContent>
        <IconContainer>
          <PlusIcon>+</PlusIcon>
        </IconContainer>

        <CreateTitle>{title}</CreateTitle>
        <CreateDescription>{description}</CreateDescription>
        <PrimaryButton onClick={onCreateWorkspace}>{buttonText}</PrimaryButton>
      </CreateWorkspaceContent>
    </CreateWorkspaceCard>
  );
};

export default CreateWorkspaceCardComponent;
