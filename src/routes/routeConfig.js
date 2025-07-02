import AuthForm from "@/pages/authForm/AuthForm.jsx";
import WorkspaceDetail from "@/pages/workspaceDetail/WorkspaceDetail.jsx";
import WorkspaceSelector from "@/pages/workspaceSelector/WorkspaceSelector.jsx";

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
