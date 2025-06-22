import { useNavigate } from 'react-router-dom'
import './workspaceItem.css'

const WorkspaceItem = ({ img, title, members, id }) => {
    const navigate = useNavigate

    const handleClick = () => {
        navigate('/workspace/' + id)
    }

    return (
        <div
            className="workspace-item"
        >
            <img className='workspace-item__icon' src={img} alt={title} />
            <h2>{title}</h2>
            <span className='workspace-item__name'>Hay {members.length} miembros</span>
            <button onClick={handleClick}>Ir a el espacio de trabajo</button>
        </div>
    )
}

export default WorkspaceItem