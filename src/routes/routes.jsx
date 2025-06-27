import { Route, Routes } from "react-router-dom"
import routes from "@/routes/routeConfig"

const AppRoutes = () => (
    <Routes>
        {routes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
        ))}
    </Routes>
)

export default AppRoutes
