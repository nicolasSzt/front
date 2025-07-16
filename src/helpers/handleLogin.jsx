import { REGISTER_FIELD_NAME } from "@/constans/form/register";
import errorStatusMessages from "@/constans/manageStatusErorr";
import { loginAuth } from "@/services/authServices";

const handleLogin = ({ formState, setUi, navigate }) => async () => {
    try {
        setUi({ loading: true, error: "", successMessage: "" });

        const res = await loginAuth({
            email: formState[REGISTER_FIELD_NAME.EMAIL],
            password: formState[REGISTER_FIELD_NAME.PASSWORD],
        });
        console.log("Respuesta loginAuth:", res);

        if (res.ok) {
            setUi({ successMessage: "¡Bienvenido de vuelta!", error: "" });
            navigate("/workspacesSelector");
        } else {
            setUi({ error: res.message || "Error desconocido", successMessage: "" });
        }

    } catch (error) {
        setUi({
            error: errorStatusMessages[error.status],
        });

    } finally {
        setUi((prev) => ({ ...prev, loading: false }));
    }
};

export default handleLogin;