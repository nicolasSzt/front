import { Schema, model } from "mongoose";

const channelMembersSchema = new Schema({
  channel_id: {
    type: Schema.ObjectId,
    ref: "Channel",
    required: true,
  },

  member_id: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },

  created_at: {
    type: Date,
    default: new Date(),
  },
});

const ChannelMembers = model("channels_members", channelMembersSchema);

export default ChannelMembers;
