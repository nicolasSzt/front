import WorkspaceDetail from "@/pages/workspaceDetail/WorkspaceDetail";
import AuthForm from "@/pages/authForm/authForm";
import WorkspaceSelector from "@/pages/workspaceSelector/WorkspaceSelector";

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
