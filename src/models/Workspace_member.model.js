import { Schema, model } from "mongoose";
import { RoleMembersWorkspace } from "../config/constants/members_workspace_roles";

const workspacesMemberSchema = new Schema({
  workspace_id: {
    type: Schema.ObjectId,
    ref: "Workspace",
    required: true,
  },
  
  userId: {
    type: Schema.ObjectId,
    ref: "Workspace",
    required: true,
  },

  role: {
    type: String,
    require: true,
    enum: RoleMembersWorkspace,
  },
});

const workspacesMember = model("members_workspace", workspacesMemberSchema);

export default workspacesMember;
