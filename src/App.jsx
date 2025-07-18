import AppRoutes from "@/routes/routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "./components/themeProvider"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppRoutes /> 
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
