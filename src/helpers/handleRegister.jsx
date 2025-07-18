import { registerAuth } from "@/services/authServices";
import { REGISTER_FIELD_NAME } from "@/constans/form/register";
import errorStatusMessages from "@/constans/manageStatusErorr";

const handleRegister = ({ formState, setUi, resetForm }) => async () => {
  try {
    setUi({ loading: true });

    if (
      formState[REGISTER_FIELD_NAME.PASSWORD] !==
      formState[REGISTER_FIELD_NAME.CONFIRM_PASSWORD]
    ) {
      setUi({ error: "Las contraseñas no coinciden", loading: false });
      return;
    }

    const res = await registerAuth({
      name: formState[REGISTER_FIELD_NAME.NAME],
      email: formState[REGISTER_FIELD_NAME.EMAIL],
      password: formState[REGISTER_FIELD_NAME.PASSWORD],
    });

    if (res.ok) {
      setUi({
        successMessage: "¡Cuenta creada con éxito! Por favor, verifica tu correo electrónico.",
        isLogin: true,
      });

      resetForm();
    } else {
      setUi({ error: res.message });
    }
  } catch (error) {
    setUi({
      error: errorStatusMessages[error.status],
    });
  } finally {
    setUi({ loading: false });
  }
};

export default handleRegister;
