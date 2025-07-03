import React from 'react';
import { Email, Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import StyledTextField from '@/components/styled/formStyled/StyledTextField';
import IconStyled from '@/components/styled/formStyled/IconStyled';
import StyledIconButton from '@/components/styled/formStyled/styledIconButton';
import ForgotPasswordBox from '@/components/styled/formStyled/ForgotPasswordBox';
import { ForgotPasswordLink } from '@/components/styled/formStyled/ForgotPasswordLink';
import { REGISTER_FIELD_NAME } from '@/constans/form/register';
import { LOGIN_FIELD_NAME } from '@/constans/form/login';

const AuthFormFields = ({
  isLogin,
  formState,
  handleChange,
  loading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordMismatch
}) => {

  const fields = [
    {
      key: "name",
      visible: !isLogin,
      label: "Nombre",
      name: REGISTER_FIELD_NAME.NAME,
      icon: <Person />,
      value: formState[REGISTER_FIELD_NAME.NAME],
    },
    {
      key: "email",
      visible: true,
      label: "Email",
      name: REGISTER_FIELD_NAME.EMAIL,
      type: "email",
      icon: <Email />,
      value: formState[REGISTER_FIELD_NAME.EMAIL],
    },
    {
      key: "password",
      visible: true,
      label: "Contraseña",
      name: REGISTER_FIELD_NAME.PASSWORD,
      icon: <Lock />,
      value: formState[REGISTER_FIELD_NAME.PASSWORD],
      withToggle: true,
      showValue: showPassword,
      setShowValue: setShowPassword,
    },
    {
      key: "confirmPassword",
      visible: !isLogin,
      label: "Confirmar contraseña",
      name: LOGIN_FIELD_NAME.CONFIRM_PASSWORD,
      icon: <Lock />,
      value: formState[LOGIN_FIELD_NAME.CONFIRM_PASSWORD],
      withToggle: true,
      showValue: showConfirmPassword,
      setShowValue: setShowConfirmPassword,
      error: passwordMismatch,
      helperText: passwordMismatch ? "Las contraseñas no coinciden" : "",
    }
  ];

  const renderField = ({
    label,
    name,
    type = "text",
    icon,
    value,
    withToggle = false,
    showValue,
    setShowValue,
    error = false,
    helperText = ""
  }) => (
    <StyledTextField
      key={name}
      fullWidth
      label={label}
      name={name}
      type={withToggle && !showValue ? "password" : type}
      value={value}
      onChange={handleChange}
      disabled={loading}
      required
      error={Boolean(error)}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconStyled>{icon}</IconStyled>
          </InputAdornment>
        ),
        endAdornment: withToggle && (
          <InputAdornment position="end">
            <StyledIconButton
              onClick={() => setShowValue(!showValue)}
              disabled={loading}
            >
              {showValue ? <VisibilityOff /> : <Visibility />}
            </StyledIconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <>
      {fields.filter(f => f.visible).map(renderField)}

      {isLogin && (
        <ForgotPasswordBox>
          <ForgotPasswordLink to="/forgot-password">
            ¿Olvidaste tu contraseña?
          </ForgotPasswordLink>
        </ForgotPasswordBox>
      )}
    </>
  );
};

export default AuthFormFields;
