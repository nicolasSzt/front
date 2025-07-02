import { useAuthUi } from "@/hooks/useAuthUi";

const handleAuthRequest = async (requestFn, successCallback) => {
  const ui = useAuthUi();

  ui.set("loading", true);
  ui.set("error", "");
  ui.set("successMessage", "");

  try {
    const res = await requestFn();

    if (res.ok) {
      successCallback?.(res);
    } else {
      ui.set("error", res.message);
    }
  } catch (error) {
    ui.set("error", error.message || "Error de servidor");
  } finally {
    ui.set("loading", false);
  }
};

export default handleAuthRequest;
