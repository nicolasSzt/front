import workspacesMember from "../models/Workspace_member.model.js";

class WorkspacesRepository {
  async create({ workspace_id, role, userId }) {
    const workspace = new workspacesMember({
      workspace_id,
      role,
      userId,
    });
    await workspace.save();
    console.log("Workspace creado exitosamente!");
  }
}

const workspaces_repository = new WorkspacesRepository();

export default workspaces_repository;
