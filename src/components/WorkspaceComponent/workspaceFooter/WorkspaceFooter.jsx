import { FooterLink, FooterText } from "@/components/styled/Typography"

const WorkspaceFooter = ({ helpText, supportText }) => {
    return (
        <FooterText>
            {helpText} <FooterLink href="#">{supportText}</FooterLink>
        </FooterText>
    )
}

export default WorkspaceFooter
