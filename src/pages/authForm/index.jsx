import { useState } from "react";

import { Container } from "@/components/styled/formStyled/Container";
import FormCard from "@/components/styled/formStyled/FormCard";
import StyledCardContent from "@/components/styled/formStyled/StyledCardContent";
import AuthHeader from "@/components/componentsAuth/authHeader/AuthHeader";
import AuthAlerts from "@/components/componentsAuth/authAlert/AuthAlert";
import FormContainer from "@/components/styled/formStyled/FormContainer";
import AuthFormFields from "@/components/componentsAuth/authFormFIelds/AuthFormFields";
import AuthFooter from "@/components/componentsAuth/authFooter/AuthFooter";
import Divider from "@/components/styled/formStyled/Divider";
import { Button } from "@mui/material";
import { REGISTER_FIELD_NAME } from "@/constans/form/register";
import styled from "@emotion/styled";
import handleRegister from "@/helpers/handleRegister";
import { useNavigate } from "react-router-dom";
import handleLogin from "@/helpers/handleLogin";

const initialFormState = {
    [REGISTER_FIELD_NAME.NAME]: "",
    [REGISTER_FIELD_NAME.EMAIL]: "",
    [REGISTER_FIELD_NAME.PASSWORD]: "",
    [REGISTER_FIELD_NAME.CONFIRM_PASSWORD]: "",
};

const initialUiState = {
    isLogin: true,
    isRegister: true,
    showPassword: false,
    showConfirmPassword: false,
    loading: false,
    error: "",
    successMessage: "",
};

const StyledButton = styled(Button)`
  margin-top: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 7px;
  text-transform: none;
  font-weight: 600;
  width: 100%;
`;

const StyledFormCard = styled(FormCard)`
  width: 100%;
  max-width: 500px;
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: white;

  @media (min-width: 600px) {
    padding: 32px;
  }
`;

const AuthForm = () => {
    const [formState, setFormState] = useState(initialFormState);
    const [uiState, setUiState] = useState(initialUiState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        if (uiState.error) {
            setUiState((prev) => ({ ...prev, error: "" }));
        }
    };

    const setUi = (updates) => {
        setUiState((prev) => ({ ...prev, ...updates }));
    };

    const handleLoginSubmit = handleLogin({
        formState,
        setUi,
        navigate
    });

    const handleRegisterSubmit = handleRegister({
        formState,
        setUi,
        resetForm: () => setFormState(initialFormState),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uiState.isLogin) {
            await handleLoginSubmit();
        } else {
            await handleRegisterSubmit();
        }
    };

    const passwordMismatch =
        !uiState.isLogin &&
        formState[REGISTER_FIELD_NAME.PASSWORD] &&
        formState[REGISTER_FIELD_NAME.CONFIRM_PASSWORD] &&
        formState[REGISTER_FIELD_NAME.PASSWORD] !==
        formState[REGISTER_FIELD_NAME.CONFIRM_PASSWORD];

    const toggleToRegister = () => {
        setUi({
            isLogin: false,
            error: "",
            successMessage: "",
        });
        setFormState(initialFormState);
    };

    const toggleToLogin = () => {
        setUi({
            isLogin: true,
            error: "",
            successMessage: "",
        });
        setFormState(initialFormState);
    };

    const getButtonText = () => {
        const { loading, isLogin } = uiState;

        if (loading) {
            const buttonText = isLogin ? "Iniciando..." : "Creando...";
            uiState.loading = false;

            return buttonText;
        } else {
            return isLogin ? "Iniciar sesión" : "Registrarse";
        }
    };

    return (
        <Container>
            <StyledFormCard
                elevation={0}
            >
                <StyledCardContent>
                    <AuthHeader isLogin={uiState.isLogin} />

                    <AuthAlerts
                        successMessage={uiState.successMessage}
                        error={uiState.error}
                    />

                    <FormContainer
                        component="form"
                        onSubmit={(e) => handleSubmit(e)}
                        autoComplete="off"
                    >
                        <AuthFormFields
                            isLogin={uiState.isLogin}
                            formState={formState}
                            handleChange={handleChange}
                            showPassword={uiState.showPassword}
                            setShowPassword={(value) => setUi({ showPassword: value })}
                            showConfirmPassword={uiState.showConfirmPassword}
                            setShowConfirmPassword={(value) =>
                                setUi({ showConfirmPassword: value })
                            }
                            passwordMismatch={passwordMismatch}
                        />

                        <StyledButton
                            type="submit"
                            fullWidth
                            disabled={uiState.loading}
                            variant="contained"
                        >
                            {getButtonText()}
                        </StyledButton>
                    </FormContainer>

                    <Divider />

                    <AuthFooter
                        isLogin={uiState.isLogin}
                        toggleToRegister={toggleToRegister}
                        toggleToLogin={toggleToLogin}
                        loading={uiState.loading}
                    />
                </StyledCardContent>
            </StyledFormCard>
        </Container>
    );
};

export default AuthForm;
