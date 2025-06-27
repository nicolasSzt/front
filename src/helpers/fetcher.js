import ENVIRONMENT from "@/constans/environment";
import methods_HTTP from "@/constans/methods";

export const fetcher = async ({
  url,
  method = methods_HTTP.GET,
  body = null,
  headers = {},
}) => {
  const response = await fetch(`${ENVIRONMENT.URL_API}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Error al procesar la solicitud");
  }

  return data;
};
