
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react"
import { createWorkspace } from "@/services/workspaceService";

export const useWorkspaceSelector = () => {
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const navigate = useNavigate();
    const handleWorkspaceSelect = useCallback(
        (workspaceId) => {
            navigate(`/workspaceDetail/${workspaceId}`);
        },
        [navigate]
    );

    const handleCreateWorkspace = useCallback(
        async (workspaceTitle, workspaceDescription) => {
            try {
                const newWorkspace = await createWorkspace(
                    workspaceTitle,
                    workspaceDescription
                );
                setSelectedWorkspace(newWorkspace._id);
                return newWorkspace;
            } catch (error) {
                console.error('Error creating workspace', error);
                throw error;
            }
        },
        []
    );

    return {
        selectedWorkspace,
        handleWorkspaceSelect,
        handleCreateWorkspace,
    }
}
