import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WORKSPACE_SELECTOR_TEXTS } from "@/constans/workspaces/workspaces";
import WorkspaceSelectorLayout from "@/components/WorkspaceComponent/workspaceSelectorLayout/WorkspaceLayaout";
import useMemberInformation from "@/hooks/useMemerInformation";
import useWorkspaceManager from "@/hooks/useWorkspaceWithChannels";

const WorkspaceSelector = () => {
  const { membersByWorkspace } = useMemberInformation();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const navigate = useNavigate();

  const {
    workspaces,
    isLoading,
    selectedWorkspace,
    handleWorkspaceSelect,
    handleCreateWorkspace,
  } = useWorkspaceManager();

  const dialog = {
    open,
    openDialog: () => setOpen(true),
    closeDialog: () => {
      setOpen(false);
      setTitle("");
      setDescription("");
      setTitleError("");
    },
  };

  const handleChangeTitle = (e) => {
    const value = e.target.value;
    setTitle(value);

    const exists = workspaces.some(
      (ws) => ws.title.toLowerCase() === value.trim().toLowerCase()
    );
    setTitleError(exists ? "Ya existe un workspace con este título." : "");
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitWorkspace = (e) => {
    e.preventDefault();
    if (title.trim() && !titleError) {
      handleCreateWorkspace(title.trim(), description.trim())
        .then(() => {
          dialog.closeDialog();
          navigate(0);
        })
        .catch((err) => console.error("Error al crear workspace", err));
    }
  };

  return (
    <WorkspaceSelectorLayout
      workspaces={workspaces}
      members={membersByWorkspace}
      isLoading={isLoading}
      selectedWorkspace={selectedWorkspace}
      onSelectWorkspace={handleWorkspaceSelect}
      dialog={dialog}
      workspaceForm={{ title, description }}
      onChangeWorkspaceTitle={handleChangeTitle}
      onChangeWorkspaceDescription={handleChangeDescription}
      titleError={titleError}
      onSubmitWorkspace={handleSubmitWorkspace}
      texts={WORKSPACE_SELECTOR_TEXTS}
    />
  );
};

export default WorkspaceSelector;
