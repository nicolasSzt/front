import React from "react";
import { useWorkspaceSelector } from "@/hooks/useWorkspaceSelector";
import { WORKSPACE_SELECTOR_TEXTS } from "@/constans/workspaces/workspaces";
import { MainContainer, ContentContainer, GridContainer } from "@/components/styled/Container";
import WorkspaceHeader from "@/components/WorkspaceComponent/workspaceHeader/WorkspaceHeader";
import WorkspaceCard from "@/components/WorkspaceComponent/workspaceCard/WorkspaceCard";
import WorkspaceFooter from "@/components/WorkspaceComponent/workspaceFooter/WorkspaceFooter";
import CreateWorkspaceCardComponent from "@/components/createWorkspaceCard/createWorkspaceCard";
import GlobalStyles from "@/components/GlobalStyles";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkspaces } from "@/services/workspaceService/workspaceService";
import { CircularProgress, Typography, Box } from "@mui/material";

const WorkspaceSelector = () => {
  const { selectedWorkspace, handleWorkspaceSelect, handleCreateWorkspace } = useWorkspaceSelector();

  const { data: workspaces, isLoading, isError, error } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Cargando workspaces...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="body1" color="error">
          Error al obtener los workspaces: {error?.message || "Error desconocido"}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <ContentContainer>
          <WorkspaceHeader
            title={WORKSPACE_SELECTOR_TEXTS.title}
            subtitle={WORKSPACE_SELECTOR_TEXTS.subtitle}
          />

          <GridContainer>
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace._id}
                workspace={workspace}
                isSelected={selectedWorkspace === workspace._id}
                onSelect={() => handleWorkspaceSelect(workspace._id)}
              />
            ))}
          </GridContainer>

          <CreateWorkspaceCardComponent
            onCreateWorkspace={async (workspaceData) => {
              try {
                const newWorkspace = await handleCreateWorkspace(workspaceData);
                console.log("Nuevo workspace creado:", newWorkspace);
              } catch (error) {
                console.error("Error al crear workspace", error);
              }
            }}
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
  );
};

export default WorkspaceSelector;
