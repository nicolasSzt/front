import { ContentContainer, GridContainer, MainContainer } from "@/components/styled/Container"
import { WORKSPACE_DATA, WORKSPACE_SELECTOR_TEXTS } from "@/constans/workspaces/workspaces"
import WorkspaceCard from "@/components/WorkspaceComponent/workspaceCard/WorkspaceCard"
import CreateWorkspaceCardComponent from "@/components/createWorkspaceCard/createWorkspaceCard"
import WorkspaceFooter from "@/components/WorkspaceComponent/workspaceFooter/WorkspaceFooter"
import WorkspaceHeader from "@/components/WorkspaceComponent/workspaceHeader/WorkspaceHeader"
import { GlobalStyles } from "@/components/GlobalStyles"


const WorkspaceSelector = () => {
  const { selectedWorkspace, handleWorkspaceSelect, handleCreateWorkspace } = useWorkspaceSelector()

  return (
    <>
      <GlobalStyles/>
      <MainContainer>
        <ContentContainer>
          <WorkspaceHeader
            title={WORKSPACE_SELECTOR_TEXTS.title}
            subtitle={WORKSPACE_SELECTOR_TEXTS.subtitle} />

          <GridContainer>
            {WORKSPACE_DATA.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
                isSelected={selectedWorkspace === workspace.id}
                onSelect={handleWorkspaceSelect}
              />
            ))}
          </GridContainer>

          <CreateWorkspaceCardComponent
            onCreateWorkspace={handleCreateWorkspace}
            title={WORKSPACE_SELECTOR_TEXTS.createNew}
            description={WORKSPACE_SELECTOR_TEXTS.createNewDescription}
            buttonText={WORKSPACE_SELECTOR_TEXTS.createButton}
          />

          <WorkspaceFooter
            helpText={WORKSPACE_SELECTOR_TEXTS.helpText}
            supportText={WORKSPACE_SELECTOR_TEXTS.contactSupport}
          />
        </ContentContainer>
      </MainContainer>
    </>
  )
}

export default WorkspaceSelector
