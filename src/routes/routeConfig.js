import { AuthForm } from "@/pages/authForm";
import { WorkspaceSelector } from "@/pages/workspaceSelector";
import { WorkspaceDetail } from "@/pages/workspaceDetail";

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
