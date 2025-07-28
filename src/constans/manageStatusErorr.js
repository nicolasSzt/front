const errorStatusMessages = {
  400: "La solicitud es inválida. Verificá los datos ingresados.",
  401: "No estás autorizado. Iniciá sesión para continuar.",
  403: "Tu cuenta no ha sido verificada. Revisa tu email para verificarla.",
  404: "Usuario no encontrado. Verifica tus datos.",
  409: "Ya existe una cuenta registrada con este correo electrónico. Por favor, utiliza otro para continuar.",
  500: "Error interno del servidor. Intenta más tarde.",
};

export default errorStatusMessages;
