import { Alert, styled } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const CleanAlert = styled(Alert)`
 border-radius: 8px;
 margin-bottom: 24px;
 display: flex;
 align-items: center;
 `;

const AuthAlerts = ({ successMessage, error }) => (
    <>
        {successMessage && (
            <CleanAlert icon={<CheckCircle />} severity="success">
                {successMessage}
            </CleanAlert>
        )}
        {error && <CleanAlert severity="error">{error}</CleanAlert>}
    </>
);

export default AuthAlerts;
