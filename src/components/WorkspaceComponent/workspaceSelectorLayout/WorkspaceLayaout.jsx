"use client"
import { styled } from "@mui/material/styles"
import { CircularProgress, Typography, Box, TextField, Button, Container, Paper } from "@mui/material"
import ThemeToggle from "../../themeToggle"
import Modal from "@/components/modal"
import CreateWorkspaceCard from "../createWorkspaceCard/CreateWorkspaceCard"
import { WorkspaceCard } from ".."
import { useTheme } from "@/components/themeProvider"


const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: "100vh",

    background:
        theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0f172a 0%, #334155 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
    transition: "background 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
        padding: theme.spacing(4, 0),
    },
}))

const StyledContainer = styled(Container)({
    maxWidth: "md",

})

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up("sm")]: {
        alignItems: "center",
        marginBottom: theme.spacing(4),
        padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: theme.spacing(2),
        alignItems: "stretch",
    },
}))

const HeaderContent = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: 4,
    [theme.breakpoints.up("sm")]: {
        gap: 8,
    },
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.75rem",
    fontWeight: "bold",
    [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "2.125rem",
    },
}))

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: "0.875rem",
    [theme.breakpoints.up("sm")]: {
        fontSize: "1rem",
    },
}))

const LoadingContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
    gap: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
        minHeight: "60vh",
    },
}))

const WorkspacesContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
        marginBottom: theme.spacing(4),
    },
}))


const WorkspaceWrapper = styled(Box)(({ theme }) => ({
    width: "calc(50% - 12px)",
    margin: "0 6px 24px",
    display: "flex",
    justifyContent: "center",

    [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: "0 0 16px",
    },

    "&.centered": {
        margin: "0 auto 24px",
    },
}));


const CreateWorkspaceContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
        marginBottom: theme.spacing(4),
    },
}))

const ModalContent = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
        gap: theme.spacing(3),
    },
}))

const ThemeToggleContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        alignSelf: "flex-end",
    },
}))

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
    const { darkMode, toggleTheme, setDarkMode } = useTheme()
    const renderWorkspaceCards = () => {
        if (!workspaces?.length) {
            return (
                <Box display="flex" justifyContent="center" width="100%">
                    <Typography align="center" variant="h6" color="text.secondary">
                        {texts.noWorkspaces || "No se encontraron workspaces"}
                    </Typography>
                </Box>
            )
        }

        const isOdd = workspaces.length % 2 !== 0

        return workspaces.map((workspace, index) => {
            const isLast = index === workspaces.length - 1
            const shouldCenter = isLast && isOdd

            const membersInfo = members.find((m) => m.workspaceId === workspace._id)
            const membersCount = membersInfo?.members?.length || 0

            return (
                <WorkspaceWrapper key={workspace._id} className={shouldCenter ? "centered" : ""}>
                    <WorkspaceCard
                        workspace={workspace}
                        membersCount={membersCount}
                        isSelected={workspace._id === selectedWorkspace}
                        onSelect={onSelectWorkspace}
                    />
                </WorkspaceWrapper>
            )
        })
    }

    if (isLoading) {
        return (
            <MainContainer>
                <StyledContainer>
                    <LoadingContainer>
                        <CircularProgress size={48} thickness={4} />
                        <Typography variant="h6" color="text.secondary">
                            Cargando workspaces...
                        </Typography>
                    </LoadingContainer>
                </StyledContainer>
            </MainContainer>
        )
    }

    if (isError) {
        return (
            <MainContainer>
                <StyledContainer>
                    <LoadingContainer>
                        <Typography color="error" variant="h6">
                            Error al obtener datos: {error?.message || "Error desconocido"}
                        </Typography>
                    </LoadingContainer>
                </StyledContainer>
            </MainContainer>
        )
    }

    return (
        <MainContainer>
            <StyledContainer>
                <HeaderContainer>
                    <HeaderContent>
                        <HeaderTitle component="h1">{texts.title}</HeaderTitle>
                        <HeaderSubtitle color="text.secondary">Selecciona o crea un workspace para comenzar</HeaderSubtitle>
                    </HeaderContent>
                    <ThemeToggleContainer>
                        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} setDarkMode={setDarkMode} />
                    </ThemeToggleContainer>
                </HeaderContainer>

                <WorkspacesContainer>{renderWorkspaceCards()}</WorkspacesContainer>

                <CreateWorkspaceContainer>
                    <CreateWorkspaceCard
                        onCreateWorkspace={dialog.openDialog}
                        title={texts.createNew}
                        description={texts.createNewDescription}
                    />
                </CreateWorkspaceContainer>

             
            </StyledContainer>

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
                            disabled={!workspaceForm.title.trim() || !workspaceForm.description.trim() || !!titleError}
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
                        variant="outlined"
                    />
                    <TextField
                        label="Descripción del workspace"
                        name="description"
                        value={workspaceForm.description}
                        onChange={onChangeWorkspaceForm}
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                    />
                </ModalContent>
            </Modal>
        </MainContainer>
    )
}

export default WorkspaceSelectorLayout
