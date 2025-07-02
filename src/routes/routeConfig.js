import AuthForm from "@/pages/authForm/authForm";
import WorkspaceDetail from "@/pages/workspaceDetail/workspaceDetail";
import WorkspaceSelector from "@/pages/workspaceSelector/workspaceSelector";

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
