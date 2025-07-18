// AppRoutes.jsx
import { Route, Routes } from "react-router-dom";
import routes from "@/routes/routeConfig";

const AppRoutes = () => (
  <Routes>
    {routes.map(({ path, element: Element, isPrivate }) => {
      return (
        <Route
          key={path}
          path={path}
          element={isPrivate ? <ProtectedRoute><Element /></ProtectedRoute> : <Element />}
        />
      );
    })}
  </Routes>
);

export default AppRoutes;
