import AuthForm from "@/pages/authForm/authForm.jsx";
import WorkspaceDetail from "@/pages/workspaceDetail/workspaceDetail.jsx";
import WorkspaceSelector from "@/pages/workspaceSelector/workspaceSelector.jsx";

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
