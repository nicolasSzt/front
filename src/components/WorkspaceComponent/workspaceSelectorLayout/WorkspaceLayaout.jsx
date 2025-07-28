"use client"
import { styled } from "@mui/material/styles"
import { CircularProgress, Typography, Box, TextField, Button, Container, Paper } from "@mui/material"
import ThemeToggle from "../../themeToggle"
import CreateWorkspaceCard from "../createWorkspaceCard/CreateWorkspaceCard"
import { WorkspaceCard } from ".."
import { useTheme } from "@/components/themeProvider"
import { useNavigate } from "react-router-dom"
import ModalCreate from "@/components/modal"


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
    selectedWorkspace,
    onSelectWorkspace,
    members,
    dialog,
    workspaceForm,
    onChangeWorkspaceTitle,
    onChangeWorkspaceDescription,
    onSubmitWorkspace,
    titleError,
    texts,
}) => {
    const { darkMode, toggleTheme, setDarkMode } = useTheme()
    const navigate = useNavigate()

    function getMembersCount(workspaceId) {
        const memberInfo = members.find((m) => m.workspaceId === workspaceId);

        if (!memberInfo) {
            return
        } else {
            return memberInfo.members.length;
        }

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
    } else if (localStorage.getItem("authorization_token") === null) {
        navigate("/login");
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

                <WorkspacesContainer>
                    {workspaces.length > 0 ? (
                        workspaces.map((workspace) => (
                            <WorkspaceWrapper key={workspace._id}>
                                <WorkspaceCard
                                    workspace={workspace}
                                    membersCount={getMembersCount(workspace._id)}
                                    members={members}
                                    isSelected={workspace._id === selectedWorkspace}
                                    onSelect={onSelectWorkspace}
                                />
                            </WorkspaceWrapper>
                        ))
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            width="100%"
                        >
                            <Typography
                                align="center"
                                variant="h6"
                                color="text.secondary"
                            >
                                {texts.noWorkspaces || "No se encontraron workspaces"}
                            </Typography>
                        </Box>
                    )}
                </WorkspacesContainer>

                <CreateWorkspaceContainer>
                    <CreateWorkspaceCard
                        onCreateWorkspace={dialog.openDialog}
                        title={texts.createNew}
                        description={texts.createNewDescription}
                    />
                </CreateWorkspaceContainer>


            </StyledContainer>
            <ModalCreate
                channelNameError={titleError}
                handleChangeWithValidationTitle={onChangeWorkspaceTitle}
                handleChangeDescription={onChangeWorkspaceDescription}
                newChannelName={workspaceForm.title}
                newChannelDescription={workspaceForm.description}
                openModal={dialog.open}
                onCloseModal={dialog.closeDialog}
                onCreateChannel={onSubmitWorkspace}
            />
        </MainContainer>
    )
}

export default WorkspaceSelectorLayout
