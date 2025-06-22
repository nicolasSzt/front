import './WorkspaceList.css'
import WorkspaceItem from '../WorkspaceItem/WorkspaceItem'

const WorkspaceList = ({ workspaces }) => {
    return (
        <div>
            <h1>Tus espacios de trabajo</h1>
            <div>
                {workspaces.length > 0 ? (
                    workspaces.map(workspace => (
                        <WorkspaceItem
                            key={workspace.id}
                            title={workspace.title}
                            id={workspace.id}
                            miembros={workspace.miembros}
                            img={workspace.img}
                        />
                    ))
                ) : (
                    <p>No tienes espacios de trabajo aún.</p>
                )}
            </div>
        </div>
    )
}

export default WorkspaceList