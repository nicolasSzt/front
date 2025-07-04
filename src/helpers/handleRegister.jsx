import { registerAuth } from "@/services/authServices";
import { REGISTER_FIELD_NAME } from "@/constans/form/register";

const handleRegister = ({ formState, setUi, resetForm }) => async () => {
  try {
    setUi({ loading: true, error: "" });

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
        successMessage: "¡Cuenta creada exitosamente!",
        isLogin: true,
      });
      resetForm();
    } else {
      setUi({ error: res.message });
    }
  } catch (error) {
    setUi({
      error:
        error.message || "Ocurrió un error al comunicarse con el servidor",
    });
  } finally {
    setUi({ loading: false });
  }
};

export default handleRegister;
