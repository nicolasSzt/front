import React, { useState } from "react";
import { useWorkspaceSelector } from "@/hooks/useWorkspaceSelector";
import { useWorkspacesWithChannels } from "@/hooks/useWorkspaceWithChannels";
import { WORKSPACE_SELECTOR_TEXTS } from "@/constans/workspaces/workspaces";
import useForm from "@/hooks/useForm";
import WorkspaceSelectorLayout from "@/components/WorkspaceComponent/workspaceSelectorLayout/WorkspaceLayaout";
import { useUserInformation } from "@/hooks/useUserInformation";
import useMemberInformation from "@/hooks/useMemerInformation";

export const WorkspaceSelector = () => {
    const {
        selectedWorkspace,
        handleWorkspaceSelect,
        handleCreateWorkspace,
    } = useWorkspaceSelector();

    const { users } = useUserInformation();

    const { membersByWorkspace } = useMemberInformation();
    const { workspaces, isLoading, isError, error } = useWorkspacesWithChannels();
    const [open, setOpen] = useState(false);
    const [titleError, setTitleError] = useState("");

    const dialog = {
        open,
        openDialog: () => setOpen(true),
        closeDialog: () => {
            resetForm();
            setOpen(false);
            setTitleError("");
        },
    };

    const {
        form_state,
        handleChange,
        handleSubmit,
        resetForm,
    } = useForm({
        initial_form_state: {
            title: "",
            description: "",
        },
        onSubmit: async () => {
            try {
                await handleCreateWorkspace(form_state.title, form_state.description);
                dialog.closeDialog();
                window.location.reload();
            } catch (e) {
                console.error("Error al crear workspace", e);
            }
        },
    });

    const handleChangeWithValidation = (e) => {
        handleChange(e);

        if (e.target.name === "title") {
            const value = e.target.value;

            if (!value.trim()) {
                setTitleError("");
                return;
            }

            const exists = workspaces.some(
                (ws) => ws.title === value
            );

            setTitleError(exists ? "Ya existe un workspace con este título." : "");
        }
    };

    const handleSubmitWorkspace = (e) => {
        e.preventDefault();
        if (!titleError && form_state.title.trim()) {
            handleSubmit(e);
        }
    };

    return (
        <WorkspaceSelectorLayout
            workspaces={workspaces}
            users={users}
            members={membersByWorkspace}
            isLoading={isLoading}
            isError={isError}
            error={error}
            selectedWorkspace={selectedWorkspace}
            onSelectWorkspace={handleWorkspaceSelect}
            dialog={dialog}
            workspaceForm={form_state}
            onChangeWorkspaceForm={handleChangeWithValidation}
            onSubmitWorkspace={handleSubmitWorkspace}
            titleError={titleError}
            texts={WORKSPACE_SELECTOR_TEXTS}
        />
    );
};


