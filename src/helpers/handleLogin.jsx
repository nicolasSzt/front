import { REGISTER_FIELD_NAME } from "@/constans/form/register";
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
console.error("Error en login:", error);

        const status = error?.response?.status || error?.status;
        const errorStatusMessages = {
            400: "La solicitud es inválida. Verificá los datos ingresados.",
            401: "No estás autorizado. Iniciá sesión para continuar.",
            403: "Tu cuenta no ha sido verificada. Revisa tu email para verificarla.",
            404: "Usuario no encontrado. Verifica tus datos.",
            409: "Ya existe una cuenta con este email.",
            500: "Error interno del servidor. Intenta más tarde.",
        };
console.log("Status detectado:", status);

        setUi({
            error: errorStatusMessages[status],
            successMessage: "",
        });

    } finally {
        setUi((prev) => ({ ...prev, loading: false }));
    }
};

export default handleLogin;