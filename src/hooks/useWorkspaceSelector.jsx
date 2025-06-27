
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react"

export const useWorkspaceSelector = () => {
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);

    const navigate = useNavigate();
    
    const handleWorkspaceSelect = useCallback(
        (workspaceId) => {
            setSelectedWorkspace(workspaceId);
            navigate(`/workspaceDetail/${workspaceId}`);
        },
        [navigate]
    );

    const handleCreateWorkspace = useCallback(
        async (workspace) => {
            try {
                const newWorkspace = await createWorkspace(workspace);
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
