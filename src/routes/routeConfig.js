import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import WorkspaceSelector from "@/pages/workspaceSelector/workspaceSelector";
import WorkspaceDetail from "@/pages/workspaceDetail/WorkspaceDetail";

const routes = [
  {
    path: "/",
    element: Login,
  },
    {
    path: "/workspacesSelector",
    element: WorkspaceSelector,
  },
  {
    path: "/workspaceDetail/:workspace_id",
    element: WorkspaceDetail,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: Register,
  },
];

export default routes;
