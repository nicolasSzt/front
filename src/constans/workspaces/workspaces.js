import { Business, Palette, Code, Campaign } from "@mui/icons-material"

export const WORKSPACE_DATA = [
  {
    id: "acme-corp",
    name: "Acme Corporation",
    description: "Main company workspace",
    initials: "AC",
    members: 124,
    channels: 28,
    color: "#2196f3",
    icon: Business,
    isActive: true,
  },
  {
    id: "design-team",
    name: "Design Team",
    description: "Creative collaboration space",
    initials: "DT",
    members: 12,
    channels: 8,
    color: "#9c27b0",
    icon: Palette,
    isActive: true,
  },
  {
    id: "dev-team",
    name: "Development Team",
    description: "Engineering discussions",
    initials: "DV",
    members: 18,
    channels: 15,
    color: "#4caf50",
    icon: Code,
    isActive: true,
  },
  {
    id: "marketing",
    name: "Marketing Hub",
    description: "Campaign planning and execution",
    initials: "MH",
    members: 8,
    channels: 6,
    color: "#ff9800",
    icon: Campaign,
    isActive: false,
  },
]

export const WORKSPACE_SELECTOR_TEXTS = {
  title: "Choose your workspace",
  subtitle: "Select a workspace to continue or create a new one to get started with your team collaboration.",
  createNew: "Create new workspace",
  createNewDescription:
    "Start fresh with a new workspace for your team or project. Invite members and set up channels.",
  createButton: "Create Workspace",
  helpText: "Need help?",
  contactSupport: "Contact support",
  membersLabel: "members",
  channelsLabel: "channels",
  activeLabel: "Active",
}
