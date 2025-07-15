import { useNavigate, useSearchParams } from "react-router-dom"
import { useVerify } from "@/hooks/useVerify"
import { CircularProgress, Button, Typography, Box, Alert } from "@mui/material"
import { useEffect } from "react"

const Verification = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const verify_token = searchParams.get("verify_token")
  const { isLoading, isVerified, error, refresh } = useVerify(verify_token)

  const handleRedirect = () => {
    if (isVerified) {
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }
  }

  useEffect(() => {
    if (isVerified !== undefined) {
      handleRedirect()
    }
  }, [isVerified])

  if (isLoading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>Verificando cuenta...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6" color="error">Error al verificar</Typography>
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        <Button variant="contained" onClick={refresh} sx={{ mt: 3 }}>Reintentar</Button>
      </Box>
    )
  }

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" color={isVerified ? "green" : "orange"}>
        {isVerified ? "¡Cuenta verificada con éxito!" : "Cuenta no verificada"}
      </Typography>
      <Typography mt={2}>
        {isVerified
          ? "Redirigiendo a tu cuenta..."
          : "Necesitás completar el proceso de verificación."}
      </Typography>
    </Box>
  )
}

export default Verification
