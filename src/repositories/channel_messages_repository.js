import ChannelMessage from "../models/channel_messages.model.js";

class ChannelRepository {
  async create({
    member_channel_id,
    channel_id,
    content,
    created_at,
    workspace_id,
  }) {
    try {
      const channel = new ChannelMessage({
        member_channel_id,
        channel_id,
        content,
        created_at,
        workspace_id,
      });

      await channel.save();
      console.log("channel creado exitosamente!");
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  }
}

const channel_repository = new ChannelRepository();

export default channel_repository;
