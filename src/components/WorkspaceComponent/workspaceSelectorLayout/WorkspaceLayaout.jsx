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
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from "@mui/material";
import GlobalStyles from "@/components/GlobalStyles";
import CreateWorkspaceCardComponent from "../createWorkspaceCard/CreateWorkspaceCard";
import WorkspaceCard from "@/components/WorkspaceComponent/workspaceCard/WorkspaceCard";

const CenteredContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas iguales */
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column; /* Cambia a una sola columna en pantallas pequeñas */
  }
`;

const DialogContentStyled = styled(DialogContent)`
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
    users,
    members,
    dialog,
    workspaceForm,
    onChangeWorkspaceForm,
    onSubmitWorkspace,
    titleError,
    texts,
}) => {
    if (isLoading || isError) {
        return (
            <CenteredContainer>
                {isLoading && (
                    <>
                        <CircularProgress />
                        <Typography mt={2}>Cargando datos...</Typography>
                    </>
                )}
                {isError && (
                    <Typography color="error">
                        Error al obtener datos: {error?.message || "Error desconocido"}
                    </Typography>
                )}
            </CenteredContainer>
        );
    }

    return (
        <>
            <GlobalStyles />
            <MainContainer>
                <ContentContainer>
                    <WorkspaceHeader title={texts.title} />

                    <CardsContainer>
                        {workspaces.map((workspace) => {
                            const membersInfo = members.find(m => m.workspaceId === workspace._id);
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
                        })}
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

            <Dialog
                open={dialog.open}
                onClose={dialog.closeDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Crear nuevo workspace</DialogTitle>
                <DialogContentStyled>
                    <TextField
                        autoFocus
                        label="Título del workspace"
                        fullWidth
                        variant="standard"
                        name="title"
                        value={workspaceForm.title}
                        onChange={onChangeWorkspaceForm}
                        error={!!titleError}
                        helperText={titleError || ""}
                    />
                    <TextField
                        label="Descripción del workspace"
                        fullWidth
                        variant="standard"
                        name="description"
                        value={workspaceForm.description}
                        onChange={onChangeWorkspaceForm}
                    />
                </DialogContentStyled>
                <DialogActions>
                    <Button onClick={dialog.closeDialog}>Cancelar</Button>
                    <Button
                        onClick={onSubmitWorkspace}
                        disabled={
                            !workspaceForm.title.trim() ||
                            !workspaceForm.description.trim() ||
                            !!titleError
                        }
                        variant="contained"
                    >
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default WorkspaceSelectorLayout;
