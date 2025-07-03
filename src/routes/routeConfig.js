import { AuthForm } from "@/pages/authForm/index.jsx";
import WorkspaceDetail from "@/pages/workspaceDetail/index.jsx";
import { WorkspaceSelector } from "@/pages/workspaceSelector/index.jsx";

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
