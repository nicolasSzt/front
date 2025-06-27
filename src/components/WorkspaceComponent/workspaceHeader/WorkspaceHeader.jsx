import { MainTitle, Subtitle } from "@/components/styled/Typography"

const WorkspaceHeader = ({ title, subtitle }) => {
  return (
    <>
      <MainTitle>{title}</MainTitle>
      <Subtitle>{subtitle}</Subtitle>
    </>
  )
}

export default WorkspaceHeader
