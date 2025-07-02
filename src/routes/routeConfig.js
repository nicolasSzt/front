import AuthForm from "../pages/authForm/AuthForm";
import WorkspaceDetail from "../pages/workspaceDetail/WorkspaceDetail";
import WorkspaceSelector from "../pages/workspaceSelector/WorkspaceSelector";

const routes = [
  {
    path: "/",
    element: AuthForm,
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
    element: AuthForm,
  },
];

export default routes;
