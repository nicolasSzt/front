import { AuthForm } from "../pages/authForm/AuthForm";
import { WorkspaceSelector } from "../pages/workspaceSelector/WorkspaceSelector";
import { WorkspaceDetail } from "../pages/workspaceDetail/WorkspaceDetail";

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
