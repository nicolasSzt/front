import { StyledAvatar } from "@/components/styled/Avatar"

const WorkspaceAvatar = ({ workspace, size = 48 }) => {
  const { initials, color, name } = workspace

  return (
    <StyledAvatar
      size={size}
      color={color}
      title={name}
    >
      {initials}
    </StyledAvatar>
  )
}

export default WorkspaceAvatar
