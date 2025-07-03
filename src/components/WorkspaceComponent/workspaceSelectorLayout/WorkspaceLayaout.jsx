import React from "react";
import styled from "@emotion/styled";
import {
    MainContainer,
    ContentContainer,
} from "@/components/styled/Container";
import WorkspaceHeader from "@/components/WorkspaceComponent/workspaceHeader/WorkspaceHeader";
import WorkspaceFooter from "@/components/WorkspaceComponent/workspaceFooter/WorkspaceFooter";
import {
    CircularProgress,
    Typography,
    Box,
    TextField,
    Button,
} from "@mui/material";
import GlobalStyles from "@/components/GlobalStyles";
import CreateWorkspaceCardComponent from "../createWorkspaceCard/CreateWorkspaceCard";
import WorkspaceCard from "@/components/WorkspaceComponent/workspaceCard/WorkspaceCard";
import Modal from "@/components/modal";

const CenteredContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 60vh;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const WorkspaceSelectorLayout = ({
    workspaces,
    isLoading,
    isError,
    error,
    selectedWorkspace,
    onSelectWorkspace,
    members,
    dialog,
    workspaceForm,
    onChangeWorkspaceForm,
    onSubmitWorkspace,
    titleError,
    texts,
}) => {
    if (isLoading) {
        return (
            <>
                <GlobalStyles />
                <MainContainer>
                    <ContentContainer>
                        <WorkspaceHeader title={texts.title} />
                        <CenteredContainer>
                            <CircularProgress />
                            <Typography mt={2}>Cargando datos...</Typography>
                        </CenteredContainer>
                    </ContentContainer>
                </MainContainer>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <GlobalStyles />
                <MainContainer>
                    <ContentContainer>
                        <WorkspaceHeader title={texts.title} />
                        <CenteredContainer>
                            <Typography color="error">
                                Error al obtener datos: {error?.message || "Error desconocido"}
                            </Typography>
                        </CenteredContainer>
                    </ContentContainer>
                </MainContainer>
            </>
        );
    }

    return (
        <>
            <GlobalStyles />
            <MainContainer>
                <ContentContainer>
                    <WorkspaceHeader title={texts.title} />
                    <CardsContainer>
                        {workspaces.length > 0 ? (
                            workspaces.map((workspace) => {
                                const membersInfo = members.find(
                                    (m) => m.workspaceId === workspace._id
                                );
                                const membersCount = membersInfo?.members.length || 0;

                                return (
                                    <WorkspaceCard
                                        key={workspace._id}
                                        workspace={workspace}
                                        membersCount={membersCount}
                                        channelsCount={workspace.channelsCount}
                                        isSelected={workspace._id === selectedWorkspace}
                                        onSelect={onSelectWorkspace}
                                    />
                                );
                            })
                        ) : (
                            <Typography
                                variant="h6"
                                sx={{
                                    gridColumn: "1 / -1",
                                    textAlign: "center",
                                    width: "100%",
                                    display: "block",
                                }}
                            >
                                No se encontraron workspaces
                            </Typography>
    
                        )}
                    </CardsContainer>

                    <CreateWorkspaceCardComponent
                        onCreateWorkspace={dialog.openDialog}
                        title={texts.createNew}
                        description={texts.createNewDescription}
                        buttonText={texts.createButton}
                    />

                    <WorkspaceFooter
                        helpText={texts.helpText}
                        supportText={texts.contactSupport}
                    />
                </ContentContainer>
            </MainContainer>

            <Modal
                open={dialog.open}
                onClose={dialog.closeDialog}
                title="Crear nuevo workspace"
                actions={
                    <>
                        <Button onClick={dialog.closeDialog}>Cancelar</Button>
                        <Button
                            onClick={onSubmitWorkspace}
                            variant="contained"
                            disabled={
                                !workspaceForm.title.trim() ||
                                !workspaceForm.description.trim() ||
                                !!titleError
                            }
                        >
                            Crear
                        </Button>
                    </>
                }
            >
                <ModalContent>
                    <TextField
                        autoFocus
                        label="Título del workspace"
                        name="title"
                        value={workspaceForm.title}
                        onChange={onChangeWorkspaceForm}
                        error={!!titleError}
                        helperText={titleError || ""}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        label="Descripción del workspace"
                        name="description"
                        value={workspaceForm.description}
                        onChange={onChangeWorkspaceForm}
                        fullWidth
                        variant="standard"
                    />
                </ModalContent>
            </Modal>
        </>
    );
};

export default WorkspaceSelectorLayout;
