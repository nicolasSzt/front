import { CreateWorkspaceCard, CreateWorkspaceContent } from "@/components/styled/Card"
import { IconContainer } from "@/components/styled/Layaout"
import { CreateDescription, CreateTitle } from "@/components/styled/Typography"
import { PrimaryButton } from "@/components/styled/Button"


const CreateWorkspaceCardComponent = (
  {
    onCreateWorkspace,
    title,
    description,
    buttonText
  }) => {
  return (
    <CreateWorkspaceCard onClick={onCreateWorkspace}>
      <CreateWorkspaceContent>
        <IconContainer>
          <div style={{ fontSize: "32px", color: "#718096" }}>+</div>
        </IconContainer>

        <CreateTitle>{title}</CreateTitle>
        <CreateDescription>{description}</CreateDescription>
        <PrimaryButton>{buttonText}</PrimaryButton>
      </CreateWorkspaceContent>
    </CreateWorkspaceCard>
  )
}

export default CreateWorkspaceCardComponent
