import { Route, Routes } from "react-router-dom";
import routes from "@/routes/routeConfig";
import ProtectedRoute from "@/components/protectedRouter";

const AppRoutes = () => (
  <Routes>
    {routes.map(({ path, element: Element, isPrivate }) => (
      <Route
        key={path}
        path={path}
        element={
          isPrivate ? (
            <ProtectedRoute>
              <Element />
            </ProtectedRoute>
          ) : (
            <Element />
          )
        }
      />
    ))}
  </Routes>
);

export default AppRoutes;
